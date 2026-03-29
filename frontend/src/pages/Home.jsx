import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Badge } from '../components/ui/badge';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PhoneMockup from '../components/PhoneMockup';
import { pricingPlans, faqItems, stats } from '../mock/data';
import { Zap, Shield, Globe, Check, Sparkles, Flame } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="px-4 py-2 bg-white border border-gray-200">
                Processo rápido
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 bg-white border border-gray-200">
                Ativação rápida
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 bg-white border border-gray-200">
                Confiável
              </Badge>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Números virtuais para receber códigos de verificação SMS
            </h1>

            <p className="text-lg text-gray-600">
              Use números virtuais temporários para receber códigos de verificação em sites e aplicativos.
            </p>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap size={14} className="text-indigo-600" />
                </div>
                <span className="text-gray-700">Receba códigos de forma confiável</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield size={14} className="text-indigo-600" />
                </div>
                <span className="text-gray-700">Uso legítimo e em conformidade com as políticas</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe size={14} className="text-indigo-600" />
                </div>
                <span className="text-gray-700">Mais de 150 serviços compatíveis</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/register')}
              >
                Começar
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300"
                onClick={() => navigate('/buy')}
              >
                Ver serviços
              </Button>
            </div>

            <p className="text-sm text-gray-500">
              Uso permitido apenas para verificação legítima de suas próprias contas e em conformidade com os termos da plataforma.
            </p>
          </div>

          {/* Phone mockup */}
          <div className="flex justify-center">
            <PhoneMockup />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-16 md:py-24" id="pricing">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            SMS com número virtual <span className="text-indigo-600">rápido</span> e <span className="text-indigo-600">simples</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`p-6 relative transition-all duration-300 hover:shadow-xl ${
                plan.popular ? 'border-2 border-indigo-600 shadow-lg' : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-indigo-600 text-white px-4 py-1">
                    <Sparkles size={14} className="inline mr-1" />
                    MAIS POPULAR
                  </Badge>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm">{plan.subtitle}</p>
              </div>

              <div className="text-center mb-6">
                {plan.bonus > 0 && (
                  <Badge className="bg-emerald-500 text-white mb-3">
                    +{plan.bonus}% bônus
                  </Badge>
                )}
                <div className="flex items-baseline justify-center">
                  <span className="text-gray-600 text-lg mr-1">R$</span>
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                </div>
                {plan.bonusAmount && (
                  <p className="text-sm text-gray-600 mt-2">
                    você recebe R$ {plan.bonusAmount.toFixed(2)}
                  </p>
                )}
                {plan.id === 'basic' && (
                  <p className="text-sm text-gray-600 mt-2">depósito mínimo</p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Check size={18} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/register')}
              >
                Depositar agora
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16" id="faq">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Perguntas Frequentes</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={`item-${item.id}`}
                className="bg-white border border-gray-200 rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-3xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Quer usar nossos serviços?
          </h2>
          <p className="text-indigo-100 mb-8">
            Crie uma conta em nosso painel para começar a usar nossos serviços.
          </p>
          <Button
            size="lg"
            className="bg-white text-indigo-600 hover:bg-gray-100 px-8 transition-all duration-300 hover:scale-105"
            onClick={() => navigate('/register')}
          >
            Criar conta
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
