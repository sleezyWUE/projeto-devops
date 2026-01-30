
import React from 'react';
import { CodeSnippet } from './types';

export const DOCKER_SNIPPETS: CodeSnippet[] = [
  {
    filename: 'Dockerfile',
    language: 'dockerfile',
    description: 'Multi-stage build padronizado para imagens enxutas e seguras (Node.js example).',
    content: `
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production (Distroless-like approach)
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER appuser
EXPOSE 3000
CMD ["node", "dist/main.js"]
    `.trim()
  },
  {
    filename: 'docker-compose.yml',
    language: 'yaml',
    description: 'Ambiente local completo com dependências (DB e Redis).',
    content: `
version: '3.8'
services:
  gateway:
    build: ./api-gateway
    ports: ["8080:8080"]
    depends_on: [orders]
  
  orders:
    build: ./orders-service
    environment:
      - DB_URL=postgres://user:pass@db:5432/orders
    depends_on: [db, message-broker]

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: orders
      POSTGRES_PASSWORD: pass
    `.trim()
  }
];

export const K8S_SNIPPETS: CodeSnippet[] = [
  {
    filename: 'deployment.yaml',
    language: 'yaml',
    description: 'Deployment com estratégias de Rolling Update e Probes de Saúde.',
    content: `
apiVersion: apps/v1
kind: Deployment
metadata:
  name: orders-service
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: orders
  template:
    metadata:
      labels:
        app: orders
    spec:
      containers:
      - name: orders
        image: loja-veloz/orders:v1.2.0
        ports:
        - containerPort: 3000
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 500m
            memory: 512Mi
        readinessProbe:
          httpGet:
            path: /health/ready
            port: 3000
        livenessProbe:
          httpGet:
            path: /health/live
            port: 3000
    `.trim()
  },
  {
    filename: 'hpa.yaml',
    language: 'yaml',
    description: 'Auto-scaling baseado em utilização de CPU e Memória.',
    content: `
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: orders-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: orders-service
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
    `.trim()
  }
];

export const TERRAFORM_SNIPPET: CodeSnippet = {
  filename: 'main.tf',
  language: 'hcl',
  description: 'Estrutura base (esqueleto) para provisionamento de cluster Kubernetes.',
  content: `
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  name   = "loja-veloz-vpc"
  cidr   = "10.0.0.0/16"
  # ... subnets and routing
}

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  cluster_name    = "pedidos-veloz-prod"
  cluster_version = "1.28"
  vpc_id          = module.vpc.vpc_id
  subnet_ids      = module.vpc.private_subnets

  eks_managed_node_groups = {
    standard = {
      min_size     = 2
      max_size     = 10
      desired_size = 3
      instance_types = ["t3.medium"]
    }
  }
}
  `.trim()
};
