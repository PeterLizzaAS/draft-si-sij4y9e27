import { Outlet } from 'react-router-dom'
import { useI18n } from '@/hooks/use-i18n'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function PublicLayout() {
  const { lang, setLang } = useI18n()

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="h-16 bg-white border-b flex items-center justify-between px-4 sm:px-8">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Draft SI</h1>
        <div className="flex items-center gap-4">
          <Select value={lang} onValueChange={(v: any) => setLang(v)}>
            <SelectTrigger className="w-[100px] h-8">
              <SelectValue placeholder="Lang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PT">PT-BR</SelectItem>
              <SelectItem value="EN">EN</SelectItem>
              <SelectItem value="ES">ES</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>
      <main className="flex-1 py-8 px-4 flex justify-center">
        <div className="w-full max-w-4xl bg-white shadow-elevation rounded-xl p-6 sm:p-8 animate-fade-in-up">
          <Outlet />
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-slate-500">
        <p>Draft SI Powered by Your Forwarder</p>
      </footer>
    </div>
  )
}
