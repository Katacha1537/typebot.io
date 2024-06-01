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

type Props = {
  url: string
}

export const MagicLinkEmail = ({ url }: Props) => (
  <Mjml>
    <Head />
    <MjmlBody width={600}>
      <MjmlSection padding="0">
        <MjmlColumn>
          <HeroImage
            src={`${env.NEXTAUTH_URL}/images/yourMagicLinkBanner.png`}
          />
        </MjmlColumn>
      </MjmlSection>
      <MjmlSection padding="0 24px" cssClass="smooth">
        <MjmlColumn>
          <Text>Aqui está o seu link mágico 👇</Text>
          <MjmlSpacer />
          <Button link={url} align="center">
          Clique aqui para entrar
          </Button>
          <Text>
          Se você não solicitou isso, ignore este e-mail.
          </Text>
          <Text>
            ass:
            <br />- ChatEcom
          </Text>
        </MjmlColumn>
      </MjmlSection>
    </MjmlBody>
  </Mjml>
)

export const sendMagicLinkEmail = ({
  to,
  ...props
}: Pick<SendMailOptions, 'to'> & ComponentProps<typeof MagicLinkEmail>) =>
  sendEmail({
    to,
    subject: 'Faça login no ChatEcom',
    html: render(<MagicLinkEmail {...props} />).html,
  })
