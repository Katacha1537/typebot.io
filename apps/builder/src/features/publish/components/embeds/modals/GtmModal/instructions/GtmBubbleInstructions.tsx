import { useTypebot } from '@/features/editor/providers/TypebotProvider'
import { OrderedList, ListItem, Stack, Text, Code } from '@chakra-ui/react'
import { BubbleProps } from '@typebot.io/nextjs'
import { useState } from 'react'
import { BubbleSettings } from '../../../settings/BubbleSettings/BubbleSettings'
import { parseDefaultBubbleTheme } from '../../Javascript/instructions/JavascriptBubbleInstructions'
import { JavascriptBubbleSnippet } from '../../Javascript/JavascriptBubbleSnippet'

export const GtmBubbleInstructions = () => {
  const { typebot } = useTypebot()
  const [theme, setTheme] = useState<BubbleProps['theme']>(
    parseDefaultBubbleTheme(typebot)
  )
  const [previewMessage, setPreviewMessage] =
    useState<BubbleProps['previewMessage']>()

  return (
    <OrderedList spacing={4} pl={5}>
      <ListItem>
      No painel da sua conta GTM, clique em <Code>Adicionar uma nova tag</Code>
      </ListItem>
      <ListItem>
      Escolha o tipo de tag <Code>HTML personalizado</Code>
      </ListItem>
      <ListItem>
      Verifique <Code>Suporte document.write</Code>
      </ListItem>
      <ListItem>
        <Stack spacing={4}>
          <BubbleSettings
            theme={theme}
            previewMessage={previewMessage}
            defaultPreviewMessageAvatar={
              typebot?.theme.chat?.hostAvatar?.url ?? ''
            }
            onThemeChange={setTheme}
            onPreviewMessageChange={setPreviewMessage}
          />
          <Text>Paste the code below:</Text>
          <JavascriptBubbleSnippet
            theme={theme}
            previewMessage={previewMessage}
          />
        </Stack>
      </ListItem>
    </OrderedList>
  )
}
