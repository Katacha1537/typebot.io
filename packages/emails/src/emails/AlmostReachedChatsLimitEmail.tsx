import React, { ComponentProps } from 'react'
import { Mjml, MjmlBody, MjmlSection, MjmlColumn } from '@faire/mjml-react'
import { render } from '@faire/mjml-react/utils/render'
import { Head, HeroImage, Text } from '../components'
import { parseNumberWithCommas } from '@typebot.io/lib'
import { SendMailOptions } from 'nodemailer'
import { sendEmail } from '../sendEmail'
import { env } from '@typebot.io/env'

type AlmostReachedChatsLimitEmailProps = {
  workspaceName: string
  usagePercent: number
  chatsLimit: number
}

const now = new Date()
const firstDayOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
const readableResetDate = firstDayOfNextMonth
  .toDateString()
  .split(' ')
  .slice(1, 4)
  .join(' ')

export const AlmostReachedChatsLimitEmail = ({
  workspaceName,
  usagePercent,
  chatsLimit,
}: AlmostReachedChatsLimitEmailProps) => {
  const readableChatsLimit = parseNumberWithCommas(chatsLimit)

  return (
    <Mjml>
      <Head />
      <MjmlBody width={600}>
        <MjmlSection padding="0">
          <MjmlColumn>
            <HeroImage
              src={`${env.NEXTAUTH_URL}/images/yourBotIsFlyingBanner.png`}
            />
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection padding="0 24px" cssClass="smooth">
          <MjmlColumn>
            <Text>Seus bots estão conversando muito. Isso é incrível. 💙</Text>
            <Text>
              Seu workspace <strong>{workspaceName}</strong> usou{' '}
              {usagePercent}% dos chats incluídos este mês. Uma vez que você bateu{' '}
              {readableChatsLimit} bate-papos, você pagará conforme usar.
            </Text>
            <Text>
            Seu progresso pode ser monitorado no painel do seu espaço de trabalho
            configurações.
            </Text>
            <Text>
            Confira a{' '}
              <a href="https://jeffecom.com/comunidade/">página de preços</a> para
 informações sobre os níveis de pagamento conforme o uso.
            </Text>
            <Text>
            Lembre-se de que seu ciclo de faturamento termina em {readableResetDate}.
            </Text>
          </MjmlColumn>
        </MjmlSection>
      </MjmlBody>
    </Mjml>
  )
}

export const sendAlmostReachedChatsLimitEmail = ({
  to,
  ...props
}: Pick<SendMailOptions, 'to'> &
  ComponentProps<typeof AlmostReachedChatsLimitEmail>) =>
  sendEmail({
    to,
    subject: "Você está perto do limite de bate-papos",
    html: render(<AlmostReachedChatsLimitEmail {...props} />).html,
  })
