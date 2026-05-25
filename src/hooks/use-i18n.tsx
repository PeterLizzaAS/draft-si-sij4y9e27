import React, { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'PT' | 'EN' | 'ES'

interface I18nContextProps {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  PT: {
    'login.title': 'Acesso ao Sistema',
    'login.email': 'E-mail',
    'login.password': 'Senha',
    'login.submit': 'Entrar',
    'sidebar.dashboard': 'Dashboard',
    'sidebar.analytics': 'Análise de Dados',
    'sidebar.settings': 'Configurações',
    'sidebar.users': 'Usuários',
    'sidebar.audit': 'Auditoria',
  },
  EN: {
    'login.title': 'System Access',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.submit': 'Login',
    'sidebar.dashboard': 'Dashboard',
    'sidebar.analytics': 'Analytics',
    'sidebar.settings': 'Settings',
    'sidebar.users': 'Users',
    'sidebar.audit': 'Audit Log',
  },
  ES: {
    'login.title': 'Acceso al Sistema',
    'login.email': 'Correo',
    'login.password': 'Contraseña',
    'login.submit': 'Entrar',
    'sidebar.dashboard': 'Panel',
    'sidebar.analytics': 'Análisis',
    'sidebar.settings': 'Ajustes',
    'sidebar.users': 'Usuarios',
    'sidebar.audit': 'Auditoría',
  },
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined)

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('PT')

  const t = (key: string) => translations[lang][key] || key

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>
}

export const useI18n = () => {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used within I18nProvider')
  return context
}
