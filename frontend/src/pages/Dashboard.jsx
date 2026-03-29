import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { mockUserData } from '../mock/data';
import { Wallet, History, Smartphone, LogOut, Plus, Clock, CheckCircle2, XCircle } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(mockUserData.balance);
  const [activeNumbers, setActiveNumbers] = useState(mockUserData.activeNumbers);
  const [transactions, setTransactions] = useState(mockUserData.transactions);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'waiting':
        return <Clock size={16} className="text-yellow-500" />;
      case 'received':
        return <CheckCircle2 size={16} className="text-green-500" />;
      case 'expired':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      waiting: 'bg-yellow-100 text-yellow-800',
      received: 'bg-green-100 text-green-800',
      expired: 'bg-red-100 text-red-800',
      completed: 'bg-green-100 text-green-800'
    };
    return variants[status] || 'bg-gray-100 text-gray-800';
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold">
                <span className="text-gray-900">SMS</span>
                <span className="text-indigo-600">CORVO</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-gray-600">Bem-vindo,</p>
                <p className="font-semibold text-gray-900">{user.name}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-gray-300"
              >
                <LogOut size={16} className="mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Balance Card */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-200 mb-1">Saldo disponível</p>
              <h2 className="text-4xl font-bold">R$ {balance.toFixed(2)}</h2>
            </div>
            <div className="flex space-x-3">
              <Button
                className="bg-white text-indigo-600 hover:bg-gray-100"
                onClick={() => navigate('/buy')}
              >
                <Plus size={16} className="mr-2" />
                Adicionar créditos
              </Button>
              <Button
                className="bg-indigo-500 hover:bg-indigo-400 text-white"
                onClick={() => navigate('/buy')}
              >
                <Smartphone size={16} className="mr-2" />
                Comprar número
              </Button>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="numbers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="numbers">
              <Smartphone size={16} className="mr-2" />
              Números ativos
            </TabsTrigger>
            <TabsTrigger value="history">
              <History size={16} className="mr-2" />
              Histórico
            </TabsTrigger>
          </TabsList>

          {/* Active Numbers */}
          <TabsContent value="numbers" className="space-y-4">
            {activeNumbers.length === 0 ? (
              <Card className="p-12 text-center">
                <Smartphone size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhum número ativo
                </h3>
                <p className="text-gray-600 mb-4">
                  Compre um número virtual para começar a receber códigos SMS
                </p>
                <Button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={() => navigate('/buy')}
                >
                  Comprar número
                </Button>
              </Card>
            ) : (
              <div className="grid gap-4">
                {activeNumbers.map((number) => (
                  <Card key={number.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {number.service}
                          </h3>
                          <Badge className={getStatusBadge(number.status)}>
                            {getStatusIcon(number.status)}
                            <span className="ml-1">
                              {number.status === 'waiting' ? 'Aguardando' : 'Recebido'}
                            </span>
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">
                          <span className="font-mono font-semibold">{number.number}</span>
                        </p>
                        {number.code ? (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-3">
                            <p className="text-sm text-green-800 mb-1">Código recebido:</p>
                            <p className="text-2xl font-bold text-green-900">{number.code}</p>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Clock size={14} />
                            <span>Expira em: {number.expiresIn}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Transaction History */}
          <TabsContent value="history" className="space-y-4">
            {transactions.length === 0 ? (
              <Card className="p-12 text-center">
                <History size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhuma transação
                </h3>
                <p className="text-gray-600">
                  Suas transações aparecerão aqui
                </p>
              </Card>
            ) : (
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Data
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tipo
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Descrição
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Valor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(transaction.date).toLocaleDateString('pt-BR')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline">
                              {transaction.type === 'deposit' ? 'Depósito' : 'Compra'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {transaction.service || `Depósito${transaction.bonus ? ` (+${transaction.bonus}% bônus)` : ''}`}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                            <span className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                              {transaction.amount > 0 ? '+' : ''}R$ {Math.abs(transaction.amount).toFixed(2)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getStatusBadge(transaction.status)}>
                              {transaction.status === 'completed' ? 'Concluído' : 'Pendente'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
