import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from 'recharts'

export function Analytics() {
  const data = [
    { name: 'Jan', recebidos: 40, editados: 24 },
    { name: 'Fev', recebidos: 30, editados: 13 },
    { name: 'Mar', recebidos: 20, editados: 98 },
    { name: 'Abr', recebidos: 27, editados: 39 },
    { name: 'Mai', recebidos: 18, editados: 48 },
    { name: 'Jun', recebidos: 23, editados: 38 },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Análise de Dados</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SIs Recebidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">+19% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uso de IA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73%</div>
            <p className="text-xs text-muted-foreground">Exportadores utilizam upload</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Edição</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14%</div>
            <p className="text-xs text-muted-foreground">Processos editados por agentes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reaberturas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5%</div>
            <p className="text-xs text-muted-foreground">Links devolvidos para correção</p>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Histórico de Submissões</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ChartContainer
            config={{
              recebidos: { label: 'Recebidos', color: 'hsl(var(--primary))' },
              editados: { label: 'Editados', color: 'hsl(var(--chart-2))' },
            }}
            className="h-[300px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="recebidos" fill="var(--color-recebidos)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="editados" fill="var(--color-editados)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
