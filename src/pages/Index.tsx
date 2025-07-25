import { useState, useEffect } from "react";
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
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showWaybill, setShowWaybill] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [fuelConsumption, setFuelConsumption] = useState({});

  // Симуляция уведомлений
  useEffect(() => {
    const interval = setInterval(() => {
      const events = [
        { type: 'arrival', driver: 'Алексей Иванов', location: 'ул. Строительная, 45' },
        { type: 'departure', driver: 'Сергей Петров', location: 'Промзона, участок 12' },
        { type: 'loading', driver: 'Михаил Сидоров', location: 'База' }
      ];
      
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      
      if (Math.random() > 0.7) { // 30% вероятность уведомления
        const notification = {
          id: Date.now(),
          ...randomEvent,
          time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
        };
        
        setNotifications(prev => [notification, ...prev.slice(0, 4)]);
        
        const messages = {
          arrival: `🚛 ${randomEvent.driver} прибыл на объект "${randomEvent.location}"`,
          departure: `🚀 ${randomEvent.driver} выехал с объекта "${randomEvent.location}"`,
          loading: `⚡ ${randomEvent.driver} начал загрузку на базе`
        };
        
        toast({
          title: "GPS Уведомление",
          description: messages[randomEvent.type],
          duration: 4000,
        });
      }
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  // Расчет расхода топлива
  const calculateFuelConsumption = (distance, vehicleType) => {
    const fuelRates = {
      'КамАЗ Миксер': 25, // л/100км
      'КамАЗ Бетононасос': 28,
      'КамАЗ Миксер (загруженный)': 32
    };
    
    const rate = fuelRates[vehicleType] || 25;
    const distanceNum = parseFloat(distance.replace(/[^0-9.]/g, ''));
    return ((distanceNum * rate) / 100).toFixed(1);
  };

  const drivers = [
    { 
      id: 1, 
      name: "Алексей Иванов", 
      vehicle: "КамАЗ Миксер", 
      status: "delivering", 
      distance: "1,245 км", 
      hours: "8.5 ч", 
      concrete: "15 м³",
      fuelConsumption: "48.5 л",
      fuelCost: "2,425 ₽",
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
      fuelConsumption: "72.3 л",
      fuelCost: "3,615 ₽",
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
      fuelConsumption: "56.2 л",
      fuelCost: "2,810 ₽",
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
      fuelConsumption: "28.7 л",
      fuelCost: "1,435 ₽",
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
      fuelConsumption: "65.1 л",
      fuelCost: "3,255 ₽",
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
              <h1 className="text-2xl font-bold text-gray-900">Промышленные Технологии</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button variant="outline" size="sm">
                  <Icon name="Bell" size={16} className="mr-2" />
                  Уведомления
                  {notifications.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 px-1 min-w-[1.2rem] h-5 bg-red-500 text-white text-xs">
                      {notifications.length}
                    </Badge>
                  )}
                </Button>
              </div>
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
          <Button 
            variant={activeTab === "fuel" ? "default" : "ghost"}
            onClick={() => setActiveTab("fuel")}
            className="text-sm"
          >
            <Icon name="Fuel" size={16} className="mr-2" />
            Топливо
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
                      <p className="text-sm font-medium text-gray-600">Расход топлива</p>
                      <p className="text-3xl font-bold text-orange-600">271л</p>
                    </div>
                    <Icon name="Fuel" className="text-orange-600" size={24} />
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

            {/* Notifications Panel */}
            {notifications.length > 0 && (
              <Card className="border-l-4 border-l-blue-600 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-800">
                    <Icon name="Bell" className="mr-2" size={20} />
                    Последние уведомления
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {notifications.slice(0, 3).map(notification => (
                      <div key={notification.id} className="flex items-center justify-between p-2 bg-white rounded">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${
                            notification.type === 'arrival' ? 'bg-green-500' : 
                            notification.type === 'departure' ? 'bg-orange-500' : 'bg-blue-500'
                          }`}></div>
                          <span className="text-sm">{notification.driver} - {notification.location}</span>
                        </div>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

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

        {activeTab === "fuel" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Мониторинг топлива</h2>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Icon name="Download" size={16} className="mr-2" />
                  Экспорт
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Заправка
                </Button>
              </div>
            </div>

            {/* Fuel Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Расход сегодня</p>
                      <p className="text-3xl font-bold text-red-600">271л</p>
                      <p className="text-sm text-gray-500">₽13,540</p>
                    </div>
                    <Icon name="TrendingUp" className="text-red-600" size={24} />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Средний расход</p>
                      <p className="text-3xl font-bold text-blue-600">26.8л</p>
                      <p className="text-sm text-gray-500">на 100км</p>
                    </div>
                    <Icon name="Gauge" className="text-blue-600" size={24} />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Экономия</p>
                      <p className="text-3xl font-bold text-green-600">-8%</p>
                      <p className="text-sm text-gray-500">vs прошлый месяц</p>
                    </div>
                    <Icon name="TrendingDown" className="text-green-600" size={24} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Drivers Fuel Table */}
            <Card>
              <CardHeader>
                <CardTitle>Расход топлива по водителям</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {drivers.map(driver => (
                    <div key={driver.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{driver.name}</h4>
                          <p className="text-sm text-gray-600">{driver.vehicle}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-6 text-right">
                        <div>
                          <p className="text-sm text-gray-600">Пробег</p>
                          <p className="font-medium">{driver.distance}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Топливо</p>
                          <p className="font-medium text-orange-600">{driver.fuelConsumption}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Стоимость</p>
                          <p className="font-medium text-red-600">{driver.fuelCost}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Расход</p>
                          <p className="font-medium">{((parseFloat(driver.fuelConsumption) / parseFloat(driver.distance.replace(/[^0-9.]/g, ''))) * 100).toFixed(1)}л/100км</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Fuel Cards */}
            <Card>
              <CardHeader>
                <CardTitle>Топливные карты</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-sm opacity-90">Лукойл</p>
                        <p className="text-lg font-bold">**** 3456</p>
                      </div>
                      <Icon name="CreditCard" size={24} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm opacity-90">Баланс: 45,230 ₽</p>
                      <p className="text-xs opacity-75">Лимит: 100,000 ₽</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-sm opacity-90">Роснефть</p>
                        <p className="text-lg font-bold">**** 7890</p>
                      </div>
                      <Icon name="CreditCard" size={24} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm opacity-90">Баланс: 67,850 ₽</p>
                      <p className="text-xs opacity-75">Лимит: 150,000 ₽</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-sm opacity-90">Газпром</p>
                        <p className="text-lg font-bold">**** 1234</p>
                      </div>
                      <Icon name="CreditCard" size={24} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm opacity-90">Баланс: 28,640 ₽</p>
                      <p className="text-xs opacity-75">Лимит: 80,000 ₽</p>
                    </div>
                  </div>
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
                          Бетон
                        </span>
                        <span className="font-medium">{driver.concrete}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          <Icon name="Fuel" size={14} className="mr-1 text-red-600" />
                          Топливо
                        </span>
                        <span className="font-medium">{driver.fuelConsumption}</span>
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