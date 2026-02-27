⚠️ Aviso: A API está hospedada no Render com o plano gratuito. Ao acessar pela primeira vez, pode haver uma espera de aproximadamente 1 minuto até o servidor sair do modo sleep e o banco de dados ser liberado. Isso é esperado e não é um bug.

🚀 Databasis — Gestão de Inventário (Front-end)
Este é o módulo de interface de usuário do ecossistema Databasis, desenvolvido para gerenciar o fluxo de materiais e a composição técnica de produtos. A aplicação transforma dados de estoque em inteligência de produção.

🔗 Ecossistema Full-Stack
Para o funcionamento completo da aplicação, ambos os módulos precisam estar operacionais:
MóduloRepositórioFront-end (este repo)databasis-azuresect-webBack-end (API Quarkus)databasis-azuresect-api

🛠️ Tecnologias
TecnologiaDescriçãoReact 19Últimas melhorias de performance e renderizaçãoViteBuild tool ultrarápida para desenvolvimento ágilRedux ToolkitGerenciamento de estado global para Materiais e ProdutosTailwind CSS 4Estilização moderna, performática e responsivaVitest & Testing LibraryTestes unitários para integridade da lógica de negócioAxiosComunicação com a API via proxy configuradoTypeScriptTipagem estrita em todo o projeto

🏗️ Estrutura de Pastas
Organizado por domínios para facilitar a escalabilidade:
src/
├── components/
│ ├── Material/ # Formulários e listagem de materiais
│ ├── Product/ # Formulários e listagem de produtos
│ └── ui/ # Componentes base reutilizáveis (Badge, Button, Card, Input, Modal, Table...)
├── hooks/ # Custom hooks para integração com Redux
├── layouts/ # Estruturas de página (MainLayout com navegação responsiva)
├── pages/ # Páginas principais (Materiais, Produtos, Sugestões)
├── routes/ # Configuração de rotas da aplicação
├── services/ # Chamadas à API (Axios)
├── store/ # Slices (Reducers/Actions) e configuração do Redux
├── types/ # Interfaces TypeScript e definições globais
└── test/ # Configurações e mocks para ambiente de testes

🚀 Como Rodar o Projeto
Pré-requisitos

Node.js — versão LTS recomendada

1. Instalar dependências
   bashnpm install
2. Rodar em desenvolvimento
   bashnpm run dev
   Acesse em: http://localhost:5173
3. Build para produção
   bashnpm run build

⚙️ Configuração do Proxy
O vite.config.ts está configurado para redirecionar chamadas de /api para o servidor da API no Render automaticamente, eliminando problemas de CORS durante o desenvolvimento.

🧪 Testes
Testes automatizados validam a parte mais crítica do sistema: o cálculo de capacidade produtiva.
bash# Rodar via terminal (uma execução)
npm test

# Interface visual interativa

npm run test:ui

✅ Funcionalidades Implementadas

Gestão de Matérias-Primas — Listagem e controle de estoque em tempo real com Redux
Composição de Produtos — Cadastro dinâmico vinculado a múltiplos insumos
Sugestão de Produção Inteligente — Algoritmo que calcula a produção máxima baseada no estoque, priorizando itens de maior valor comercial
Abatimento em Cascata — Simulação que consome o estoque conforme a prioridade dos produtos
Interface Responsiva — Layout adaptável para tablets, celulares e desktops com Tailwind 4
Qualidade de Código — Tipagem estrita com TypeScript e cobertura de testes na lógica de negócio
