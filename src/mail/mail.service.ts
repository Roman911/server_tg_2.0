import { Injectable } from '@nestjs/common'
import { createTransport } from 'nodemailer'
import { SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER, API_URL } from '../config'

@Injectable()
export class MailService {
  private transporter: any
  constructor() {
    this.transporter = createTransport({
      host: SMTP_HOST,
      port: +SMTP_PORT,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD
      }
    })
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: SMTP_USER,
      to,
      subject: `Активація акаунта на ${API_URL}`,
      text: '',
      html: `
        <div>
          <h1>Для активації перейдіть по силці</h1>
          <a href="${link}">${link}</a>
        </div>
      `
    })
  }
}