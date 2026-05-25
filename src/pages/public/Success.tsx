import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

export function Success() {
  return (
    <div className="text-center py-12 space-y-6">
      <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto" />
      <h2 className="text-3xl font-bold text-slate-800">Draft SI Enviado!</h2>
      <p className="text-slate-600 max-w-md mx-auto">
        Os dados foram recebidos com sucesso e estão em análise pelo agente. Um e-mail de
        confirmação com o protocolo foi enviado para você.
      </p>
      <Card className="max-w-sm mx-auto bg-slate-50 border-dashed">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">Protocolo de Envio</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-mono font-bold">PROTO-2025-00041-v1</p>
        </CardContent>
      </Card>
      <div className="pt-6">
        <Button variant="outline" asChild>
          <a href="https://draftsi.com.br" target="_blank" rel="noreferrer">
            Voltar ao site
          </a>
        </Button>
      </div>
    </div>
  )
}
