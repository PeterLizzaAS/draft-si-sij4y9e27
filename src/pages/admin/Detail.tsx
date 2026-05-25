import { useParams } from 'react-router-dom'
import { useApp } from '@/hooks/use-app'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileText, Send, AlertTriangle, Download, RefreshCw, FileCheck } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

export function Detail() {
  const { id } = useParams()
  const { shipments, updateShipment } = useApp()
  const shipment = shipments.find((s) => s.id === id)

  if (!shipment) return <div>Processo não encontrado.</div>

  const handleApprove = () => {
    updateShipment(shipment.id, { status: 'txt_generated' })
    toast({ title: 'Sucesso', description: 'Dados aprovados e arquivo TXT gerado.' })
  }

  const handleReopen = () => {
    updateShipment(shipment.id, { status: 'awaiting_correction' })
    toast({ title: 'Link Reaberto', description: 'E-mail enviado ao exportador.' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          Processo {shipment.shipmentId}
          <Badge variant="outline" className="text-sm bg-white">
            {shipment.status.toUpperCase()}
          </Badge>
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReopen}>
            <RefreshCw className="w-4 h-4 mr-2" /> Reabrir Link
          </Button>
          <Button variant="outline">
            <Send className="w-4 h-4 mr-2" /> Solicitar VGM
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleApprove}>
            <FileCheck className="w-4 h-4 mr-2" /> Aprovar e Gerar TXT
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-500">Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Cliente:</span>
                <span className="text-sm text-slate-600">
                  {new Date(shipment.clientDeadline).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Armador:</span>
                <span className="text-sm text-slate-600">
                  {new Date(shipment.carrierDeadline).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-500">Resumo Operacional</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500">Exportador</p>
                <p className="font-medium">{shipment.exporterName || 'Pendente'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Navio / Voyage</p>
                <p className="font-medium">
                  {shipment.vessel} / {shipment.voyage}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="dados" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="dados"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
          >
            Dados Recebidos
          </TabsTrigger>
          <TabsTrigger
            value="docs"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
          >
            Documentos
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
          >
            Histórico
          </TabsTrigger>
        </TabsList>
        <div className="mt-6 bg-white p-6 rounded-lg border shadow-sm">
          <TabsContent value="dados" className="mt-0">
            {shipment.status === 'awaiting' ? (
              <div className="text-center py-12 text-slate-500 flex flex-col items-center">
                <AlertTriangle className="w-8 h-8 mb-4 text-amber-500" />
                <p>Aguardando submissão do exportador.</p>
              </div>
            ) : (
              <div className="space-y-8">
                <section>
                  <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 className="font-semibold text-lg">1. Partes Envolvidas</h3>
                    <Button variant="ghost" size="sm">
                      Editar
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-y-4">
                    <div>
                      <p className="text-sm text-slate-500">Shipper</p>
                      <p>{shipment.exporterName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Consignee</p>
                      <p>{shipment.importerName}</p>
                    </div>
                  </div>
                </section>
                <section>
                  <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 className="font-semibold text-lg">2. Transporte</h3>
                    <Button variant="ghost" size="sm">
                      Editar
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-y-4">
                    <div>
                      <p className="text-sm text-slate-500">Armador</p>
                      <p>{shipment.carrier}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">ETD</p>
                      <p>{shipment.etd}</p>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </TabsContent>
          <TabsContent value="docs" className="mt-0">
            <div className="flex items-center justify-between p-4 border rounded-md">
              <div className="flex items-center gap-3">
                <FileText className="text-blue-500 w-6 h-6" />
                <div>
                  <p className="font-medium text-sm">Commercial_Invoice_001.pdf</p>
                  <p className="text-xs text-slate-500">
                    Enviado em {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="history" className="mt-0 text-sm text-slate-600">
            <div className="border-l-2 border-slate-200 ml-3 pl-4 py-2 space-y-6">
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-blue-500 rounded-full ring-4 ring-white" />
                <p className="font-medium text-slate-900">Link enviado ao exportador</p>
                <p className="text-xs text-slate-500">
                  {new Date(shipment.clientDeadline).toLocaleString()}
                </p>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
