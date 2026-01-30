
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Network, 
  Container, 
  ShieldCheck, 
  LineChart, 
  GitBranch, 
  FileCode,
  Clock
} from 'lucide-react';
import { NavSection } from './types';
import DashboardView from './components/DashboardView';
import ArchitectureView from './components/ArchitectureView';
import CodeView from './components/CodeView';
import ObservabilityView from './components/ObservabilityView';
import PlanningView from './components/PlanningView';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<NavSection>(NavSection.Overview);

  const navItems = [
    { id: NavSection.Overview, label: 'Painel de Controle', icon: LayoutDashboard },
    { id: NavSection.Planning, label: 'Roadmap SRE', icon: Clock },
    { id: NavSection.Architecture, label: 'Topologia', icon: Network },
    { id: NavSection.LocalDev, label: 'Dev Environment', icon: Container },
    { id: NavSection.K8sProd, label: 'Cluster Kubernetes', icon: ShieldCheck },
    { id: NavSection.CICD, label: 'Pipelines CI/CD', icon: GitBranch },
    { id: NavSection.Terraform, label: 'Infraestrutura (IaC)', icon: FileCode },
    { id: NavSection.Observability, label: 'Telemetria', icon: LineChart },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
        <div className="p-6">
          <h1 className="text-xl font-bold flex items-center gap-2 text-white">
            <span className="bg-blue-600 p-1.5 rounded-lg">LV</span>
            Loja Veloz
          </h1>
          <p className="text-[10px] text-slate-500 mt-1 font-bold tracking-widest uppercase">Cloud & Platform Engineering</p>
        </div>
        
        <nav className="flex-1 mt-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                activeSection === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 bg-slate-800 m-4 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 text-xs text-green-400 font-bold mb-2 uppercase tracking-tight">
            <ShieldCheck size={14} /> Ambiente Estável
          </div>
          <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full w-[85%]" />
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-medium">Compliance: 100% (SRE Verified)</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-slate-800">
              {navItems.find(i => i.id === activeSection)?.label}
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100 uppercase tracking-tight">
              Acesso Autorizado
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <div title="Dev Team" className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700 cursor-help">DEV</div>
              <div title="Ops Team" className="w-8 h-8 rounded-full border-2 border-white bg-green-100 flex items-center justify-center text-[10px] font-bold text-green-700 cursor-help">OPS</div>
              <div title="SRE Team" className="w-8 h-8 rounded-full border-2 border-white bg-amber-100 flex items-center justify-center text-[10px] font-bold text-amber-700 cursor-help">SRE</div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {activeSection === NavSection.Overview && <DashboardView onNavigate={setActiveSection} />}
          {activeSection === NavSection.Planning && <PlanningView />}
          {activeSection === NavSection.Architecture && <ArchitectureView />}
          {activeSection === NavSection.LocalDev && <CodeView type="docker" />}
          {activeSection === NavSection.K8sProd && <CodeView type="k8s" />}
          {activeSection === NavSection.CICD && <CodeView type="cicd" />}
          {activeSection === NavSection.Terraform && <CodeView type="terraform" />}
          {activeSection === NavSection.Observability && <ObservabilityView />}
        </div>
      </main>
    </div>
  );
};

export default App;
