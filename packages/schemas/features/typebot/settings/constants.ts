export const defaultSettings = {
  general: {
    isInputPrefillEnabled: false,
    isHideQueryParamsEnabled: true,
    isNewResultOnRefreshEnabled: true,
    rememberUser: {
      isEnabled: false,
      storage: 'session',
    },
    isBrandingEnabled: false,
    isTypingEmulationEnabled: true,
  },
  typingEmulation: {
    enabled: true,
    speed: 400,
    maxDelay: 3,
    delayBetweenBubbles: 0,
    isDisabledOnFirstMessage: true,
  },
  metadata: {
    description:
      'Crie lindos formulários de conversação e incorpore-os diretamente em seus aplicativos, sem uma linha de código. Triplique sua taxa de resposta e colete respostas que tenham mais valor em comparação com um formulário tradicional.',
    favIconUrl: (viewerBaseUrl: string) => viewerBaseUrl + '/favicon.png',
    imageUrl: (viewerBaseUrl: string) => viewerBaseUrl + '/site-preview.png',
  },
} as const

export const rememberUserStorages = ['session', 'local'] as const
