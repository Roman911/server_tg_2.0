import { Module } from "@nestjs/common"
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'
import { MONGO_DB_KEY } from './config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { TokenModule } from "./token/token.module"
import { MailModule } from './mail/mail.module'

@Module({
  imports: [
    UsersModule,
    TokenModule,
    MailModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql'
    }),
    MongooseModule.forRoot(`mongodb+srv://Roman:${MONGO_DB_KEY}@cluster0-vogsm.mongodb.net/travel?retryWrites=true&w=majority`)
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}