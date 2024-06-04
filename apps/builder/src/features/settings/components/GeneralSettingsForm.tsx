import {
  FormControl,
  FormLabel,
  HStack,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { Settings } from '@typebot.io/schemas'
import React from 'react'
import { isDefined } from '@typebot.io/lib'
import { SwitchWithLabel } from '@/components/inputs/SwitchWithLabel'
import { SwitchWithRelatedSettings } from '@/components/SwitchWithRelatedSettings'
import { DropdownList } from '@/components/DropdownList'
import { MoreInfoTooltip } from '@/components/MoreInfoTooltip'
import {
  defaultSettings,
  rememberUserStorages,
} from '@typebot.io/schemas/features/typebot/settings/constants'

type Props = {
  generalSettings: Settings['general'] | undefined
  onGeneralSettingsChange: (generalSettings: Settings['general']) => void
}

export const GeneralSettingsForm = ({
  generalSettings,
  onGeneralSettingsChange,
}: Props) => {
  const keyBg = useColorModeValue(undefined, 'gray.600')
  const toggleRememberUser = (isEnabled: boolean) =>
    onGeneralSettingsChange({
      ...generalSettings,
      rememberUser: {
        ...generalSettings?.rememberUser,
        isEnabled,
      },
    })

  const handleInputPrefillChange = (isInputPrefillEnabled: boolean) =>
    onGeneralSettingsChange({
      ...generalSettings,
      isInputPrefillEnabled,
    })

  const handleHideQueryParamsChange = (isHideQueryParamsEnabled: boolean) =>
    onGeneralSettingsChange({
      ...generalSettings,
      isHideQueryParamsEnabled,
    })

  const updateRememberUserStorage = (
    storage: NonNullable<
      NonNullable<Settings['general']>['rememberUser']
    >['storage']
  ) =>
    onGeneralSettingsChange({
      ...generalSettings,
      rememberUser: {
        ...generalSettings?.rememberUser,
        storage,
      },
    })

  return (
    <Stack spacing={6}>
      <SwitchWithLabel
        label="Entrada de pré-preenchimento"
        initialValue={
          generalSettings?.isInputPrefillEnabled ??
          defaultSettings.general.isInputPrefillEnabled
        }
        onCheckChange={handleInputPrefillChange}
        moreInfoContent="As entradas são automaticamente pré-preenchidas sempre que sua variável associada tiver um valor"
      />
      <SwitchWithLabel
        label="Ocultar parâmetros de consulta no início do bot"
        initialValue={
          generalSettings?.isHideQueryParamsEnabled ??
          defaultSettings.general.isHideQueryParamsEnabled
        }
        onCheckChange={handleHideQueryParamsChange}
        moreInfoContent="Se o seu URL contiver parâmetros de consulta, eles serão ocultados automaticamente quando o bot for iniciado."
      />
      <SwitchWithRelatedSettings
        label={'Relembrar usuário'}
        moreInfoContent="Se ativado, o estado do chat será restaurado se o usuário retornar após sair."
        initialValue={
          generalSettings?.rememberUser?.isEnabled ??
          (isDefined(generalSettings?.isNewResultOnRefreshEnabled)
            ? !generalSettings?.isNewResultOnRefreshEnabled
            : false)
        }
        onCheckChange={toggleRememberUser}
      >
        <FormControl as={HStack} justifyContent="space-between">
          <FormLabel mb="0">
            Storage:&nbsp;
            <MoreInfoTooltip>
              <Stack>
                <Text>
                  Escolha{' '}
                  <Tag size="sm" bgColor={keyBg}>
                    session
                  </Tag>{' '}
                  para relembrar do usuário desde que ele não feche a aba ou
 o navegador.
                </Text>
                <Text>
                  Escolha{' '}
                  <Tag size="sm" bgColor={keyBg}>
                    local
                  </Tag>{' '}
                  para relembrar o usuário para sempre no mesmo dispositivo.
                </Text>
              </Stack>
            </MoreInfoTooltip>
          </FormLabel>
          <DropdownList
            currentItem={generalSettings?.rememberUser?.storage ?? 'session'}
            onItemSelect={updateRememberUserStorage}
            items={rememberUserStorages}
          ></DropdownList>
        </FormControl>
      </SwitchWithRelatedSettings>
    </Stack>
  )
}
