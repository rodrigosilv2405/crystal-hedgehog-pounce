import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, FileText, History } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Service {
  id: string;
  clientName: string;
  serviceType: string;
  date: Date;
  time: string;
  status: "agendado" | "concluido" | "cancelado";
}

const Dashboard = () => {
  const [todayServices, setTodayServices] = useState<Service[]>([]);

  useEffect(() => {
    // Mock data for demonstration
    const mockServices: Service[] = [
      {
        id: "1",
        clientName: "Maria Silva",
        serviceType: "Instalação",
        date: new Date(),
        time: "09:00",
        status: "agendado"
      },
      {
        id: "2",
        clientName: "João Santos",
        serviceType: "Manutenção",
        date: new Date(),
        time: "14:30",
        status: "agendado"
      },
      {
        id: "3",
        clientName: "Ana Costa",
        serviceType: "Limpeza",
        date: new Date(),
        time: "16:00",
        status: "agendado"
      }
    ];
    setTodayServices(mockServices);
  }, []);

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
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">
              {format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </p>
          </div>
          <Button asChild>
            <Link to="/servicos/novo">+ Novo Serviço</Link>
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25</div>
              <p className="text-xs text-muted-foreground">Total cadastrados</p>
              <Button variant="link" className="p-0 mt-2" asChild>
                <Link to="/clientes">Ver todos</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Serviços Hoje</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayServices.length}</div>
              <p className="text-xs text-muted-foreground">Agendados para hoje</p>
              <Button variant="link" className="p-0 mt-2" asChild>
                <Link to="/servicos">Ver agenda</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Histórico</CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">Serviços concluídos</p>
              <Button variant="link" className="p-0 mt-2" asChild>
                <Link to="/historico">Ver histórico</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Relatórios</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Relatórios mensais</p>
              <Button variant="link" className="p-0 mt-2" asChild>
                <Link to="/relatorios">Gerar relatório</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Today's Services */}
        <Card>
          <CardHeader>
            <CardTitle>Serviços de Hoje</CardTitle>
            <CardDescription>Lista de serviços agendados para hoje em ordem de horário</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayServices.map((service) => (
                <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{service.clientName}</h3>
                      <p className="text-sm text-gray-600">{service.serviceType}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{service.time}</p>
                    {getStatusBadge(service.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;