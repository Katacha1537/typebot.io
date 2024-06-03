import { env } from '@typebot.io/env'
import Head from 'next/head'

const getOrigin = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  return env.NEXTAUTH_URL
}

export const Seo = ({
  title,
  description = 'Crie e publique formulários de conversação que coletam 4 vezes mais respostas e pareçam nativos do seu produto',
  imagePreviewUrl = `${getOrigin()}/images/og.png`,
}: {
  title: string
  description?: string
  currentUrl?: string
  imagePreviewUrl?: string
}) => {
  const formattedTitle = `${title} | ChatEco`

  return (
    <Head>
      <title>{formattedTitle}</title>
      <meta name="title" content={title} />
      <meta property="og:title" content={title} />
      <meta property="twitter:title" content={title} />

      <meta name="description" content={description} />
      <meta property="twitter:description" content={description} />
      <meta property="og:description" content={description} />

      <meta property="og:image" content={imagePreviewUrl} />
      <meta property="twitter:image" content={imagePreviewUrl} />

      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary_large_image" />
    </Head>
  )
}
