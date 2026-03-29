import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Mock login - armazenar no localStorage
    setTimeout(() => {
      const userName = formData.email.split('@')[0]; // Pega parte antes do @
      localStorage.setItem('user', JSON.stringify({ 
        email: formData.email, 
        name: userName.charAt(0).toUpperCase() + userName.slice(1) // Capitaliza primeira letra
      }));
      toast({ title: 'Login realizado com sucesso!' });
      navigate('/dashboard');
    }, 1000);
  };

  const handleGoogleLogin = () => {
    // Mock Google login - simula nome vindo do Google
    toast({ title: 'Login com Google realizado!' });
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({ 
        email: 'usuario@gmail.com', 
        name: 'João Silva', // Nome simulado do Google
        picture: 'https://ui-avatars.com/api/?name=Joao+Silva&background=6366F1&color=fff'
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
          <p className="text-gray-600 mt-2">Faça login em sua conta</p>
        </div>

        <Card className="p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Senha</Label>
                <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-700">
                  Esqueceu a senha?
                </Link>
              </div>
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
                />
              </div>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Ou continue com</span>
            </div>
          </div>

          {/* Google login */}
          <Button
            type="button"
            variant="outline"
            className="w-full border-gray-300 hover:bg-gray-50 transition-all duration-300"
            onClick={handleGoogleLogin}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Login com Google
          </Button>

          {/* Sign up link */}
          <p className="text-center mt-6 text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-semibold">
              Cadastre-se
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Login;
