import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AppProvider } from '@/hooks/use-app'
import { I18nProvider } from '@/hooks/use-i18n'

import { Login } from './pages/Login'
import { AdminLayout } from './components/AdminLayout'
import { PublicLayout } from './components/PublicLayout'
import { List } from './pages/admin/List'
import { Detail } from './pages/admin/Detail'
import { Analytics } from './pages/admin/Analytics'
import { Settings } from './pages/admin/Settings'
import { Users } from './pages/admin/Users'
import { Audit } from './pages/admin/Audit'
import { FormEntry } from './pages/public/FormEntry'
import { Success } from './pages/public/Success'
import NotFound from './pages/NotFound'

const App = () => (
  <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
    <I18nProvider>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Entry / Auth */}
            <Route path="/" element={<Login />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="list" element={<List />} />
              <Route path="si/:id" element={<Detail />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
              <Route path="users" element={<Users />} />
              <Route path="audit" element={<Audit />} />
            </Route>

            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/si/:shipment_id" element={<FormEntry />} />
              <Route path="/success" element={<Success />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AppProvider>
    </I18nProvider>
  </BrowserRouter>
)

export default App
