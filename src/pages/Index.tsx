import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { showSuccess, showError } from "@/utils/toast";

interface Order {
  id: string;
  itemName: string;
  quantity: number;
  customerName: string;
  orderDate: Date;
  deliveryDate: Date;
  status: "em andamento" | "entregue" | "atrasado";
}

const Index = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [formData, setFormData] = useState({
    itemName: "",
    quantity: 1,
    customerName: "",
    orderDate: new Date(),
    deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    status: "em andamento" as Order["status"]
  });
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCustomer, setFilterCustomer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: Order = {
      id: Date.now().toString(),
      ...formData
    };
    setOrders([...orders, newOrder]);
    showSuccess("Encomenda cadastrada com sucesso!");
    setFormData({
      itemName: "",
      quantity: 1,
      customerName: "",
      orderDate: new Date(),
      deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: "em andamento"
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    const matchesCustomer = filterCustomer === "" || 
      order.customerName.toLowerCase().includes(filterCustomer.toLowerCase());
    return matchesStatus && matchesCustomer;
  });

  const exportToExcel = () => {
    const csvContent = [
      ["Nome do Item", "Quantidade", "Cliente", "Data Saída", "Data Entrega", "Status"],
      ...filteredOrders.map(order => [
        order.itemName,
        order.quantity.toString(),
        order.customerName,
        format(order.orderDate, "dd/MM/yyyy", { locale: ptBR }),
        format(order.deliveryDate, "dd/MM/yyyy", { locale: ptBR }),
        order.status
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `encomendas_${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();
    showSuccess("Arquivo exportado com sucesso!");
  };

  const getStatusBadge = (status: Order["status"]) => {
    const variants = {
      "em andamento": "default",
      "entregue": "secondary",
      "atrasado": "destructive"
    } as const;

    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const isOverdue = (deliveryDate: Date) => {
    return new Date() > deliveryDate;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Sistema de Encomendas</h1>
          <p className="text-lg text-gray-600">Gerencie suas encomendas de itens especiais</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cadastro Form */}
          <Card>
            <CardHeader>
              <CardTitle>Cadastrar Nova Encomenda</CardTitle>
              <CardDescription>Preencha os dados do item especial</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="itemName">Nome do Item</Label>
                  <Input
                    id="itemName"
                    value={formData.itemName}
                    onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                    required
                    placeholder="Ex: Bolo de Chocolate"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantidade</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerName">Nome do Cliente</Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    required
                    placeholder="Ex: Maria Silva"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Data de Saída</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.orderDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.orderDate ? format(formData.orderDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecione a data"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.orderDate}
                          onSelect={(date) => date && setFormData({ ...formData, orderDate: date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Data de Entrega Prevista</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.deliveryDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.deliveryDate ? format(formData.deliveryDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecione a data"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.deliveryDate}
                          onSelect={(date) => date && setFormData({ ...formData, deliveryDate: date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: Order["status"]) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="em andamento">Em Andamento</SelectItem>
                      <SelectItem value="entregue">Entregue</SelectItem>
                      <SelectItem value="atrasado">Atrasado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full">
                  Cadastrar Encomenda
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Lista de Encomendas */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Encomendas</CardTitle>
              <CardDescription>
                {filteredOrders.length} encomenda(s) encontrada(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <Label htmlFor="filterStatus">Filtrar por Status</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="em andamento">Em Andamento</SelectItem>
                      <SelectItem value="entregue">Entregue</SelectItem>
                      <SelectItem value="atrasado">Atrasado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-1">
                  <Label htmlFor="filterCustomer">Filtrar por Cliente</Label>
                  <Input
                    id="filterCustomer"
                    placeholder="Digite o nome do cliente"
                    value={filterCustomer}
                    onChange={(e) => setFilterCustomer(e.target.value)}
                  />
                </div>
              </div>

              <Button onClick={exportToExcel} className="w-full mb-4">
                <Download className="mr-2 h-4 w-4" />
                Exportar para Excel
              </Button>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Qtd</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Saída</TableHead>
                      <TableHead>Entrega</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow 
                        key={order.id} 
                        className={cn(
                          isOverdue(order.deliveryDate) && order.status !== "entregue" && 
                          "bg-red-50 hover:bg-red-100"
                        )}
                      >
                        <TableCell className="font-medium">{order.itemName}</TableCell>
                        <TableCell>{order.quantity}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>{format(order.orderDate, "dd/MM/yyyy", { locale: ptBR })}</TableCell>
                        <TableCell className={cn(
                          isOverdue(order.deliveryDate) && order.status !== "entregue" && 
                          "text-red-600 font-semibold"
                        )}>
                          {format(order.deliveryDate, "dd/MM/yyyy", { locale: ptBR })}
                        </TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;