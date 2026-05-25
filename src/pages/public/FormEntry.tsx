import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useFormStore } from '@/stores/use-form-store'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AlertTriangle, UploadCloud, ChevronRight, ChevronLeft, Send } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

export function FormEntry() {
  const { shipment_id } = useParams()
  const navigate = useNavigate()
  const { step, nextStep, prevStep } = useFormStore()

  // Minimal multistep logic for demonstration
  const steps = ['Upload', 'Partes', 'Transporte', 'Carga', 'Containers', 'Instruções', 'Revisão']

  const handleManualSkip = () => nextStep()

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6 text-center">
            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg flex items-start text-left gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm">
                Ao enviar documentos para pré-preenchimento automático, você declara que é
                responsável pela conferência de todos os dados antes do envio final.
              </p>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 hover:bg-slate-50 transition-colors cursor-pointer group">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="font-medium text-slate-700">Arraste seus documentos ou clique aqui</p>
                <p className="text-xs text-slate-500">PDF, XLSX, DOCX (Máx. 10MB)</p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button onClick={nextStep} className="bg-blue-600 w-full sm:w-auto">
                Processar com IA
              </Button>
              <Button variant="link" onClick={handleManualSkip} className="text-slate-500">
                Pular e preencher manualmente
              </Button>
            </div>
          </div>
        )
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold">1. Partes Envolvidas</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-700 border-b pb-2">Shipper</h4>
                <div className="space-y-2">
                  <Label>Razão Social *</Label>
                  <Input placeholder="Exportadora Ltda" />
                </div>
                <div className="space-y-2">
                  <Label>CNPJ</Label>
                  <Input placeholder="00.000.000/0001-00" />
                </div>
                <div className="space-y-2">
                  <Label>Endereço Completo *</Label>
                  <Textarea />
                </div>
                <div className="space-y-2">
                  <Label>E-mail *</Label>
                  <Input type="email" />
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-700 border-b pb-2">Consignee</h4>
                <div className="space-y-2">
                  <Label>Razão Social *</Label>
                  <Input placeholder="Importer Inc" />
                </div>
                <div className="space-y-2">
                  <Label>Endereço Completo *</Label>
                  <Textarea />
                </div>
                <div className="space-y-2">
                  <Label>E-mail *</Label>
                  <Input type="email" />
                </div>
              </div>
            </div>
          </div>
        )
      case 2:
      case 3:
      case 4:
      case 5:
        return (
          <div className="space-y-6 animate-fade-in text-center py-12">
            <h3 className="text-xl font-bold text-slate-700">
              Etapa {step}: {steps[step]}
            </h3>
            <p className="text-slate-500">
              Campos do formulário para esta etapa (simplificado para demonstração).
            </p>
          </div>
        )
      case 6:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold">Revisão Final</h3>
            <div className="bg-slate-50 p-6 rounded-lg border space-y-4 text-sm text-slate-600">
              <p>
                Por favor, revise todos os dados com atenção. Uma vez submetido, o agente será
                notificado.
              </p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const handleFinish = () => {
    toast({ title: 'Enviado com sucesso!' })
    navigate('/success')
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-medium text-slate-500 mb-2 uppercase tracking-wider">
          Draft SI • {shipment_id}
        </p>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-4">
          {steps.map((s, i) => (
            <span key={s} className={i === step ? 'text-blue-600 font-bold' : ''}>
              {s} {i < steps.length - 1 && ' > '}
            </span>
          ))}
        </div>
        <Progress value={(step / (steps.length - 1)) * 100} className="h-2" />
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="min-h-[400px]">
        {renderStepContent()}

        {step > 0 && (
          <div className="mt-8 pt-6 border-t flex items-center justify-between">
            <Button type="button" variant="outline" onClick={prevStep}>
              <ChevronLeft className="w-4 h-4 mr-2" /> Voltar
            </Button>
            {step < 6 ? (
              <Button type="button" className="bg-blue-600" onClick={nextStep}>
                Avançar <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="button"
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={handleFinish}
              >
                Confirmar Envio <Send className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        )}
      </form>
    </div>
  )
}
