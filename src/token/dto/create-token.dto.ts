import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class CreateTokenDto {
  @Field(() => ID, { nullable: true })
  userId: string

  @Field()
  refreshToken: string
}