import { Module } from "@nestjs/common"
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from "./users/users.module"
import { MONGO_DB_KEY } from './config'

@Module({
  imports: [
    UsersModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql'
    }),
    MongooseModule.forRoot(`mongodb+srv://Roman:${MONGO_DB_KEY}@cluster0-vogsm.mongodb.net/travel?retryWrites=true&w=majority`)
  ],
  controllers: [],
  providers: []
})

export class AppModule {}