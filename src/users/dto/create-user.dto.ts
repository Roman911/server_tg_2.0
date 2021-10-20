import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class CreateUserDto {
  @Field()
  readonly name: string
  @Field()
  readonly email: string
  @Field()
  readonly password: string
  @Field()
  readonly isActivated: boolean
  @Field()
  readonly activationLink: string
}