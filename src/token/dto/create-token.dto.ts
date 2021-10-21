import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class CreateTokenDto {
  @Field()
  userId: string

  @Field()
  refreshToken: string
}