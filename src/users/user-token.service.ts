import { Injectable } from '@nestjs/common'
import { ModuleRef } from "@nestjs/core"
import { UserDto } from "./dto/user.dto"
import { TokenService } from "../token/token.service"

@Injectable()
export class UserTokenService {
  private tokenService: TokenService
  constructor(private moduleRef: ModuleRef) {}

  async userTokenData(user) {
    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })
    this.tokenService = await this.moduleRef.get(TokenService, { strict: false })
    await this.tokenService.saveToken({userId: userDto.id, refreshToken: tokens.refreshToken})

    return { ...tokens, user: userDto }
  }
}