import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Shipment, User, AuditLog } from '@/types'
import { mockShipments, mockUsers, mockAuditLogs } from '@/data/mock'

interface AppContextProps {
  shipments: Shipment[]
  users: User[]
  auditLogs: AuditLog[]
  updateShipment: (id: string, data: Partial<Shipment>) => void
  currentUser: User | null
  login: (email: string) => void
  logout: () => void
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [shipments, setShipments] = useState<Shipment[]>(mockShipments)
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(mockAuditLogs)
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers[0])

  const updateShipment = (id: string, data: Partial<Shipment>) => {
    setShipments((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)))
  }

  const login = (email: string) => {
    const user = users.find((u) => u.email === email)
    if (user) setCurrentUser(user)
  }

  const logout = () => setCurrentUser(null)

  return (
    <AppContext.Provider
      value={{ shipments, users, auditLogs, updateShipment, currentUser, login, logout }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}
