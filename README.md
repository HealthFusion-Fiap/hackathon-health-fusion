# hackathon-health-fusion

**Desenho da arquitetura:**
![image](https://github.com/user-attachments/assets/d6aa35f8-2267-4ea0-9fdd-abc483b736f3)

Vídeo da apresentação: https://youtu.be/nMSY0whXTTU

**Especificações:**

Linguagem: NodeJS com Typescript

Estruturação do código: Arquitetura limpa

Arquitetura de monolito: foi escolhidado esse tipo de arquitetura por ser uma aplicação simples e MVP com uma semana para entregar

Notificação: serviço externo chamado MailJet (https://www.mailjet.com/products/email-api/)

CI/CD: GitHub Actions

Testes unitários: Jest

ORM: prisma

Infraestrutura provisionada por IaC (Terraform)

**Infraestrutura:**

Banco de dados: relacional (RDS c/ postgres)

(Foi pensado em fazer dois clusters (um banco de leitura e um banco de escrita) para melhorar a concorrência, mas por ser um MVP, decidimos começar com apenas um banco)
  
Escalabilidade: ECS Fargate para controlar a conteinerização na cloud

Registry de imagens: ECR

 
## Deployment
- Para realizar o provisionamento da infraestrurura, siga o README.ME do terraform (https://github.com/HealthFusion-Fiap/hackathon-health-fusion/tree/main/terraform)
- Após isso, é necessário acionar a pipelne de CI/CD (https://github.com/HealthFusion-Fiap/hackathon-health-fusion/actions/workflows/ci-cd-pipeline.yml)

## Ambiente de desenvolvimento
- Utilizar o `docker compose up`
