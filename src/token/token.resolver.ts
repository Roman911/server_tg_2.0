import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { TokenService } from './token.service'
import { TokenInput } from "./inputs/token.input"
import { CreateTokenDto } from "./dto/create-token.dto"

@Resolver()
export class TokenResolver {
  constructor(
    private tokenService: TokenService
  ) {}

  @Mutation(() => CreateTokenDto)
  async createToken(@Args('input') input: TokenInput) {
    return this.tokenService.saveToken(input)
  }
}