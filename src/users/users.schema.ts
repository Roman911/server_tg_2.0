import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

export type UserDocument = User & mongoose.Document

@Schema()
export class User {
  @Prop({ required: true })
  name: string
  @Prop({ required: true, unique: true })
  email: string
  @Prop({ required: true })
  password: string
  @Prop({ required: true, default: false })
  isActivated: boolean
  @Prop()
  activationLink: string
  @Prop()
  avatar: string
  @Prop({ default: 0 })
  rating: number
  @Prop()
  aboutMy: string
  @Prop(raw({
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    youtube: { type: String }
  }))
  socials: Record<string, any>
  @Prop({ default: new Date})
  last_seen: Date
}

export const UserSchema = SchemaFactory.createForClass(User)