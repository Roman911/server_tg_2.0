import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { sign } from 'jsonwebtoken'
import { Token, TokenDocument } from './token.schema'
import { TokenInput } from "./inputs/token.input"
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../config'

@Injectable()
export class TokenService {
  constructor(@InjectModel('Token') private tokenModel: Model<TokenDocument>) {}

  generateTokens(payload) {
    const accessToken = sign(payload, JWT_ACCESS_SECRET, { expiresIn: '30m' })
    const refreshToken = sign(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' })
    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(createTokenDto: TokenInput): Promise<Token> {
    const tokenData = await this.tokenModel.findOne({ user: createTokenDto.userId })

    console.log(tokenData, createTokenDto.userId)

    const createdToken = await new this.tokenModel(createTokenDto)
    return await createdToken.save()
  }
}