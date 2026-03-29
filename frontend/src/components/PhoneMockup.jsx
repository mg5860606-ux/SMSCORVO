import React from 'react';
import { mockMessages } from '../mock/data';
import { Search, ChevronLeft, SquarePen } from 'lucide-react';

const PhoneMockup = () => {
  return (
    <div className="relative">
      {/* Phone frame */}
      <div className="w-[280px] h-[560px] bg-black rounded-[40px] p-3 shadow-2xl">
        {/* Screen */}
        <div className="w-full h-full bg-white rounded-[32px] overflow-hidden">
          {/* Status bar */}
          <div className="flex justify-between items-center px-6 pt-3 pb-2">
            <span className="text-xs font-semibold">9:41</span>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-3 bg-gray-800 rounded-sm"></div>
              <div className="w-4 h-3 bg-gray-800 rounded-sm"></div>
              <div className="w-5 h-3 bg-gray-800 rounded-sm"></div>
            </div>
          </div>

          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl"></div>

          {/* Header */}
          <div className="px-4 pt-4 pb-3 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <ChevronLeft size={20} className="text-indigo-600" />
                <span className="text-indigo-600 text-sm font-medium">Filtros</span>
              </div>
              <SquarePen size={20} className="text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold mb-3">Mensagens</h1>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar"
                className="w-full bg-gray-100 rounded-lg py-2 pl-10 pr-4 text-sm"
              />
            </div>
          </div>

          {/* Messages list */}
          <div className="overflow-y-auto h-[400px]">
            {mockMessages.map((msg, index) => (
              <div
                key={msg.id}
                className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                    style={{ backgroundColor: msg.color }}
                  >
                    {msg.icon}
                  </div>
                  {/* Message content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-semibold text-sm">{msg.service}</h3>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                    </div>
                    <p className="text-xs text-gray-600 truncate">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
