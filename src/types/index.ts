export type Status =
  | 'awaiting'
  | 'submitted'
  | 'in_review'
  | 'editing'
  | 'awaiting_correction'
  | 'approved'
  | 'txt_generated'
  | 'expired'

export interface Shipment {
  id: string
  shipmentId: string
  exporterName?: string
  importerName?: string
  carrier?: string
  vessel?: string
  voyage?: string
  etd?: string
  clientDeadline: string
  carrierDeadline: string
  status: Status
}

export interface User {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'OPERATOR'
  status: 'ACTIVE' | 'INACTIVE'
}

export interface AuditLog {
  id: string
  shipmentId: string
  user: string
  eventType: string
  createdAt: string
  metadata?: any
}
