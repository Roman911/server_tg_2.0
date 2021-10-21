import { Model } from 'mongoose'
import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { hash } from 'bcrypt'
import { v4 } from 'uuid'
import { User, UserDocument } from './users.schema'
import { RegistrationUserInput } from "./inputs/registration-user.input"

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async user(userID: string): Promise<User> {
    try {
      return this.userModel.findById(userID).exec()
    } catch (e) {
      console.log(e)
    }
  }

  async registration(createUserDto: RegistrationUserInput): Promise<User> {
    try {
      const { email, name, password } = await createUserDto
      const candidate = await this.userModel.findOne({ email })
      if (candidate) throw new BadRequestException(`Користувач з таким емейлом вже зареестрований`)
      const hashPassword = await hash(password, 10)
      const activationLink = v4()
      const registrationUser = await new this.userModel({ email, name, password: hashPassword })
      return await registrationUser.save()
    } catch (e) {
      console.log(e)
    }
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