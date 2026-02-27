🚀 Databasis - Gestão de Inventário (Front-end)
Este é o módulo de interface de usuário do ecossistema Databasis, desenvolvido especificamente para gerenciar o fluxo de materiais e a composição técnica de produtos. A aplicação foca em transformar dados de estoque em inteligência de produção.

🔗 Ecossistema Full-Stack
Para o funcionamento completo da aplicação, é necessário que ambos os módulos estejam operacionais:

Front-end (Este repo): databasis-azuresect-web

Back-end (API Quarkus): databasis-azuresect-api

🛠️ Tecnologias e Recursos
React 19: Utilizando as últimas melhorias de performance e renderização.

Vite: Build tool ultrarápida para um fluxo de desenvolvimento ágil.

Redux Toolkit: Gerenciamento de estado global robusto para Materiais e Produtos.

Tailwind CSS 4: Estilização moderna, performática e totalmente responsiva.

Vitest & Testing Library: Suíte de testes unitários para garantir a integridade da lógica de negócio.

Axios: Comunicação otimizada com a API via Proxy configurado.

Path Mapping: Uso de @/ para imports limpos e manutenção simplificada.

🏗️ Estrutura de Pastas
Organizado por domínios para facilitar a escalabilidade:

Plaintext
src/
├── components/ # Componentes reutilizáveis (Formulários, Tabelas, Cards)
├── hooks/ # Custom hooks para integração com Redux (useAppDispatch/Selector)
├── layouts/ # Estruturas de página (MainLayout com navegação responsiva)
├── pages/ # Páginas principais (Materiais, Produtos, Sugestões)
├── store/ # Slices (Reducers/Actions) e configuração central do Redux
├── types/ # Interfaces TypeScript e definições globais
└── test/ # Configurações e mocks para ambiente de testes
🚀 Como Rodar o Projeto

1. Pré-requisitos
   Certifique-se de ter o Node.js (versão LTS recomendada) instalado em sua máquina.

2. Instalação
   Acesse a pasta do projeto e instale as dependências:

Bash
npm install 3. Execução (Desenvolvimento)
Inicie o servidor local:

Bash
npm run dev
Acesse em: http://localhost:5173

4. Configuração do Proxy
   O projeto está configurado no vite.config.ts para redirecionar chamadas de /api para o servidor do Render automaticamente. Isso elimina problemas de CORS durante o desenvolvimento.

🧪 Testes Unitários
Implementamos testes automatizados para validar a parte mais crítica do sistema: o cálculo de capacidade produtiva.

Rodar testes via terminal:

Bash
npm test
Interface Visual (Dashboard de Testes):

Bash
npm run test:ui
📝 Funcionalidades Implementadas
[x] Gestão de Matérias-Primas: Listagem e controle de estoque em tempo real com Redux.

[x] Composição de Produtos: Cadastro dinâmico de produtos vinculados a múltiplos insumos.

[x] Sugestão de Produção Inteligente: Algoritmo que calcula a produção máxima possível baseada no estoque atual, priorizando itens de maior valor comercial

[x] Abatimento em Cascata: Simulação de produção que consome o estoque conforme a prioridade dos produtos.

[x] Interface Responsiva: Layout adaptável para tablets, celulares e desktops utilizando Tailwind 4.

[x] Qualidade de Código: Tipagem estrita com TypeScript e cobertura de testes em lógica de negócio .
