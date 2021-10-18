import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class CreateUserDto {
  @Field()
  readonly name: string
  @Field(() => Int)
  readonly age: number
  @Field()
  readonly breed: string
}