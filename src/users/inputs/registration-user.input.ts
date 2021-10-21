import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class RegistrationUserInput {
  @Field()
  name: string

  @Field()
  email: string

  @Field()
  password: string
}