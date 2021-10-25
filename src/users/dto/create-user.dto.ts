import { ObjectType, Field, ID, Int } from '@nestjs/graphql'

@ObjectType()
class Socials {
  @Field({ nullable: true })
  facebook: string
  @Field({ nullable: true })
  instagram: string
  @Field({ nullable: true })
  twitter: string
  @Field({ nullable: true })
  youtube: string
}

@ObjectType()
export class CreateUserDto {
  @Field()
  name: string
  @Field()
  email: string
  @Field()
  password: string
  @Field()
  isActivated: boolean
  @Field()
  activationLink: string
  @Field({ nullable: true })
  avatar: string
  @Field(() => Int, { nullable: true })
  rating: number
  @Field({ nullable: true })
  aboutMy: string
  @Field({ nullable: true })
  socials: Socials
  @Field({ nullable: true })
  last_seen: Date
}

@ObjectType()
export class CreateUserDataDto {
  @Field()
  user: CreateUserDto
  @Field()
  accessToken: string
  @Field()
  refreshToken: string
}

@ObjectType()
export class ActivateUserDto {
  @Field(() => ID)
  _id: string
}