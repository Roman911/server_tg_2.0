import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

export type TokenDocument = Token & mongoose.Document

@Schema()
export class Token {
  @Prop()
  user: string

  @Prop({ required: true })
  refreshToken: string
}

export const TokenSchema = SchemaFactory.createForClass(Token)