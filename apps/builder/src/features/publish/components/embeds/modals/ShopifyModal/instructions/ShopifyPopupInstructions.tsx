import { OrderedList, ListItem, Stack, Text, Code } from '@chakra-ui/react'
import { useState } from 'react'
import { PopupSettings } from '../../../settings/PopupSettings'
import { JavascriptPopupSnippet } from '../../Javascript/JavascriptPopupSnippet'

export const ShopifyPopupInstructions = () => {
  const [inputValue, setInputValue] = useState<number>()

  return (
    <OrderedList spacing={4} pl={5}>
      <ListItem>
      No painel da sua loja, na página <Code>Temas</Code>, clique em{' '}
      <Code>Ações {'>'} Editar código</Code>
      </ListItem>
      <ListItem>
        <Stack spacing={4}>
          <PopupSettings
            onUpdateSettings={(settings) =>
              setInputValue(settings.autoShowDelay)
            }
          />
          <Text>
          No arquivo <Code>Layout {'>'} theme.liquid</Code>, cole este código apenas
          antes da tag de fechamento <Code>{'<head>'}</Code>:
          </Text>
          <JavascriptPopupSnippet autoShowDelay={inputValue} />
        </Stack>
      </ListItem>
    </OrderedList>
  )
}
