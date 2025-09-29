import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Download } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Service {
  id: string;
  clientName: string;
  serviceType: string;
  date: Date;
  time: string;
  status: "concluido";
  observations?: string;
}

const History = () => {
  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      clientName: "Maria Silva",
      serviceType: "Instalação",
      date: new Date(2024, 4, 15),
      time: "09:00",
      status: "concluido",
      observations: "Instalação completa do sistema"
    },
    {
      id: "2",
      clientName: "João Santos",
      serviceType: "Manutenção",
      date: new Date(2024, 4, 20),
      time: "14:30",
      status: "concluido",
      observations: "Troca de peças e ajustes"
    },
    {
      id: "3",
      clientName: "Ana Costa",
      serviceType: "Limpeza",
      date: new Date(2024, 4, 25),
      time: "10:00",
      status: "concluido"
    },
    {
      id: "4",
      clientName: "Carlos Oliveira",
      serviceType: "Reparo",
      date: new Date(2024, 5, 1),
      time: "11:00",
      status: "concluido",
      observations: "Reparo de vazamento"
    }
  ]);

  const [filterType, setFilterType] = useState<string>("all");
  const [filterDate, setFilterDate] = useState<string>("");
  const [filterClient, setFilterClient] = useState("");

  const filteredServices = services.filter(service => {
    const matchesType = filterType === "all" || service.serviceType === filterType;
    const matchesDate = filterDate === "" || 
      format(service.date, "yyyy-MM") === filterDate;
    const matchesClient = filterClient === "" || 
      service.clientName.toLowerCase().includes(filterClient.toLowerCase());
    return matchesType && matchesDate && matchesClient;
  });

  const exportToExcel = () => {
    // Implementation for Excel export
    alert("Exportando para Excel...");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Histórico</h1>
            <p className="text-gray-600">Serviços já concluídos</p>
          </div>
          <Button onClick={exportToExcel}>
            <Download className="mr-2 h-4 w-4" />
            Exportar para Excel
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Serviços</CardTitle>
            <CardDescription>
              {filteredServices.length} serviço(s) concluído(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Filtrar por Tipo</label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="Instalação">Instalação</SelectItem>
                    <SelectItem value="Manutenção">Manutenção</SelectItem>
                    <SelectItem value="Limpeza">Limpeza</SelectItem>
                    <SelectItem value="Reparo">Reparo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Filtrar por Mês/Ano</label>
                <Input
                  type="month"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Filtrar por Cliente</label>
                <Input
                  placeholder="Digite o nome do cliente"
                  value={filterClient}
                  onChange={(e) => setFilterClient(e.target.value)}
                />
              </div>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Tipo de Serviço</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Horário</TableHead>
                    <TableHead>Observações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.clientName}</TableCell>
                      <TableCell>{service.serviceType}</TableCell>
                      <TableCell>{format(service.date, "dd/MM/yyyy", { locale: ptBR })}</TableCell>
                      <TableCell>{service.time}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {service.observations || "Nenhuma observação"}
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

export default History;