import { version } from '../../package.json'

export interface ActionType {
  title: {
    en: string
    tr: string
    de?: string
    es?: string
    fr?: string
  }
  subtitle: {
    en: string
    tr: string
    de?: string
    es?: string
    fr?: string
  }
  icon: string
  disabled: boolean
  emit: string
}
