
import React, { useState } from 'react';
import { FileCode, Copy, Check } from 'lucide-react';
import { DOCKER_SNIPPETS, K8S_SNIPPETS, TERRAFORM_SNIPPET } from '../constants';

interface CodeViewProps {
  type: 'docker' | 'k8s' | 'terraform' | 'cicd';
}

const CodeView: React.FC<CodeViewProps> = ({ type }) => {
  const [copied, setCopied] = useState(false);

  const getSnippets = () => {
    switch(type) {
      case 'docker': return DOCKER_SNIPPETS;
      case 'k8s': return K8S_SNIPPETS;
      case 'terraform': return [TERRAFORM_SNIPPET];
      case 'cicd': return [{
        filename: '.github/workflows/deploy.yml',
        language: 'yaml',
        description: 'Pipeline de Deploy Automatizado com Blue/Green no Kubernetes.',
        content: `
name: Deployment CI/CD
on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build and Push Docker
        run: |
          docker build -t loja-veloz/orders:\${{ github.sha }} .
          docker push loja-veloz/orders:\${{ github.sha }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Kubernetes Set Context
        uses: azure/k8s-set-context@v1
        with:
          method: service-account
          k8s-url: \${{ secrets.K8S_URL }}
          k8s-secret: \${{ secrets.K8S_SECRET }}

      - name: Deploy to K8s
        run: |
          kubectl set image deployment/orders-service orders=loja-veloz/orders:\${{ github.sha }}
          kubectl rollout status deployment/orders-service
        `.trim()
      }];
      default: return [];
    }
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      {getSnippets().map((snippet, idx) => (
        <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <FileCode size={18} className="text-blue-400" />
              <span className="text-sm font-mono text-slate-300">{snippet.filename}</span>
            </div>
            <button 
              onClick={() => handleCopy(snippet.content)}
              className="text-slate-400 hover:text-white transition flex items-center gap-2 text-xs font-medium"
            >
              {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
          <div className="p-6 border-b border-slate-100">
            <p className="text-sm text-slate-600 font-medium">{snippet.description}</p>
          </div>
          <pre className="p-6 bg-slate-50 text-xs font-mono text-slate-800 overflow-x-auto leading-relaxed">
            {snippet.content}
          </pre>
        </div>
      ))}
    </div>
  );
};

export default CodeView;
