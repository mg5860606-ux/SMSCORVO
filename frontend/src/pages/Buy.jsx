import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { services, countryPrices } from '../mock/data';
import { Search, ShoppingCart, ArrowLeft, Smartphone, Globe } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Buy = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('BR');

  const getServicePrice = (basePrice) => {
    const multiplier = countryPrices[selectedCountry]?.multiplier || 1.0;
    return (basePrice * multiplier).toFixed(2);
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    service.countries.includes(selectedCountry)
  );

  const handlePurchase = (service) => {
    // Mock purchase
    toast({
      title: 'Número adquirido!',
      description: `Número virtual para ${service.name} adquirido com sucesso.`
    });
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="text-gray-600"
              >
                <ArrowLeft size={20} className="mr-2" />
                Voltar
              </Button>
            </div>
            <div className="text-2xl font-bold">
              <span className="text-gray-900">SMS</span>
              <span className="text-indigo-600">CORVO</span>
            </div>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Comprar número virtual
          </h1>
          <p className="text-gray-600">
            Escolha o serviço para o qual você deseja receber SMS
          </p>
        </div>

        {/* Search and Country Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar serviço..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="w-full md:w-64">
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Globe size={16} />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {Object.entries(countryPrices).map(([code, data]) => (
                  <SelectItem key={code} value={code}>
                    <span className="flex items-center gap-2">
                      <span>{data.flag}</span>
                      <span>{data.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Services grid */}
        {filteredServices.length === 0 ? (
          <Card className="p-12 text-center">
            <Smartphone size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum serviço encontrado
            </h3>
            <p className="text-gray-600">
              Tente buscar por outro termo
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredServices.map((service) => (
              <Card
                key={service.id}
                className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedService(service)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: service.color }}
                  >
                    {service.icon}
                  </div>
                  <Badge className="bg-indigo-100 text-indigo-800">
                    R$ {getServicePrice(service.price)}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Número temporário para verificação
                </p>
                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePurchase(service);
                  }}
                >
                  <ShoppingCart size={16} className="mr-2" />
                  Comprar
                </Button>
              </Card>
            ))}
          </div>
        )}

        {/* Info banner */}
        <Card className="mt-8 p-6 bg-indigo-50 border-indigo-200">
          <h3 className="font-semibold text-gray-900 mb-2">
            Como funciona?
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start space-x-2">
              <span className="text-indigo-600 font-bold">1.</span>
              <span>Escolha o serviço para o qual deseja receber SMS</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-indigo-600 font-bold">2.</span>
              <span>Compre o número virtual usando seus créditos</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-indigo-600 font-bold">3.</span>
              <span>Use o número no serviço escolhido para receber o código SMS</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-indigo-600 font-bold">4.</span>
              <span>O código aparecerá automaticamente no seu painel</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Buy;
