import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showWaybill, setShowWaybill] = useState(false);

  const drivers = [
    { 
      id: 1, 
      name: "Алексей Иванов", 
      vehicle: "КамАЗ Миксер", 
      status: "delivering", 
      distance: "1,245 км", 
      hours: "8.5 ч", 
      concrete: "15 м³", 
      currentOrder: {
        address: "ул. Строительная, 45",
        startTime: "14:30",
        estimatedReturn: "16:45",
        route: { distance: "12.3 км", duration: "45 мин" },
        unloadTime: "30 мин",
        washTime: "15 мин"
      },
      location: { lat: 55.7558, lng: 37.6176 }
    },
    { 
      id: 2, 
      name: "Сергей Петров", 
      vehicle: "КамАЗ Бетононасос", 
      status: "returning", 
      distance: "987 км", 
      hours: "7.2 ч", 
      concrete: "25 м³", 
      currentOrder: {
        address: "Промзона, участок 12",
        startTime: "13:00",
        estimatedReturn: "15:30",
        route: { distance: "8.7 км", duration: "25 мин" },
        unloadTime: "45 мин",
        washTime: "15 мин"
      },
      location: { lat: 55.7658, lng: 37.6276 }
    },
    { 
      id: 3, 
      name: "Михаил Сидоров", 
      vehicle: "КамАЗ Миксер", 
      status: "available", 
      distance: "1,456 км", 
      hours: "9.1 ч", 
      concrete: "140 м³",
      location: { lat: 55.7458, lng: 37.6076 }
    },
    { 
      id: 4, 
      name: "Владимир Козлов", 
      vehicle: "КамАЗ Миксер", 
      status: "washing", 
      distance: "743 км", 
      hours: "6.8 ч", 
      concrete: "78 м³",
      estimatedAvailable: "15:45",
      location: { lat: 55.7358, lng: 37.5976 }
    },
    { 
      id: 5, 
      name: "Дмитрий Волков", 
      vehicle: "КамАЗ Бетононасос", 
      status: "loading", 
      distance: "1,123 км", 
      hours: "8.9 ч", 
      concrete: "18 м³",
      nextOrder: {
        address: "ЖК Солнечный, корпус 3",
        scheduledTime: "17:15"
      },
      location: { lat: 55.7258, lng: 37.5876 }
    }
  ];

  const orders = [
    { id: 1, address: "ул. Строительная, 45", concrete: "15 м³", time: "14:30", status: "active", driver: "Алексей Иванов", waybillId: "WB001" },
    { id: 2, address: "Промзона, участок 12", concrete: "25 м³", time: "16:00", status: "completed", driver: "Сергей Петров", waybillId: "WB002" },
    { id: 3, address: "ЖК Солнечный, корпус 3", concrete: "18 м³", time: "17:15", status: "pending", driver: "Дмитрий Волков", waybillId: "WB003" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "available": return "bg-green-600";
      case "delivering": return "bg-blue-600";
      case "returning": return "bg-orange-600";
      case "loading": return "bg-purple-600";
      case "washing": return "bg-cyan-600";
      default: return "bg-gray-600";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "available": return "Свободен";
      case "delivering": return "В пути";
      case "returning": return "Возвращается";
      case "loading": return "Загрузка";
      case "washing": return "Мойка";
      default: return "Неизвестно";
    }
  };

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

        {activeTab === "gps" && (
          <div className="space-y-6">
            {/* GPS Map View */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Map" className="mr-2" size={20} />
                  GPS Трекинг в реальном времени
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-gray-300 h-96 mb-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Icon name="MapPin" size={48} className="mx-auto text-blue-600 mb-4" />
                      <p className="text-lg font-medium text-gray-700">Интерактивная карта</p>
                      <p className="text-sm text-gray-500">GPS позиции всех миксеров в реальном времени</p>
                    </div>
                  </div>
                  
                  {/* Mock GPS Points */}
                  <div className="absolute top-16 left-20 w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
                  <div className="absolute top-32 right-24 w-4 h-4 bg-orange-600 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-20 left-32 w-4 h-4 bg-green-600 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-32 right-16 w-4 h-4 bg-purple-600 rounded-full animate-pulse"></div>
                  <div className="absolute top-20 right-1/2 w-4 h-4 bg-cyan-600 rounded-full animate-pulse"></div>
                  
                  {/* Base marker */}
                  <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
                    <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">БАЗА</div>
                  </div>
                </div>
                
                {/* Active Routes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {drivers.filter(d => d.currentOrder).map(driver => (
                    <Card key={driver.id} className="border-l-4 border-l-blue-600">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">{driver.name}</h4>
                          <Badge className={getStatusColor(driver.status)}>
                            {getStatusText(driver.status)}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Маршрут:</span>
                            <span className="font-medium">{driver.currentOrder.address}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Объем:</span>
                            <span className="font-medium">{driver.concrete}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Расстояние:</span>
                            <span className="font-medium">{driver.currentOrder.route.distance}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Время в пути:</span>
                            <span className="font-medium">{driver.currentOrder.route.duration}</span>
                          </div>
                          <Separator className="my-2" />
                          <div className="flex justify-between font-medium text-green-600">
                            <span>Возврат на базу:</span>
                            <span>{driver.currentOrder.estimatedReturn}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
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
                      <Badge className={getStatusColor(driver.status)}>
                        {getStatusText(driver.status)}
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
                          Бетон всего
                        </span>
                        <span className="font-medium">{driver.concrete}</span>
                      </div>
                      
                      {driver.currentOrder && (
                        <>
                          <Separator className="my-3" />
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <h5 className="font-medium text-sm mb-2 text-blue-800">Текущий заказ:</h5>
                            <p className="text-xs text-blue-700 mb-1">{driver.currentOrder.address}</p>
                            <div className="flex justify-between text-xs">
                              <span>Объем: {driver.concrete}</span>
                              <span className="font-medium text-green-600">↩ {driver.currentOrder.estimatedReturn}</span>
                            </div>
                          </div>
                        </>
                      )}
                      
                      {driver.estimatedAvailable && (
                        <div className="bg-cyan-50 p-2 rounded text-xs text-center">
                          <span className="text-cyan-700">Будет свободен: {driver.estimatedAvailable}</span>
                        </div>
                      )}
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-4"
                        onClick={() => setSelectedDriver(driver)}
                      >
                        <Icon name="MapPin" size={14} className="mr-2" />
                        Показать на карте
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "waybills" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="FileText" className="mr-2" size={20} />
                  Электронные накладные
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h4 className="font-medium">Накладная #{order.waybillId}</h4>
                            <p className="text-sm text-gray-600">{order.address}</p>
                          </div>
                          <Badge 
                            variant={order.status === "active" ? "default" : 
                                    order.status === "pending" ? "secondary" : "outline"}
                            className={order.status === "active" ? "bg-blue-600" : 
                                      order.status === "completed" ? "bg-green-600" : ""}
                          >
                            {order.status === "active" ? "В работе" : 
                             order.status === "pending" ? "Ожидает" : "Выполнен"}
                          </Badge>
                        </div>
                        <div className="mt-2 grid grid-cols-3 gap-4 text-sm text-gray-600">
                          <span>Объем: {order.concrete}</span>
                          <span>Водитель: {order.driver}</span>
                          <span>Время: {order.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Icon name="Eye" size={14} className="mr-1" />
                              Просмотр
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Накладная #{order.waybillId}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-2">Информация о заказе</h4>
                                  <div className="space-y-1 text-sm">
                                    <p><strong>Адрес:</strong> {order.address}</p>
                                    <p><strong>Объем:</strong> {order.concrete}</p>
                                    <p><strong>Время:</strong> {order.time}</p>
                                    <p><strong>Водитель:</strong> {order.driver}</p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Данные о доставке</h4>
                                  <div className="space-y-1 text-sm">
                                    <p><strong>Выехал с базы:</strong> {order.time}</p>
                                    <p><strong>Время разгрузки:</strong> 30 мин</p>
                                    <p><strong>Время мойки:</strong> 15 мин</p>
                                    <p><strong>Километраж:</strong> 24.6 км</p>
                                  </div>
                                </div>
                              </div>
                              
                              {order.status === "completed" && (
                                <div className="border-t pt-4">
                                  <h4 className="font-medium mb-2">Подписи</h4>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                      <p className="text-sm text-gray-600 mb-2">Подпись водителя</p>
                                      <div className="h-16 bg-white border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                                        <span className="text-gray-400 text-xs">✓ Подписано</span>
                                      </div>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                      <p className="text-sm text-gray-600 mb-2">Подпись получателя</p>
                                      <div className="h-16 bg-white border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                                        <span className="text-gray-400 text-xs">✓ Подписано</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        {order.status === "completed" && (
                          <Button variant="outline" size="sm">
                            <Icon name="Download" size={14} className="mr-1" />
                            PDF
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
                        <p className="text-sm text-gray-600">Объем: {order.concrete} • Время: {order.time} • Водитель: {order.driver}</p>
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
                          Трек
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="FileText" size={14} className="mr-1" />
                          Накладная
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