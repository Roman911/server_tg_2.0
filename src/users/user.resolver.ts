import { Resolver, Query } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'

@Resolver()
export class UsersResolver {
  constructor(
    private usersService: UsersService
  ) {}

  @Query(() => String)
  async hello() {
    return 'hello'
  }

  @Query(() => [CreateUserDto])
  async users() {
    return this.usersService.findAll()
  }
}