import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Calendar } from "lucide-react";

interface ReportData {
  month: string;
  installations: number;
  maintenance: number;
  cleaning: number;
  repairs: number;
  total: number;
  revenue: number;
}

const Reports = () => {
  const [selectedMonth, setSelectedMonth] = useState("2024-06");

  const reportData: ReportData[] = [
    {
      month: "2024-06",
      installations: 8,
      maintenance: 12,
      cleaning: 6,
      repairs: 4,
      total: 30,
      revenue: 8500
    },
    {
      month: "2024-05",
      installations: 6,
      maintenance: 10,
      cleaning: 5,
      repairs: 3,
      total: 24,
      revenue: 6800
    },
    {
      month: "2024-04",
      installations: 7,
      maintenance: 8,
      cleaning: 4,
      repairs: 2,
      total: 21,
      revenue: 5900
    }
  ];

  const currentMonthData = reportData.find(data => data.month === selectedMonth) || reportData[0];

  const chartData = [
    { name: 'Instalações', value: currentMonthData.installations },
    { name: 'Manutenções', value: currentMonthData.maintenance },
    { name: 'Limpezas', value: currentMonthData.cleaning },
    { name: 'Reparos', value: currentMonthData.repairs }
  ];

  const exportToExcel = () => {
    // Implementation for Excel export
    alert("Exportando relatório para Excel...");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
            <p className="text-gray-600">Resumo mensal dos serviços</p>
          </div>
          <Button onClick={exportToExcel}>
            <Download className="mr-2 h-4 w-4" />
            Exportar para Excel
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Resumo Mensal</CardTitle>
              <CardDescription>Selecione o mês para visualizar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-6">
                <Calendar className="h-5 w-5 text-gray-500" />
                <Input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="max-w-xs"
                />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-2xl font-bold text-blue-600">{currentMonthData.total}</h3>
                    <p className="text-sm text-blue-600">Total de Serviços</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-2xl font-bold text-green-600">
                      R$ {currentMonthData.revenue.toLocaleString('pt-BR')}
                    </h3>
                    <p className="text-sm text-green-600">Faturamento</p>
                  </div>
                </div>

                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tipo de Serviço</TableHead>
                        <TableHead>Quantidade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Instalações</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{currentMonthData.installations}</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Manutenções</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{currentMonthData.maintenance}</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Limpezas</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{currentMonthData.cleaning}</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Reparos</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{currentMonthData.repairs}</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chart Visualization */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição dos Serviços</CardTitle>
              <CardDescription>Gráfico de serviços por tipo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Historical Data */}
        <Card>
          <CardHeader>
            <CardTitle>Dados Históricos</CardTitle>
            <CardDescription>Comparativo mensal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mês</TableHead>
                    <TableHead>Instalações</TableHead>
                    <TableHead>Manutenções</TableHead>
                    <TableHead>Limpezas</TableHead>
                    <TableHead>Reparos</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Faturamento</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.map((data) => (
                    <TableRow key={data.month}>
                      <TableCell className="font-medium">
                        {new Date(data.month + '-01').toLocaleDateString('pt-BR', { 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </TableCell>
                      <TableCell>{data.installations}</TableCell>
                      <TableCell>{data.maintenance}</TableCell>
                      <TableCell>{data.cleaning}</TableCell>
                      <TableCell>{data.repairs}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{data.total}</Badge>
                      </TableCell>
                      <TableCell>
                        R$ {data.revenue.toLocaleString('pt-BR')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;