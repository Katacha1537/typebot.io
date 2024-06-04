import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  HStack,
  ModalFooter,
  Button,
  Text,
  Box,
  Code,
  Stack,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { XCircleIcon } from '@/components/icons'
import { trpc } from '@/lib/trpc'

type Props = {
  workspaceId: string
  isOpen: boolean
  domain: string
  onClose: () => void
}

export const CustomDomainConfigModal = ({
  workspaceId,
  isOpen,
  onClose,
  domain,
}: Props) => {
  const { data, error } = trpc.customDomains.verifyCustomDomain.useQuery({
    name: domain,
    workspaceId,
  })

  const { domainJson, status } = data ?? {}

  if (!status || status === 'Valid Configuration' || !domainJson) return null

  if ('error' in domainJson) return null

  const subdomain = getSubdomain(domainJson.name, domainJson.apexName)

  const recordType = subdomain ? 'CNAME' : 'A'

  const txtVerification =
    (status === 'Pending Verification' &&
      domainJson.verification?.find((x) => x.type === 'TXT')) ||
    null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <XCircleIcon stroke="red.500" />
            <Text fontSize="lg" fontWeight="semibold">
              {status}
            </Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {txtVerification ? (
            <Stack spacing="4">
              <Text>
              Por favor defina o seguinte <Code>TXT</Code> record on{' '}
                <Text as="span" fontWeight="bold">
                  {domainJson.apexName}
                </Text>{' '}
                para provar a propriedade de{' '}
                <Text as="span" fontWeight="bold">
                  {domainJson.name}
                </Text>
                :
              </Text>
              <HStack
                justifyContent="space-between"
                alignItems="flex-start"
                spacing="6"
              >
                <Stack>
                  <Text fontWeight="bold">Type</Text>
                  <Text fontSize="sm" fontFamily="mono">
                    {txtVerification.type}
                  </Text>
                </Stack>
                <Stack>
                  <Text fontWeight="bold">Name</Text>
                  <Text fontSize="sm" fontFamily="mono">
                    {txtVerification.domain.slice(
                      0,
                      txtVerification.domain.length -
                        domainJson.apexName.length -
                        1
                    )}
                  </Text>
                </Stack>
                <Stack>
                  <Text fontWeight="bold">Value</Text>
                  <Text fontSize="sm" fontFamily="mono">
                    <Box text-overflow="ellipsis" white-space="nowrap">
                      {txtVerification.value}
                    </Box>
                  </Text>
                </Stack>
              </HStack>
              <Alert status="warning">
                <AlertIcon />
                <Text>
                Se você estiver usando este domínio para outro site, definindo este
 O registro TXT transferirá a propriedade do domínio para fora desse site
 e quebrá-lo. Por favor, tenha cuidado ao definir isso
                  record.
                </Text>
              </Alert>
            </Stack>
          ) : status === 'Unknown Error' ? (
            <Text mb="5" fontSize="sm">
              {error?.message}
            </Text>
          ) : (
            <Stack spacing={4}>
              <Text>
              Para configurar seu{' '}
                {recordType === 'A' ? 'apex domain' : 'subdomain'} (
                <Box as="span" fontWeight="bold">
                  {recordType === 'A' ? domainJson.apexName : domainJson.name}
                </Box>
                ), defina o seguinte {recordType} registrar em seu provedor DNS para
 continuar:
              </Text>
              <HStack justifyContent="space-between">
                <Stack>
                  <Text fontWeight="bold">Type</Text>
                  <Text fontFamily="mono" fontSize="sm">
                    {recordType}
                  </Text>
                </Stack>
                <Stack>
                  <Text fontWeight="bold">Name</Text>
                  <Text fontFamily="mono" fontSize="sm">
                    {recordType === 'A' ? '@' : subdomain ?? 'www'}
                  </Text>
                </Stack>
                <Stack>
                  <Text fontWeight="bold">Value</Text>
                  <Text fontFamily="mono" fontSize="sm">
                    {recordType === 'A'
                      ? '76.76.21.21'
                      : `cname.vercel-dns.com`}
                  </Text>
                </Stack>
                <Stack>
                  <Text fontWeight="bold">TTL</Text>
                  <Text fontFamily="mono" fontSize="sm">
                    86400
                  </Text>
                </Stack>
              </HStack>
              <Alert fontSize="sm">
                <AlertIcon />
                <Text>
                Nota: para TTL, se <Code>86400</Code> não está disponível, defina o
 maior valor possível. Além disso, a propagação do domínio pode ocupar
 a uma hora.
                </Text>
              </Alert>
            </Stack>
          )}
        </ModalBody>
        <ModalFooter as={HStack}>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const getSubdomain = (name: string, apexName: string) => {
  if (name === apexName) return null
  return name.slice(0, name.length - apexName.length - 1)
}
