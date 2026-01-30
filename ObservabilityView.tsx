
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, AlertTriangle, Cpu, Globe } from 'lucide-react';

const ObservabilityView: React.FC = () => {
  const data = useMemo(() => {
    const points = [];
    for (let i = 0; i < 24; i++) {
      points.push({
        time: `${i}:00`,
        requests: Math.floor(Math.random() * 200) + 100 + (i > 18 ? 300 : 0),
        latency: Math.floor(Math.random() * 50) + 30,
        errors: Math.random() > 0.8 ? Math.floor(Math.random() * 5) : 0,
      });
    }
    return points;
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Requests / seg</span>
            <Globe size={16} className="text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">1.2k</div>
          <div className="text-xs text-green-500 font-medium mt-1 flex items-center gap-1">
            ↑ 12% <span className="text-slate-400 font-normal">vs última hora</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">P95 Latency</span>
            <Activity size={16} className="text-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">42ms</div>
          <div className="text-xs text-green-500 font-medium mt-1">Normal</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">CPU Usage</span>
            <Cpu size={16} className="text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">64%</div>
          <div className="text-xs text-amber-500 font-medium mt-1">Scaling Active</div>
        </div>
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-red-400 uppercase">Erros (5xx)</span>
            <AlertTriangle size={16} className="text-red-500" />
          </div>
          <div className="text-2xl font-bold text-red-600">0.02%</div>
          <div className="text-xs text-red-500 font-medium mt-1">Abaixo do Threshold</div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 mb-6 flex items-center gap-2">
             Volume de Tráfego (Requests)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="requests" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRequests)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 mb-6 flex items-center gap-2">
             Latência Distribuída (ms)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="latency" stroke="#6366f1" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl">
        <h4 className="font-bold text-white mb-4">Tracing Distribuído (OpenTelemetry)</h4>
        <div className="space-y-4 font-mono text-xs">
          <div className="flex gap-4 border-l-2 border-blue-500 pl-4 py-1">
            <span className="text-blue-400">0ms</span>
            <span className="font-bold">gateway-ingress</span>
            <span className="text-slate-500">GET /v1/orders/123</span>
          </div>
          <div className="flex gap-4 border-l-2 border-indigo-500 ml-6 pl-4 py-1">
            <span className="text-indigo-400">12ms</span>
            <span className="font-bold">orders-service</span>
            <span className="text-slate-500">Service: createOrder</span>
          </div>
          <div className="flex gap-4 border-l-2 border-emerald-500 ml-12 pl-4 py-1">
            <span className="text-emerald-400">28ms</span>
            <span className="font-bold">db-postgres</span>
            <span className="text-slate-500">SQL: INSERT INTO orders ...</span>
          </div>
          <div className="flex gap-4 border-l-2 border-amber-500 ml-12 pl-4 py-1">
            <span className="text-amber-400">35ms</span>
            <span className="font-bold">message-broker</span>
            <span className="text-slate-500">Event: OrderCreated Published</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObservabilityView;
