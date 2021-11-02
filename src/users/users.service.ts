import { Model } from 'mongoose'
import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ModuleRef } from "@nestjs/core"
import { compare, hash } from "bcrypt"
import { v4 } from "uuid"
import { User, UserDocument } from './users.schema'
import { RegistrationUserInput } from "./inputs/registration-user.input"
import { LoginUserInput } from './inputs/login-user.input'
import { TokenService } from "../token/token.service"
import { MailService } from "../mail/mail.service"
import { UserTokenService } from "./user-token.service"
import { CLIENT_URL } from "../config"

@Injectable()
export class UsersService {
  private userTokenService: UserTokenService
  private tokenService: TokenService
  private mailService: MailService
  constructor(
    private moduleRef: ModuleRef,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) {}

  async user(userID: string): Promise<User> {
    return this.userModel.findById(userID).exec()
  }

  async activate(activationLink): Promise<any> {
    const user = await this.userModel.findOne({ activationLink })
    if (!user) throw new BadRequestException(`Некоректний лінк активації`)
    user.isActivated = true
    await user.save()
    this.userTokenService = await this.moduleRef.get(UserTokenService, { strict: false })

    return await this.userTokenService.userTokenData(user)
  }

  async login(createUserDto: LoginUserInput): Promise<any> {
    const { email, password } = createUserDto
    const user = await this.userModel.findOne({ email })
    if (!user) throw new BadRequestException('Неправильний логін або пароль')
    if (!user.isActivated) throw new BadRequestException('Потрібно активувати акаунт')
    const isPassEquals = await compare(password, user.password)
    if (!isPassEquals) throw new BadRequestException('Неправильний логін або пароль')
    this.userTokenService = await this.moduleRef.get(UserTokenService, { strict: false })

    return await this.userTokenService.userTokenData(user)
  }

  async logout(refreshToken): Promise<any> {
    this.tokenService = await this.moduleRef.get(TokenService, { strict: false })

    return await this.tokenService.removeToken(refreshToken)
  }

  async refresh(refreshToken): Promise<any> {
    if (!refreshToken) throw new BadRequestException()
    this.tokenService = await this.moduleRef.get(TokenService, { strict: false })
    const userData = this.tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await this.tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb) throw new BadRequestException()
    const user = await this.userModel.findById(userData.id)
    this.userTokenService = await this.moduleRef.get(UserTokenService, { strict: false })

    return await this.userTokenService.userTokenData(user)
  }

  async registration(createUserDto: RegistrationUserInput): Promise<any> {
    const { email, password, name } = createUserDto
    const candidate = await this.userModel.findOne({ email })
    if (candidate) throw new BadRequestException(`Користувач з таким емейлом вже зареестрований`)
    const hashPassword = await hash(password, 10)
    const activationLink = v4()
    const user = await this.userModel.create({ email, name, password: hashPassword, activationLink })
    this.mailService = await this.moduleRef.get(MailService, { strict: false })
    await this.mailService.sendActivationMail(email, `${CLIENT_URL}/activate/${activationLink}`)
    this.userTokenService = await this.moduleRef.get(UserTokenService, { strict: false })

    return  await this.userTokenService.userTokenData(user)
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec()
  }
}