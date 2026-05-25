import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '@/hooks/use-app'
import { useI18n } from '@/hooks/use-i18n'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export function Login() {
  const { login, currentUser } = useApp()
  const { t } = useI18n()
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@draftsi.com')

  if (currentUser) {
    navigate('/admin/list')
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login(email)
    navigate('/admin/list')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-sm shadow-elevation border-0">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{t('login.title')}</CardTitle>
          <CardDescription>Enter your credentials to access the agent portal</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('login.email')}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('login.password')}</Label>
              <Input id="password" type="password" defaultValue="password" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-blue-600 hover:bg-blue-700" type="submit">
              {t('login.submit')}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
