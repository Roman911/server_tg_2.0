import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { PORT } from './config'

const start = async () => {
    try {
      const app = await NestFactory.create(AppModule)

      await app.listen(PORT || 5000, () => console.log(`server started on PORT ${PORT}`))
    } catch (e) {
      console.log(e)
  }
}

start()