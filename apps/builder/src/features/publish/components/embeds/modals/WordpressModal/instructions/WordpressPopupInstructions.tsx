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
import { PopupSettings } from '../../../settings/PopupSettings'
import { parseInitPopupCode } from '../../../snippetParsers/popup'
import { parseApiHostValue } from '../../../snippetParsers'
import { isCloudProdInstance } from '@/helpers/isCloudProdInstance'
import packageJson from '../../../../../../../../../../packages/embeds/js/package.json'

const typebotCloudLibraryVersion = '0.2'

type Props = {
  publicId: string
  customDomain?: string
}
export const WordpressPopupInstructions = ({
  publicId,
  customDomain,
}: Props) => {
  const [autoShowDelay, setAutoShowDelay] = useState<number>()

  const initCode = parseInitPopupCode({
    typebot: publicId,
    apiHost: parseApiHostValue(customDomain),
    autoShowDelay,
  })

  return (
    <OrderedList spacing={4} pl={5}>
      <ListItem>
        Instalar {' '}
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
      Defina <Code>Versão da biblioteca</Code> como{' '}
        <Code>
          {isCloudProdInstance()
            ? typebotCloudLibraryVersion
            : packageJson.version}
        </Code>
      </ListItem>
      <ListItem>
        <Stack spacing={4}>
          <PopupSettings
            onUpdateSettings={(settings) =>
              setAutoShowDelay(settings.autoShowDelay)
            }
          />
          <Text>
          Agora você pode colocar o seguinte trecho de código no painel Typebot em
          seu administrador do WordPress:
          </Text>
          <CodeEditor value={initCode} lang="javascript" isReadOnly />
        </Stack>
      </ListItem>
    </OrderedList>
  )
}
