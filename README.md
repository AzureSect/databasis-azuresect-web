# 🚀 Databasis — Gestão de Inventário (Front-end)

Este é o módulo de interface de usuário do ecossistema **Databasis**, desenvolvido para gerenciar o fluxo de materiais e a composição técnica de produtos. A aplicação transforma dados de estoque em inteligência de produção.

---

## 🔗 Ecossistema Full-Stack

Para o funcionamento completo da aplicação, ambos os módulos precisam estar operacionais:

| Módulo                 | Repositório               |
| ---------------------- | ------------------------- |
| Front-end (este repo)  | `databasis-azuresect-web` |
| Back-end (API Quarkus) | `databasis-azuresect-api` |

---

## 🛠️ Tecnologias

| Tecnologia                   | Descrição                                                |
| ---------------------------- | -------------------------------------------------------- |
| **React 19**                 | Últimas melhorias de performance e renderização          |
| **Vite**                     | Build tool ultrarápida para desenvolvimento ágil         |
| **Redux Toolkit**            | Gerenciamento de estado global para Materiais e Produtos |
| **Tailwind CSS 4**           | Estilização moderna, performática e responsiva           |
| **Vitest & Testing Library** | Testes unitários para integridade da lógica de negócio   |
| **Axios**                    | Comunicação com a API via proxy configurado              |
| **TypeScript**               | Tipagem estrita em todo o projeto                        |

---

## 🏗️ Estrutura de Pastas

Organizado por domínios para facilitar a escalabilidade:

```
src/
├── components/
│   ├── Material/     # Formulários e listagem de materiais
│   ├── Product/      # Formulários e listagem de produtos
│   └── ui/           # Componentes base reutilizáveis (Badge, Button, Card, Input, Modal, Table...)
├── hooks/            # Custom hooks para integração com Redux
├── layouts/          # Estruturas de página (MainLayout com navegação responsiva)
├── pages/            # Páginas principais (Materiais, Produtos, Sugestões)
├── routes/           # Configuração de rotas da aplicação
├── services/         # Chamadas à API (Axios)
├── store/            # Slices (Reducers/Actions) e configuração do Redux
├── types/            # Interfaces TypeScript e definições globais
└── test/             # Configurações e mocks para ambiente de testes
```

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) — versão LTS recomendada

### 1. Instalar dependências

```bash
npm install
```

### 2. Rodar em desenvolvimento

```bash
npm run dev
```

Acesse em: [http://localhost:5173](http://localhost:5173)

### 3. Build para produção

```bash
npm run build
```

---

## ⚙️ Configuração do Proxy

O `vite.config.ts` está configurado para redirecionar chamadas de `/api` para o servidor da API no Render automaticamente, eliminando problemas de CORS durante o desenvolvimento.

---

## 🧪 Testes

Testes automatizados validam a parte mais crítica do sistema: o cálculo de capacidade produtiva.

```bash
npm test

npm run test:ui
```

---

## ✅ Funcionalidades Implementadas

- [x] **Gestão de Matérias-Primas** — Listagem e controle de estoque em tempo real com Redux
- [x] **Composição de Produtos** — Cadastro dinâmico vinculado a múltiplos insumos
- [x] **Sugestão de Produção Inteligente** — Algoritmo que calcula a produção máxima baseada no estoque, priorizando itens de maior valor comercial
- [x] **Abatimento em Cascata** — Simulação que consome o estoque conforme a prioridade dos produtos
- [x] **Interface Responsiva** — Layout adaptável para tablets, celulares e desktops com Tailwind 4
- [x] **Qualidade de Código** — Tipagem estrita com TypeScript e cobertura de testes na lógica de negócio
