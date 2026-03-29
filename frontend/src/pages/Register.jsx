import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { Mail, Lock, User } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({ title: 'As senhas não coincidem', variant: 'destructive' });
      return;
    }

    if (!formData.acceptTerms) {
      toast({ title: 'Você deve aceitar os termos de uso', variant: 'destructive' });
      return;
    }

    setLoading(true);
    
    // Mock register
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({ email: formData.email, name: formData.name }));
      toast({ title: 'Conta criada com sucesso!' });
      navigate('/dashboard');
    }, 1000);
  };

  const handleGoogleRegister = () => {
    // Mock Google register - simula dados do Google
    toast({ title: 'Cadastro com Google realizado!' });
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({ 
        email: 'usuario@gmail.com', 
        name: 'Maria Santos',
        picture: 'https://ui-avatars.com/api/?name=Maria+Santos&background=6366F1&color=fff'
      }));
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="text-3xl font-bold">
              <span className="text-gray-900">SMS</span>
              <span className="text-indigo-600">CORVO</span>
            </div>
          </Link>
          <p className="text-gray-600 mt-2">Crie sua conta gratuitamente</p>
        </div>

        <Card className="p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked })}
              />
              <label htmlFor="acceptTerms" className="text-sm text-gray-600 leading-tight cursor-pointer">
                Eu aceito os{' '}
                <Link to="/terms" className="text-indigo-600 hover:text-indigo-700">
                  termos de uso
                </Link>{' '}
                e a{' '}
                <Link to="/privacy" className="text-indigo-600 hover:text-indigo-700">
                  política de privacidade
                </Link>
              </label>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300"
              disabled={loading}
            >
              {loading ? 'Criando conta...' : 'Criar conta'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Ou cadastre-se com</span>
            </div>
          </div>

          {/* Google register */}
          <Button
            type="button"
            variant="outline"
            className="w-full border-gray-300 hover:bg-gray-50 transition-all duration-300"
            onClick={handleGoogleRegister}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Cadastrar com Google
          </Button>

          {/* Login link */}
          <p className="text-center mt-6 text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">
              Faça login
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Register;
