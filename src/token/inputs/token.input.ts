import {InputType, Field, ID} from '@nestjs/graphql'

@InputType()
export class TokenInput {
  @Field(() => ID)
  userId: string
  @Field()
  refreshToken: string
}