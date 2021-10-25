import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersResolver } from './user.resolver'
import { User, UserSchema } from './users.schema'
import { UsersService } from './users.service'
import { UserTokenService } from './user-token.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersResolver, UsersService, UserTokenService]
})
export class UsersModule {}