import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const drivers = [
    { id: 1, name: "Алексей Иванов", vehicle: "КамАЗ Миксер", status: "available", distance: "1,245 км", hours: "8.5 ч", concrete: "120 м³" },
    { id: 2, name: "Сергей Петров", vehicle: "КамАЗ Бетононасос", status: "busy", distance: "987 км", hours: "7.2 ч", concrete: "95 м³" },
    { id: 3, name: "Михаил Сидоров", vehicle: "КамАЗ Миксер", status: "available", distance: "1,456 км", hours: "9.1 ч", concrete: "140 м³" },
    { id: 4, name: "Владимир Козлов", vehicle: "КамАЗ Миксер", status: "offline", distance: "743 км", hours: "6.8 ч", concrete: "78 м³" },
    { id: 5, name: "Дмитрий Волков", vehicle: "КамАЗ Бетононасос", status: "busy", distance: "1,123 км", hours: "8.9 ч", concrete: "105 м³" }
  ];

  const orders = [
    { id: 1, address: "ул. Строительная, 45", concrete: "15 м³", time: "14:30", status: "active" },
    { id: 2, address: "Промзона, участок 12", concrete: "25 м³", time: "16:00", status: "pending" },
    { id: 3, address: "ЖК Солнечный, корпус 3", concrete: "18 м³", time: "17:15", status: "completed" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Icon name="Truck" className="text-blue-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-900">БетонТакси</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="Bell" size={16} className="mr-2" />
                Уведомления
              </Button>
              <Avatar>
                <AvatarFallback>ОП</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          <Button 
            variant={activeTab === "dashboard" ? "default" : "ghost"}
            onClick={() => setActiveTab("dashboard")}
            className="text-sm"
          >
            <Icon name="BarChart3" size={16} className="mr-2" />
            Дашборд
          </Button>
          <Button 
            variant={activeTab === "orders" ? "default" : "ghost"}
            onClick={() => setActiveTab("orders")}
            className="text-sm"
          >
            <Icon name="ClipboardList" size={16} className="mr-2" />
            Заказы
          </Button>
          <Button 
            variant={activeTab === "drivers" ? "default" : "ghost"}
            onClick={() => setActiveTab("drivers")}
            className="text-sm"
          >
            <Icon name="Users" size={16} className="mr-2" />
            Водители
          </Button>
        </div>

        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Активные заказы</p>
                      <p className="text-3xl font-bold text-blue-600">8</p>
                    </div>
                    <Icon name="ClipboardCheck" className="text-blue-600" size={24} />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Водители онлайн</p>
                      <p className="text-3xl font-bold text-green-600">4/5</p>
                    </div>
                    <Icon name="UserCheck" className="text-green-600" size={24} />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Бетона сегодня</p>
                      <p className="text-3xl font-bold text-orange-600">120м³</p>
                    </div>
                    <Icon name="BarChart" className="text-orange-600" size={24} />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Общий пробег</p>
                      <p className="text-3xl font-bold text-purple-600">1,245км</p>
                    </div>
                    <Icon name="Route" className="text-purple-600" size={24} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Order Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Plus" className="mr-2" size={20} />
                    Новый заказ
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Адрес доставки" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Объем (м³)" type="number" />
                    <Input placeholder="Время" type="time" />
                  </div>
                  <Textarea placeholder="Комментарий" rows={3} />
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Icon name="Send" size={16} className="mr-2" />
                    Отправить SMS водителям
                  </Button>
                </CardContent>
              </Card>

              {/* Vehicle Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Автопарк</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <img 
                      src="/img/d72578bd-9889-48af-97d0-be20d6459227.jpg" 
                      alt="КамАЗ Бетономешалка" 
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <p className="text-sm text-gray-600">КамАЗ - основа нашего автопарка</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "drivers" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {drivers.map(driver => (
                <Card key={driver.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{driver.name}</CardTitle>
                      <Badge 
                        variant={driver.status === "available" ? "default" : 
                                driver.status === "busy" ? "destructive" : "secondary"}
                        className={driver.status === "available" ? "bg-green-600" : ""}
                      >
                        {driver.status === "available" ? "Свободен" : 
                         driver.status === "busy" ? "Занят" : "Оффлайн"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{driver.vehicle}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          <Icon name="MapPin" size={14} className="mr-1 text-blue-600" />
                          Пробег
                        </span>
                        <span className="font-medium">{driver.distance}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          <Icon name="Clock" size={14} className="mr-1 text-orange-600" />
                          Часы
                        </span>
                        <span className="font-medium">{driver.hours}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          <Icon name="Package" size={14} className="mr-1 text-green-600" />
                          Бетон
                        </span>
                        <span className="font-medium">{driver.concrete}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-4"
                        disabled={driver.status === "offline"}
                      >
                        <Icon name="MessageSquare" size={14} className="mr-2" />
                        Отправить SMS
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Активные заказы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <h4 className="font-medium">{order.address}</h4>
                        <p className="text-sm text-gray-600">Объем: {order.concrete} • Время: {order.time}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={order.status === "active" ? "default" : 
                                  order.status === "pending" ? "secondary" : "outline"}
                          className={order.status === "active" ? "bg-blue-600" : 
                                    order.status === "completed" ? "bg-green-600" : ""}
                        >
                          {order.status === "active" ? "В работе" : 
                           order.status === "pending" ? "Ожидает" : "Выполнен"}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Icon name="MapPin" size={14} className="mr-1" />
                          Карта
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;