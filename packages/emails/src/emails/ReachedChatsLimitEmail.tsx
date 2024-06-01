import React, { ComponentProps } from 'react'
import {
  Mjml,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlSpacer,
} from '@faire/mjml-react'
import { render } from '@faire/mjml-react/utils/render'
import { Button, Head, HeroImage, Text } from '../components'
import { parseNumberWithCommas } from '@typebot.io/lib'
import { SendMailOptions } from 'nodemailer'
import { sendEmail } from '../sendEmail'
import { env } from '@typebot.io/env'

type ReachedChatsLimitEmailProps = {
  chatsLimit: number
  url: string
}

export const ReachedChatsLimitEmail = ({
  chatsLimit,
  url,
}: ReachedChatsLimitEmailProps) => {
  const readableChatsLimit = parseNumberWithCommas(chatsLimit)

  return (
    <Mjml>
      <Head />
      <MjmlBody width={600}>
        <MjmlSection padding="0">
          <MjmlColumn>
            <HeroImage
              src={`${env.NEXTAUTH_URL}/images/actionRequiredBanner.png`}
            />
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection padding="0 24px" cssClass="smooth">
          <MjmlColumn>
            <Text>
            Aconteceu, você atingiu seu valor mensal{' '}
              {readableChatsLimit} limite de bate-papo 😮
            </Text>
            <Text>
            Se você quiser que seus bots continuem conversando com seus usuários
 este mês, então você precisa atualizar seu plano. 🚀
            </Text>

            <MjmlSpacer height="24px" />
            <Button link={url}>Mudar Plano</Button>
          </MjmlColumn>
        </MjmlSection>
      </MjmlBody>
    </Mjml>
  )
}

export const sendReachedChatsLimitEmail = ({
  to,
  ...props
}: Pick<SendMailOptions, 'to'> &
  ComponentProps<typeof ReachedChatsLimitEmail>) =>
  sendEmail({
    to,
    subject: "Você atingiu seu limite de bate-papos",
    html: render(<ReachedChatsLimitEmail {...props} />).html,
  })
