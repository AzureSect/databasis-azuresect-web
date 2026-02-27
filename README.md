# Databasis --- Gestão de Inventário (Front-end)

Interface web do ecossistema **Databasis**, desenvolvida para gerenciar
estoque de matérias-primas e composição técnica de produtos.

A aplicação transforma dados de inventário em inteligência de produção,
permitindo visualizar capacidade produtiva com base no estoque
disponível.

---

## Sobre o Projeto

Este repositório contém o módulo **front-end** da aplicação.\
Ele consome uma API desenvolvida em Quarkus e apresenta:

- Controle de matérias-primas
- Cadastro e composição de produtos
- Simulação de produção com base no estoque
- Cálculo automático de capacidade produtiva

> **Observação:**\
> A API está hospedada no Render (plano gratuito).\
> No primeiro acesso pode haver um tempo de espera de até \~1 minuto,
> pois o servidor entra em modo sleep. Isso é esperado.
> Testes de integração com Cypress estão implementados no repositório da API."
---

## Arquitetura Full-Stack

Para funcionamento completo do sistema, os dois módulos devem estar
ativos:

- Front-end: `databasis-azuresect-web`
- Back-end (API Quarkus): `databasis-azuresect-api`
- * **Back-end (API Render):** https://github.com/AzureSect/databasis-azuresect-api

---

## Tecnologias Utilizadas

- React 19
- Vite
- Redux Toolkit
- TypeScript
- Tailwind CSS 4
- Axios
- Vitest
- Testing Library

A aplicação utiliza tipagem estrita, organização por domínio e
gerenciamento global de estado via Redux.

---

## Estrutura do Projeto

Organizado por domínio para facilitar manutenção e escalabilidade:

    src/
    ├── components/
    │   ├── Material/
    │   ├── Product/
    │   └── ui/
    ├── hooks/
    ├── layouts/
    ├── pages/
    ├── routes/
    ├── services/
    ├── store/
    ├── types/
    └── test/

---

## Funcionalidades

### Gestão de Matérias-Primas

- Cadastro
- Listagem
- Controle de estoque em tempo real

### Composição de Produtos

- Associação de múltiplos insumos
- Estrutura técnica por produto

### Sugestão de Produção

- Cálculo automático da produção máxima possível
- Prioridade por maior valor comercial

### Simulação de Abatimento

- Consumo progressivo do estoque
- Visualização do impacto na capacidade produtiva

### Qualidade de Código

- TypeScript com tipagem estrita
- Testes unitários na regra de negócio crítica (cálculo produtivo)

---

## Como Executar o Projeto

### Pré-requisitos

- Node.js (versão LTS recomendada)

### 1. Instalar dependências

```bash
npm install
```

### 2. Executar em desenvolvimento

```bash
npm run dev
```

Aplicação disponível em:

    http://localhost:5173

### 3. Gerar build de produção

```bash
npm run build
```

---

## Configuração de Proxy

O arquivo `vite.config.ts` está configurado para redirecionar chamadas
`/api` para o servidor hospedado no Render durante o desenvolvimento,
evitando problemas de CORS.

---

## Testes

Os testes cobrem principalmente a lógica de cálculo de capacidade
produtiva.

Rodar testes no terminal:

```bash
npm test
```

Interface visual interativa:

```bash
npm run test:ui
```

---

## Screenshots da Aplicação
![image](https://github.com/user-attachments/assets/afd5f1d3-0da8-4a72-9b7a-942244362c4a)
![image](https://github.com/user-attachments/assets/5c66b4cb-cdbf-4902-8d39-103a9f0f544a)
Render: ![image](https://github.com/user-attachments/assets/68a72231-a194-4953-8f7e-2780bffc408a)
    
