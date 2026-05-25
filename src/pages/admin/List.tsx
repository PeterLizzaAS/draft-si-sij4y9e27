import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '@/hooks/use-app'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Search, Eye } from 'lucide-react'

export function List() {
  const { shipments } = useApp()
  const [search, setSearch] = useState('')

  const filtered = shipments.filter(
    (s) =>
      s.shipmentId.toLowerCase().includes(search.toLowerCase()) ||
      (s.exporterName && s.exporterName.toLowerCase().includes(search.toLowerCase())),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'awaiting':
        return 'bg-slate-200 text-slate-800'
      case 'submitted':
      case 'in_review':
        return 'bg-amber-100 text-amber-800'
      case 'approved':
      case 'txt_generated':
        return 'bg-emerald-100 text-emerald-800'
      case 'expired':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  const isCritical = (deadline: string, status: string) => {
    if (status === 'expired') return true
    if (['awaiting', 'awaiting_correction'].includes(status)) {
      const diff = new Date(deadline).getTime() - Date.now()
      return diff <= 2 * 60 * 60 * 1000 && diff > 0
    }
    return false
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Processos Ativos (SI)</h2>
        <div className="relative w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Buscar ID ou Exportador..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>Shipment ID</TableHead>
              <TableHead>Exportador</TableHead>
              <TableHead>Deadline Cliente</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((s) => {
              const critical = isCritical(s.clientDeadline, s.status)
              return (
                <TableRow key={s.id} className={critical ? 'bg-red-50/50' : ''}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {critical && (
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      )}
                      {s.shipmentId}
                    </div>
                  </TableCell>
                  <TableCell>{s.exporterName || '-'}</TableCell>
                  <TableCell>
                    {new Date(s.clientDeadline).toLocaleString('pt-BR', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusColor(s.status)}>
                      {s.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/admin/si/${s.id}`}>
                        <Eye className="w-4 h-4 mr-2" /> Visualizar
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                  Nenhum processo encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
