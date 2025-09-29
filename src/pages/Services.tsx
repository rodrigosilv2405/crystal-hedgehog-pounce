import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Service {
  id: string;
  clientName: string;
  serviceType: string;
  date: Date;
  time: string;
  status: "agendado" | "concluido" | "cancelado";
  observations?: string;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      clientName: "Maria Silva",
      serviceType: "Instalação",
      date: new Date(2024, 5, 15),
      time: "09:00",
      status: "agendado"
    },
    {
      id: "2",
      clientName: "João Santos",
      serviceType: "Manutenção",
      date: new Date(2024, 5, 15),
      time: "14:30",
      status: "agendado"
    },
    {
      id: "3",
      clientName: "Ana Costa",
      serviceType: "Limpeza",
      date: new Date(2024, 5, 16),
      time: "10:00",
      status: "concluido"
    },
    {
      id: "4",
      clientName: "Carlos Oliveira",
      serviceType: "Reparo",
      date: new Date(2024, 5, 14),
      time: "11:00",
      status: "cancelado"
    }
  ]);

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterDate, setFilterDate] = useState<string>("");
  const [filterClient, setFilterClient] = useState("");

  const filteredServices = services.filter(service => {
    const matchesStatus = filterStatus === "all" || service.status === filterStatus;
    const matchesDate = filterDate === "" || 
      format(service.date, "yyyy-MM-dd") === filterDate;
    const matchesClient = filterClient === "" || 
      service.clientName.toLowerCase().includes(filterClient.toLowerCase());
    return matchesStatus && matchesDate && matchesClient;
  });

  const getStatusBadge = (status: Service["status"]) => {
    const variants = {
      "agendado": "default",
      "concluido": "secondary",
      "cancelado": "destructive"
    } as const;

    const labels = {
      "agendado": "Agendado",
      "concluido": "Concluído",
      "cancelado": "Cancelado"
    };

    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Serviços</h1>
            <p className="text-gray-600">Gerencie todos os serviços agendados</p>
          </div>
          <Button asChild>
            <Link to="/servicos/novo">+ Novo Serviço</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Serviços</CardTitle>
            <CardDescription>
              {filteredServices.length} serviço(s) encontrado(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Filtrar por Status</label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="agendado">Agendado</SelectItem>
                    <SelectItem value="concluido">Concluído</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Filtrar por Data</label>
                <Input
                  type="date"
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
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.clientName}</TableCell>
                      <TableCell>{service.serviceType}</TableCell>
                      <TableCell>{format(service.date, "dd/MM/yyyy", { locale: ptBR })}</TableCell>
                      <TableCell>{service.time}</TableCell>
                      <TableCell>{getStatusBadge(service.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Editar</Button>
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

export default Services;