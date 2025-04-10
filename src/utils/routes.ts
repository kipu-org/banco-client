export const ROUTES = {
  home: '/',
  signup: '/sign-up',
  login: {
    home: '/login',
  },
  dashboard: '/dashboard',
  settings: {
    home: '/settings',
    password: '/settings/password',
    twofa: '/settings/2fa',
    passkeys: '/settings/passkeys',
    appearance: '/settings/appearance',
    language: '/settings/language',
    referral: '/settings/referral',
  },
  transactions: {
    home: '/transactions',
    tx: (id: string) => `/transactions/${id}`,
  },
  swaps: {
    home: '/swaps',
  },
  wallet: {
    home: '/wallet',
    settings: '/wallet/settings',
    receive: '/wallet/receive',
    send: '/wallet/send',
  },
  contacts: {
    home: '/contacts',
  },
  setup: {
    wallet: {
      home: '/setup/wallet',
      new: '/setup/wallet/new',
      restore: '/setup/wallet/restore',
    },
  },
  success: {
    waitlist: '/success?variant=waitlist',
  },
  docs: {
    home: '/docs',
    faq: '/docs#faq',
    privacyPolicy: '/docs/legal/privacy-policy',
    termsOfService: '/docs/legal/terms-of-service',
    security: '/docs/security',
  },
  external: {
    github: 'https://github.com/kipu-org/banco-client',
    x: 'https://x.com/bancoapp',
    telegram: 'https://t.me/+FrzdhJw4piAzMzgx',
    support: 'mailto:support@amboss.tech',
    space: 'https://amboss.space',
  },
};
