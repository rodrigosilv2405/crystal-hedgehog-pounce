import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Phone, MapPin } from "lucide-react";

interface Client {
  id: string;
  name: string;
  phone: string;
  address: string;
  serviceCount: number;
}

interface ServiceHistory {
  id: string;
  serviceType: string;
  date: Date;
  status: string;
}

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      name: "Maria Silva",
      phone: "(11) 99999-9999",
      address: "Rua das Flores, 123 - São Paulo",
      serviceCount: 5
    },
    {
      id: "2",
      name: "João Santos",
      phone: "(11) 98888-8888",
      address: "Av. Paulista, 456 - São Paulo",
      serviceCount: 3
    },
    {
      id: "3",
      name: "Ana Costa",
      phone: "(11) 97777-7777",
      address: "Rua Augusta, 789 - São Paulo",
      serviceCount: 2
    }
  ]);

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm) ||
    client.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clientHistory: ServiceHistory[] = selectedClient ? [
    {
      id: "1",
      serviceType: "Instalação",
      date: new Date(2024, 0, 15),
      status: "Concluído"
    },
    {
      id: "2",
      serviceType: "Manutenção",
      date: new Date(2024, 1, 20),
      status: "Concluído"
    },
    {
      id: "3",
      serviceType: "Limpeza",
      date: new Date(2024, 2, 10),
      status: "Concluído"
    }
  ] : [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
            <p className="text-gray-600">Gerencie seus clientes cadastrados</p>
          </div>
          <Button asChild>
            <Link to="/clientes/novo">+ Novo Cliente</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Clients List */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Clientes</CardTitle>
              <CardDescription>
                {filteredClients.length} cliente(s) encontrado(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <Input
                    placeholder="Buscar cliente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>Serviços</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClients.map((client) => (
                      <TableRow 
                        key={client.id}
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => setSelectedClient(client)}
                      >
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell>{client.phone}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{client.serviceCount}</Badge>
                        </TableCell>
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

          {/* Client Details */}
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedClient ? `Histórico de ${selectedClient.name}` : "Selecione um cliente"}
              </CardTitle>
              <CardDescription>
                {selectedClient ? "Histórico de serviços" : "Clique em um cliente para ver o histórico"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedClient && (
                <>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{selectedClient.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{selectedClient.address}</span>
                    </div>
                  </div>

                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tipo de Serviço</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {clientHistory.map((service) => (
                          <TableRow key={service.id}>
                            <TableCell className="font-medium">{service.serviceType}</TableCell>
                            <TableCell>{service.date.toLocaleDateString('pt-BR')}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{service.status}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Clients;