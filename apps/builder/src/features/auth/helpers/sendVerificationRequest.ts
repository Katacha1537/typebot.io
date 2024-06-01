import { sendMagicLinkEmail } from '@typebot.io/emails'

type Props = {
  identifier: string
  url: string
}

export const sendVerificationRequest = async ({ identifier, url }: Props) => {
  try {
    await sendMagicLinkEmail({ url, to: identifier })
  } catch (err) {
    console.error(err)
    throw new Error(`Não foi possível enviar o e-mail do link mágico. Veja o erro acima.`)
  }
}
