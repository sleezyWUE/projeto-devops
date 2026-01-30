
import React from 'react';
import { Database, Globe, CreditCard, Package, Server, ArrowRight, Share2, Layers } from 'lucide-react';

const ArchitectureView: React.FC = () => {
  const services = [
    { id: 'gw', name: 'API Gateway', icon: Globe, color: 'bg-blue-500', desc: 'Entry point, Auth, Throttling' },
    { id: 'orders', name: 'Serviço Pedidos', icon: Share2, color: 'bg-indigo-500', desc: 'Core logic, Order State' },
    { id: 'payments', name: 'Serviço Pagamentos', icon: CreditCard, color: 'bg-emerald-500', desc: 'External integrations' },
    { id: 'stock', name: 'Serviço Estoque', icon: Package, color: 'bg-amber-500', desc: 'Inventory reservation' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="bg-slate-50 border-b border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Layers size={20} className="text-blue-600" /> Topologia do Ecossistema Pedidos Veloz
          </h3>
          <p className="text-sm text-slate-500">Fluxo de requisição e persistência distribuída</p>
        </div>
        
        <div className="p-12">
          {/* Architecture Diagram Visualization */}
          <div className="relative flex flex-col items-center gap-16">
            
            {/* Entry Point */}
            <div className="w-48 bg-white border-2 border-slate-300 rounded-xl p-4 shadow-sm text-center relative z-10">
              <div className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Public Internet</div>
              <div className="font-bold text-slate-700 flex items-center justify-center gap-2">
                <Globe size={16} /> Clientes Web/Mobile
              </div>
            </div>

            <ArrowRight size={24} className="rotate-90 text-slate-300" />

            {/* Gateway */}
            <div className="w-64 bg-blue-600 rounded-xl p-4 shadow-lg text-white text-center relative z-10">
              <div className="font-bold">API Gateway (Kong/Nginx)</div>
              <div className="text-xs opacity-80 mt-1">Load Balancing & Ingress</div>
            </div>

            <div className="w-full flex justify-center gap-12 max-w-4xl px-4">
              <div className="flex-1 flex flex-col items-center gap-4">
                 <div className="h-12 w-0.5 bg-slate-200 border-dashed border-l-2 border-slate-300" />
                 <div className="w-full bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-indigo-700 font-bold mb-1">
                      <Share2 size={16} /> Pedidos
                    </div>
                    <div className="text-[10px] text-indigo-500">Node.js Microservice</div>
                 </div>
              </div>

              <div className="flex-1 flex flex-col items-center gap-4">
                 <div className="h-12 w-0.5 bg-slate-200 border-dashed border-l-2 border-slate-300" />
                 <div className="w-full bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-emerald-700 font-bold mb-1">
                      <CreditCard size={16} /> Pagamentos
                    </div>
                    <div className="text-[10px] text-emerald-500">External Webhook Integration</div>
                 </div>
              </div>

              <div className="flex-1 flex flex-col items-center gap-4">
                 <div className="h-12 w-0.5 bg-slate-200 border-dashed border-l-2 border-slate-300" />
                 <div className="w-full bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-amber-700 font-bold mb-1">
                      <Package size={16} /> Estoque
                    </div>
                    <div className="text-[10px] text-amber-500">Event-driven Updates</div>
                 </div>
              </div>
            </div>

            {/* Persistence Layer */}
            <div className="w-full border-t-2 border-slate-100 mt-4 flex justify-around p-8">
               <div className="bg-slate-800 text-white p-4 rounded-xl flex items-center gap-3 w-48 shadow-lg">
                  <Database size={20} className="text-blue-400" />
                  <div>
                    <div className="text-xs font-bold">PostgreSQL</div>
                    <div className="text-[10px] opacity-60">RDS / Cloud Managed</div>
                  </div>
               </div>
               <div className="bg-slate-800 text-white p-4 rounded-xl flex items-center gap-3 w-48 shadow-lg">
                  <Server size={20} className="text-amber-400" />
                  <div>
                    <div className="text-xs font-bold">RabbitMQ/Kafka</div>
                    <div className="text-[10px] opacity-60">Event Bus (Async)</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
          <h4 className="font-bold text-blue-800 mb-2">Justificativa de Mensageria</h4>
          <p className="text-sm text-blue-700 leading-relaxed">
            Utilizamos RabbitMQ para desacoplar o Serviço de Pedidos do Pagamento e Estoque. 
            Isso garante que um pico de tráfego não derrube todo o sistema se o gateway de pagamento demorar a responder.
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
          <h4 className="font-bold text-slate-800 mb-2">Case de Referência</h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            Baseado no <a href="https://github.com/microservices-demo/microservices-demo" target="_blank" className="underline font-bold text-blue-600">Socks Shop Microservices</a>, 
            referência do CNCF para arquiteturas Cloud Native resilientes e observáveis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureView;
