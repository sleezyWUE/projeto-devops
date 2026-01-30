
export enum NavSection {
  Overview = 'overview',
  Architecture = 'architecture',
  LocalDev = 'local-dev',
  K8sProd = 'k8s-prod',
  CICD = 'cicd',
  Observability = 'observability',
  Terraform = 'terraform',
  Planning = 'planning'
}

export interface MetricPoint {
  time: string;
  requests: number;
  latency: number;
  errors: number;
}

export interface CodeSnippet {
  filename: string;
  language: string;
  content: string;
  description: string;
}
