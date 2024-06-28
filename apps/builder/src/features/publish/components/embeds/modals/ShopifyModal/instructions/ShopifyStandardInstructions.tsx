import { CodeEditor } from '@/components/inputs/CodeEditor'
import { OrderedList, ListItem, Stack, Text, Code } from '@chakra-ui/react'
import { useState } from 'react'
import { StandardSettings } from '../../../settings/StandardSettings'
import {
  parseStandardElementCode,
  parseStandardHeadCode,
} from '../../Javascript/JavascriptStandardSnippet'

type Props = {
  publicId: string
}

export const ShopifyStandardInstructions = ({ publicId }: Props) => {
  const [windowSizes, setWindowSizes] = useState<{
    width?: string
    height: string
  }>({
    height: '100%',
    width: '100%',
  })

  const headCode = parseStandardHeadCode(publicId)

  const elementCode = parseStandardElementCode(
    windowSizes.width,
    windowSizes.height
  )

  return (
    <OrderedList spacing={4} pl={5}>
      <ListItem>
      No painel da sua loja, na página <Code>Temas</Code>, clique em{' '}
      <Code>Ações {'>'} Editar código</Code>
      </ListItem>
      <ListItem>
        <Stack spacing={4}>
          <Text>
          No arquivo <Code>Layout {'>'} theme.liquid</Code>, cole este código apenas
          antes da tag de fechamento <Code>{'<head>'}</Code>:
          </Text>

          <CodeEditor value={headCode} lang="html" isReadOnly />
        </Stack>
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
          Coloque um elemento no qual o typebot irá em qualquer arquivo no{' '}
            <Code>{'<body>'}</Code>:
          </Text>
          <CodeEditor value={elementCode} lang="html" isReadOnly />
        </Stack>
      </ListItem>
    </OrderedList>
  )
}
