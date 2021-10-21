import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class TokenInput {
  @Field()
  userId: string
  @Field()
  refreshToken: string
}