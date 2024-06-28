import { AlertInfo } from '@/components/AlertInfo'
import { CodeEditor } from '@/components/inputs/CodeEditor'
import { TextLink } from '@/components/TextLink'
import { useTypebot } from '@/features/editor/providers/TypebotProvider'
import {
  Code,
  Heading,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  OrderedList,
  Stack,
  Text,
} from '@chakra-ui/react'
import { ModalProps } from '../EmbedButton'
import { parseApiHost } from '../snippetParsers/shared'

export const ApiModal = ({
  isPublished,
  publicId,
  isOpen,
  onClose,
}: ModalProps): JSX.Element => {
  const { typebot } = useTypebot()

  const replyBody = `{
  "message": "This is my reply"
}`

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="md">API</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody as={Stack} spacing="6">
          {!isPublished && (
            <AlertInfo>Você precisa publicar seu bot primeiro.</AlertInfo>
          )}
          <OrderedList spacing={4} pl="4">
            <ListItem>
              <Stack>
                <Text>
                Para iniciar o chat, envie uma solicitação <Code>POST</Code> para
                </Text>
                <CodeEditor
                  isReadOnly
                  lang={'shell'}
                  value={`${parseApiHost(
                    typebot?.customDomain
                  )}/api/v1/typebots/${publicId}/startChat`}
                />
              </Stack>
            </ListItem>
            <ListItem>
            A primeira resposta conterá um <Code>sessionId</Code> que você
            será necessário para solicitações subsequentes.
            </ListItem>
            <ListItem>
              <Stack>
                <Text>
                Para enviar respostas, envie solicitações <Code>POST</Code> para
                </Text>
                <CodeEditor
                  isReadOnly
                  lang={'shell'}
                  value={`${parseApiHost(
                    typebot?.customDomain
                  )}/api/v1/sessions/<ID_FROM_FIRST_RESPONSE>/continueChat`}
                />
                <Text>Com o seguinte corpo JSON:</Text>
                <CodeEditor isReadOnly lang={'json'} value={replyBody} />
                <Text>
                Substitua <Code>{'<ID_FROM_FIRST_RESPONSE>'}</Code> por{' '}
                <Code>sessionId</Code>.
                </Text>
              </Stack>
            </ListItem>
          </OrderedList>
          <Text fontSize="sm" colorScheme="gray">
            Confira a{' '}
          <TextLink
          href="https://docs.typebot.io/api-reference/chat/start-chat"
          isExternal
          >
            Referência da API
            </TextLink>{' '}
            Para maiores informações
          </Text>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}
