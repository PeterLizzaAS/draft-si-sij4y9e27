import { Shipment, User, AuditLog } from '@/types'

export const mockShipments: Shipment[] = [
  {
    id: '1',
    shipmentId: 'CW1-2025-00041',
    exporterName: 'Exportadora Brasil LTDA',
    importerName: 'Rotterdam Imports BV',
    carrier: 'Maersk',
    vessel: 'MSC Gulsun',
    voyage: 'FN512E',
    etd: '2025-06-15',
    clientDeadline: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // +1 day
    carrierDeadline: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(), // +2 days
    status: 'awaiting',
  },
  {
    id: '2',
    shipmentId: 'CW1-2025-00042',
    exporterName: 'AgroSul S.A.',
    importerName: 'Global Foods LLC',
    carrier: 'MSC',
    vessel: 'MSC Istanbul',
    voyage: 'AX100W',
    etd: '2025-06-20',
    clientDeadline: new Date(Date.now() + 1000 * 60 * 60 * 1).toISOString(), // +1 hour (critical)
    carrierDeadline: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // +1 day
    status: 'submitted',
  },
  {
    id: '3',
    shipmentId: 'CW1-2025-00043',
    exporterName: 'TechParts Indústria',
    importerName: 'EuroTech GmbH',
    carrier: 'Hapag-Lloyd',
    vessel: 'Berlin Express',
    voyage: 'EU992N',
    etd: '2025-06-10',
    clientDeadline: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // -1 day
    carrierDeadline: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // +1 day
    status: 'expired',
  },
]

export const mockUsers: User[] = [
  { id: '1', name: 'Admin Silva', email: 'admin@draftsi.com', role: 'ADMIN', status: 'ACTIVE' },
  { id: '2', name: 'Operador Santos', email: 'op@draftsi.com', role: 'OPERATOR', status: 'ACTIVE' },
]

export const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    shipmentId: 'CW1-2025-00041',
    user: 'Admin Silva',
    eventType: 'link_created',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    shipmentId: 'CW1-2025-00042',
    user: 'Exportador',
    eventType: 'form_submitted',
    createdAt: new Date().toISOString(),
  },
]
