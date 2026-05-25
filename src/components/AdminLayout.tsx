import { Outlet, Navigate, Link, useLocation } from 'react-router-dom'
import { useApp } from '@/hooks/use-app'
import { useI18n } from '@/hooks/use-i18n'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { LayoutDashboard, BarChart3, Settings, Users, FileText, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'

export function AdminLayout() {
  const { currentUser, logout } = useApp()
  const { t } = useI18n()
  const location = useLocation()

  if (!currentUser) return <Navigate to="/" replace />

  const navItems = [
    { name: t('sidebar.dashboard'), icon: LayoutDashboard, path: '/admin/list' },
    { name: t('sidebar.analytics'), icon: BarChart3, path: '/admin/analytics' },
    { name: t('sidebar.settings'), icon: Settings, path: '/admin/settings' },
    { name: t('sidebar.users'), icon: Users, path: '/admin/users' },
    { name: t('sidebar.audit'), icon: FileText, path: '/admin/audit' },
  ]

  const currentPath = location.pathname.split('/').pop() || 'list'

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50">
        <Sidebar className="border-r bg-slate-900 text-white border-slate-800">
          <SidebarHeader className="p-4 bg-slate-900 border-b border-slate-800">
            <h1 className="text-xl font-bold text-white tracking-tight">Draft SI</h1>
            <p className="text-xs text-slate-400">Agent Portal</p>
          </SidebarHeader>
          <SidebarContent className="bg-slate-900 mt-4 px-2">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                    className="text-slate-300 hover:text-white hover:bg-slate-800 data-[active=true]:bg-blue-600 data-[active=true]:text-white"
                  >
                    <Link to={item.path}>
                      <item.icon className="w-4 h-4 mr-2" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-col flex-1 w-full overflow-hidden">
          <header className="h-14 border-b bg-white flex items-center justify-between px-6 shrink-0">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/list">Admin</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="capitalize">{currentPath}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">{currentUser.name}</span>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </Button>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
