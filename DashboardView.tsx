
import React from 'react';
import { AlertCircle, Zap, Target, Users, TrendingUp, Shield } from 'lucide-react';
import { NavSection } from '../types';

interface DashboardViewProps {
  onNavigate: (section: NavSection) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Section */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Central de Engenharia & Infraestrutura</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Painel consolidado de governança técnica para os sistemas da Loja Veloz. 
            Gerencie automação de infraestrutura, ciclos de release e monitoramento de saúde de serviços.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <button 
              onClick={() => onNavigate(NavSection.Planning)}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 flex items-center gap-2"
            >
              Cronograma de Implementação <TrendingUp size={18} />
            </button>
            <button 
              onClick={() => onNavigate(NavSection.Architecture)}
              className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition"
            >
              Visualizar Topologia
            </button>
          </div>
        </div>
      </section>

      {/* Problem & Goal Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
          <div className="flex items-center gap-3 text-slate-700 font-bold mb-4">
            <AlertCircle size={20} className="text-amber-500" /> STATUS DE LEGADO
          </div>
          <ul className="space-y-3 text-slate-600 text-sm">
            <li className="flex gap-2">• Riscos identificados em deploys manuais</li>
            <li className="flex gap-2">• Gargalos de escalabilidade em eventos sazonais</li>
            <li className="flex gap-2">• Necessidade de paridade entre ambientes Dev/Prod</li>
            <li className="flex gap-2">• Monitoramento reativo em vez de proativo</li>
          </ul>
        </div>
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
          <div className="flex items-center gap-3 text-blue-700 font-bold mb-4">
            <Target size={20} /> PADRÃO DE PLATAFORMA
          </div>
          <ul className="space-y-3 text-blue-800 text-sm">
            <li className="flex gap-2">• Orquestração nativa via Kubernetes (EKS/GKE)</li>
            <li className="flex gap-2">• CI/CD com aprovação baseada em métricas</li>
            <li className="flex gap-2">• Telemetria total com tracing distribuído</li>
            <li className="flex gap-2">• Infraestrutura declarativa e versionada</li>
          </ul>
        </div>
      </div>

      {/* Core Principles */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: Zap, title: "Velocidade", desc: "Entrega contínua para reduzir o time-to-market de novas features." },
          { icon: Shield, title: "Confiabilidade", desc: "Resiliência garantida por auto-healing e balanceamento inteligente." },
          { icon: Users, title: "Colaboração", desc: "Fomentar a cultura de responsabilidade compartilhada sobre o código." }
        ].map((item, idx) => (
          <div key={idx} className="bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-md transition">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-700 mb-4">
              <item.icon size={20} />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardView;
