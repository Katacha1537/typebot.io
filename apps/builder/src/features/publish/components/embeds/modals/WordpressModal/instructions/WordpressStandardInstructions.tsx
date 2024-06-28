import { CodeEditor } from '@/components/inputs/CodeEditor'
import { ExternalLinkIcon } from '@/components/icons'
import {
  OrderedList,
  ListItem,
  useColorModeValue,
  Link,
  Stack,
  Text,
  Code,
} from '@chakra-ui/react'
import { useState } from 'react'
import { StandardSettings } from '../../../settings/StandardSettings'
import { isCloudProdInstance } from '@/helpers/isCloudProdInstance'
import { env } from '@typebot.io/env'
import packageJson from '../../../../../../../../../../packages/embeds/js/package.json'

type Props = {
  publicId: string
}

export const WordpressStandardInstructions = ({ publicId }: Props) => {
  const [windowSizes, setWindowSizes] = useState<{
    width?: string
    height: string
  }>({
    height: '100%',
    width: '100%',
  })

  const elementCode = parseWordpressShortcode({ ...windowSizes, publicId })

  return (
    <OrderedList spacing={4} pl={5}>
      <ListItem>
        Instalar{' '}
        <Link
          href="https://wordpress.org/plugins/typebot/"
          isExternal
          color={useColorModeValue('blue.500', 'blue.300')}
        >
         o plugin oficial do ChatEcom WordPress
          <ExternalLinkIcon mx="2px" />
        </Link>
      </ListItem>
      <ListItem>
        <Stack spacing={4}>
          <StandardSettings
            onUpdateWindowSettings={(sizes) =>
              setWindowSizes({
                height: sizes.heightLabel,
                width: sizes.widthLabel,
              })
            }
          />
          <Text>
          Agora você pode colocar o seguinte código de acesso em qualquer lugar do seu site:
          </Text>
          <CodeEditor value={elementCode} lang="shell" isReadOnly />
          <Text>
          Observação: seu sistema de modelos de página provavelmente tem um{' '}
          Elemento <Code>Shortcode</Code> (caso contrário, use um elemento de texto).
          </Text>
        </Stack>
      </ListItem>
    </OrderedList>
  )
}

const parseWordpressShortcode = ({
  width,
  height,
  publicId,
}: {
  width?: string
  height?: string
  publicId: string
}) => {
  return `[typebot typebot="${publicId}"${
    isCloudProdInstance()
      ? ''
      : ` host="${env.NEXT_PUBLIC_VIEWER_URL[0]}" lib_version="${packageJson.version}"`
  }${width ? ` width="${width}"` : ''}${height ? ` height="${height}"` : ''}]
`
}
