import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

export function Settings() {
  const handleSave = () => {
    toast({ title: 'Configurações Salvas', description: 'As preferências foram atualizadas.' })
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-2xl font-bold text-slate-800">Configurações</h2>

      <Card>
        <CardHeader>
          <CardTitle>Dados da Agência</CardTitle>
          <CardDescription>Informações globais utilizadas nos e-mails e sistema.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Nome da Agência</Label>
            <Input defaultValue="Your Forwarder Logistics" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>E-mail de Contato</Label>
              <Input defaultValue="contato@forwarder.com" />
            </div>
            <div className="space-y-2">
              <Label>CNPJ</Label>
              <Input defaultValue="00.000.000/0001-00" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mensagens Públicas</CardTitle>
          <CardDescription>Textos exibidos para o exportador no formulário.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Mensagem de Responsabilidade (Upload)</Label>
            <Textarea
              defaultValue="Ao enviar documentos para pré-preenchimento automático, você declara que é responsável pela conferência e validação de todos os dados..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
        Salvar Alterações
      </Button>
    </div>
  )
}
