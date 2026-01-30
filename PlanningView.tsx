
import React from 'react';
import { Calendar, CheckCircle2, Circle, Clock } from 'lucide-react';

const PlanningView: React.FC = () => {
  const weeks = [
    {
      title: 'Semana 1: Padronização & Local Dev',
      tasks: [
        'Criar Dockerfiles multi-stage para todos os serviços',
        'Configurar Docker Compose para desenvolvimento local unificado',
        'Implementar Health Checks básicos nos serviços',
        'Definir padrões de Logs em JSON (Twelve-Factor App)'
      ],
      status: 'complete'
    },
    {
      title: 'Semana 2: Infraestrutura & K8s Foundation',
      tasks: [
        'Provisionamento de cluster EKS/GKE via Terraform',
        'Configuração de Ingress Controllers (Nginx/Kong)',
        'Setup de ConfigMaps e Secrets para variáveis de ambiente',
        'Implementação de Namespaces para isolamento de ambientes (staging/prod)'
      ],
      status: 'complete'
    },
    {
      title: 'Semana 3: CI/CD & Automação de Deploy',
      tasks: [
        'Configurar GitHub Actions para Build e Push automático',
        'Implementar estratégia de Rolling Update no Kubernetes',
        'Configurar Horizontal Pod Autoscaler (HPA) baseado em CPU',
        'Setup inicial de Prometheus e Grafana'
      ],
      status: 'current'
    },
    {
      title: 'Semana 4: Observabilidade & Stress Test',
      tasks: [
        'Implementar OpenTelemetry para tracing distribuído',
        'Realizar Load Tests simulando o pico da campanha promocional',
        'Configurar Alertas de Latência e Erro (Alertmanager)',
        'Entrega do MVP e Monitoramento Real-time'
      ],
      status: 'upcoming'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {weeks.map((week, idx) => (
          <div 
            key={idx} 
            className={`p-6 rounded-2xl border transition-all ${
              week.status === 'complete' ? 'bg-green-50 border-green-200' :
              week.status === 'current' ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-100 shadow-lg' :
              'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                week.status === 'complete' ? 'bg-green-200 text-green-700' :
                week.status === 'current' ? 'bg-blue-200 text-blue-700' :
                'bg-slate-100 text-slate-500'
              }`}>
                {week.status === 'complete' ? 'Finalizado' : week.status === 'current' ? 'Em Progresso' : 'Agendado'}
              </span>
              {week.status === 'complete' ? <CheckCircle2 size={18} className="text-green-600" /> : 
               week.status === 'current' ? <Clock size={18} className="text-blue-600 animate-pulse" /> : 
               <Circle size={18} className="text-slate-300" />}
            </div>
            <h3 className="font-bold text-slate-800 text-sm mb-4">{week.title}</h3>
            <ul className="space-y-3">
              {week.tasks.map((task, tidx) => (
                <li key={tidx} className="flex gap-2 text-xs text-slate-600 leading-relaxed">
                  <span className="text-slate-400">•</span> {task}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
           Preparação para Campanha (Pico de Acesso)
        </h3>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          Para garantir o sucesso da campanha promocional da Semana 4, o foco está na elasticidade. 
          Configuraremos o Kubernetes para escalar de 3 réplicas nominais para até 15 réplicas dinâmicas em menos de 60 segundos 
          caso a utilização de CPU ultrapasse 70%.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-slate-50 rounded-xl">
            <div className="text-2xl font-bold text-slate-900">99.9%</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold">Meta Disponibilidade</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl">
            <div className="text-2xl font-bold text-slate-900">&lt; 100ms</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold">Meta Latência P95</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl">
            <div className="text-2xl font-bold text-slate-900">Zero</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold">Manual Deploys</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl">
            <div className="text-2xl font-bold text-slate-900">Auto</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold">Scaling Capability</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanningView;
