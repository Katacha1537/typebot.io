import React, { ComponentProps } from 'react'
import {
  Mjml,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlSpacer,
} from '@faire/mjml-react'
import { render } from '@faire/mjml-react/utils/render'
import { HeroImage, Text, Button, Head } from '../components'
import { SendMailOptions } from 'nodemailer'
import { sendEmail } from '../sendEmail'
import { env } from '@typebot.io/env'

type GuestInvitationEmailProps = {
  workspaceName: string
  typebotName: string
  url: string
  hostEmail: string
  guestEmail: string
}

export const GuestInvitationEmail = ({
  workspaceName,
  typebotName,
  url,
  hostEmail,
  guestEmail,
}: GuestInvitationEmailProps) => (
  <Mjml>
    <Head />
    <MjmlBody width={600}>
      <MjmlSection padding="0">
        <MjmlColumn>
          <HeroImage src={`${env.NEXTAUTH_URL}/images/invitationBanner.png`} />
        </MjmlColumn>
      </MjmlSection>
      <MjmlSection padding="0 24px" cssClass="smooth">
        <MjmlColumn>
          <Text>
          Você foi convidado por {hostEmail} para colaborar em seu ecomBot{' '}
            <strong>{typebotName}</strong>.
          </Text>
          <Text>
            De agora em diante você verá este typebot em seu painel sob o dele
            workspace &quot;{workspaceName}&quot; 👍
          </Text>
          <Text>
          Certifique-se de fazer login como <i>{guestEmail}</i>.
          </Text>
          <MjmlSpacer height="24px" />
          <Button link={url}>Vá para o ChatEcom</Button>
        </MjmlColumn>
      </MjmlSection>
    </MjmlBody>
  </Mjml>
)

export const sendGuestInvitationEmail = ({
  to,
  ...props
}: Pick<SendMailOptions, 'to'> & ComponentProps<typeof GuestInvitationEmail>) =>
  sendEmail({
    to,
    subject: "Você foi convidado para colaborar 🤝",
    html: render(<GuestInvitationEmail {...props} />).html,
  })
