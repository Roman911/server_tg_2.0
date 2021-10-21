import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TokenResolver } from './token.resolver'
import { Token, TokenSchema } from './token.schema'
import { TokenService } from './token.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }])],
  providers: [TokenResolver, TokenService]
})
export class TokenModule {}