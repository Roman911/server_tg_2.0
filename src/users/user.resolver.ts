import { Args, Mutation, Resolver, Query } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { CreateUserDto, CreateUserDataDto } from './dto/create-user.dto'
import { RegistrationUserInput } from "./inputs/registration-user.input"

@Resolver()
export class UsersResolver {
  constructor(
    private usersService: UsersService
  ) {}

  @Query(() => [CreateUserDto])
  async users() {
    return this.usersService.findAll()
  }

  @Query(() => CreateUserDto)
  async user(@Args('userID') userID: string) {
    return this.usersService.user(userID)
  }

  @Mutation(() => CreateUserDataDto)
  async registration(@Args('input') input: RegistrationUserInput) {
    return this.usersService.registration(input)
  }
}