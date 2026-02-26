🚀 Databasis - Gestão de Inventário (Front-end)
Este é o módulo de interface de usuário do ecossistema Databasis, desenvolvido para gerenciar o fluxo de materiais e a composição técnica de produtos da Autoflex.

🔗 Ecossistema Full-Stack
Para o funcionamento completo da aplicação, é necessário que ambos os módulos estejam rodando:

Front-end (Este repo): databasis-azuresect-web

Back-end (API Quarkus): databasis-azuresect-api

🛠️ Tecnologias e Recursos
React 18 com TypeScript

Vite (Build tool ultrarápida)

Redux Toolkit (Gerenciamento de estado global para Materiais/Produtos)

Tailwind CSS (Estilização moderna e responsiva)

Axios (Comunicação com a API via Proxy configurado)

Path Mapping (Uso de @/ para imports limpos)

🏗️ Estrutura de Pastas
Organizado por domínios para facilitar a manutenção:

Plaintext
src/
├── components/ # Componentes reutilizáveis (ProductForm, Table, etc)
├── hooks/ # Custom hooks (useAppDispatch, useAppSelector)
├── pages/ # Páginas da aplicação (MaterialsPage, ProductsPage)
├── services/ # Configuração do Axios (api.ts)
├── store/ # Slices e configuração do Redux
└── types/ # Interfaces e Tipos globais
🚀 Como Rodar o Projeto

1. Pré-requisitos
   Certifique-se de ter o Node.js instalado.

2. Instalação
   Lembre-se de executar os comandos dentro da pasta raiz do projeto:

Bash
npm install

3. Configuração do Proxy
   O projeto está configurado para redirecionar chamadas de /api para o servidor do Render automaticamente via vite.config.ts. Caso precise mudar o alvo, altere a propriedade target no arquivo de configuração.

4. Execução
   Bash
   npm run dev
   Acesse em: http://localhost:5173

📝 Funcionalidades Implementadas
[x] Listagem de Matérias-Primas: Consumo de API em tempo real com Redux.

[x] Cadastro de Produtos : Formulário dinâmico para composição técnica.

[x] Alias de Caminho: Configuração de @/ para evitar ../../.

[x] CORS Resolvido: Integração via Proxy local e configuração no back-end.
