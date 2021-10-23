import { Model } from 'mongoose'
import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ModuleRef } from "@nestjs/core"
import { hash } from 'bcrypt'
import { v4 } from 'uuid'
import { User, UserDocument } from './users.schema'
import { RegistrationUserInput } from "./inputs/registration-user.input"
import { TokenService } from "../token/token.service"
import { UserDto } from "./dto/user.dto"

@Injectable()
export class UsersService {
  private tokenService: TokenService
  //private mailService: MailService
  constructor(
    private moduleRef: ModuleRef,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) {}

  async user(userID: string): Promise<User> {
    return this.userModel.findById(userID).exec()
  }

  async registration(createUserDto: RegistrationUserInput): Promise<any> {
    const { email, name, password } = await createUserDto
    const candidate = await this.userModel.findOne({ email })
    if (candidate) throw new BadRequestException(`Користувач з таким емейлом вже зареестрований`)
    const hashPassword = await hash(password, 10)
    const activationLink = v4()
    const user = await this.userModel.create({ email, name, password: hashPassword, activationLink })
    //this.mailService = await this.moduleRef.get(MailService, { strict: false })
    //await this.mailService.sendActivationMail(email, `${API_URL}/activate/${activationLink}`)
    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })
    this.tokenService = await this.moduleRef.get(TokenService, { strict: false })
    await this.tokenService.saveToken({userId: userDto.id, refreshToken: tokens.refreshToken})

    return { ...tokens, user: userDto }
  }

  // async login(): Promise<User> {
  //   try {
  //
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
  //
  // async logout(): Promise<User> {
  //   try {
  //
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
  //
  // async activate(): Promise<User> {
  //   try {
  //
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
  //
  // async refresh(): Promise<User> {
  //   try {
  //
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec()
  }
}