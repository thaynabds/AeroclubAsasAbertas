# 🛩️ Sistema de Gerenciamento de Agenda e Aulas — Aeroclube Asas Abertas

**Protótipo desenvolvido no RiseUp 2026.1 | Porto Digital + NTTDATA via Residência em Software & Inteligência Artificial em parceria com a Faculdade Senac Recife-PE.**

Plataforma web que digitaliza a gestão administrativa do Aeroclube Asas Abertas (PE), substituindo papéis e planilhas por um sistema centralizado de cadastros, agendamentos, diário de aulas e controle financeiro — com foco em segurança operacional.

![Introdução — Aeroclube Asas Abertas](https://raw.githubusercontent.com/thaynabds/AeroclubAsasAbertas/refs/heads/main/Aeroclub%20Asas%20Abertas.png)

---

## 📑 Índice

- [🎯 Problema](#-problema)
- [✅ A Solução](#-a-solução)
- [🖼️ Protótipos](#️-protótipos)
- [🌍 Impacto ESG](#-impacto-esg)
- [📈 Mercado](#-mercado)
- [💼 Modelo de Negócio](#-modelo-de-negócio)
- [🧾 Análise de Custo e Viabilidade](#-análise-de-custo-e-viabilidade)
- [🎯 Público-Alvo](#-público-alvo)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [🚀 Como Executar Localmente](#-como-executar-localmente)
- [👥 Equipe — Squad 43](#-equipe--squad-43)
- [📋 Documentação Técnica](#-documentação-técnica)
  - [1. Definição do Problema](#1-definição-do-problema)
  - [2. Backlog e Engenharia de Requisitos](#2-backlog-e-engenharia-de-requisitos)
  - [3. UX/UI para Interfaces Inteligentes](#3-uxui-para-interfaces-inteligentes)
  - [4. Arquitetura de Software e Stack de Desenvolvimento](#4-arquitetura-de-software-e-stack-de-desenvolvimento)
  - [5. Relato do Processo e Engenharia de Prompt](#5-relato-do-processo-e-engenharia-de-prompt)
  - [6. Análise de Custos e Viabilidade](#6-análise-de-custos-e-viabilidade)
  - [7. Evoluções Futuras](#7-evoluções-futuras)
- [📽️ Demonstrações](#️-demonstrações)
- [📄 Licença](#-licença)
- [📞 Contato](#-contato)

---

## 🎯 Problema

O Aeroclube Asas Abertas gerenciava alunos, professores e agendamentos de voo de forma manual — papéis e planilhas. Sem controle digital, surgiam conflitos de horário, informações perdidas e falhas de comunicação que comprometem a operação e a segurança de voo.

Problemas relatados:
- Dois alunos reservam o mesmo instrutor ou aeronave no mesmo horário ✖️
- Rasuras e folhas extraviadas impedem rastrear cancelamentos e presenças 🗂️
- Cobranças duplicadas e pagamentos não registrados geram prejuízo financeiro 💸
- Descontos aplicados errado causam desgaste com o aluno ⚠️
- Aeronaves alugadas duas vezes para o mesmo horário, descoberto só na pista 🛬
- Professor comparece sem aluno por falha de comunicação 📣
- Aluno chega e descobre a aeronave em manutenção sem aviso prévio 🔧

> Em aviação, falha de informação vai além do administrativo — compromete a **segurança**.

![Problema](https://raw.githubusercontent.com/thaynabds/AeroclubAsasAbertas/refs/heads/main/Problema.png)
![Problema 2](https://github.com/thaynabds/AeroclubAsasAbertas/blob/main/O%20Problema%202.png)

---

## ✅ A Solução

A plataforma proposta digitaliza e automatiza regras operacionais para reduzir erros e aumentar a segurança:

- Agendamentos digitais eliminam conflitos de horário 🔁
- Controle de acesso por perfil protege os dados 🔐
- Diário digital registra presenças, notas e conteúdo 📘
- Aluno acompanha seu histórico em tempo real 📊
- Sistema bloqueia cancelamentos fora do prazo ⏳
- Inadimplentes são impedidos de agendar aulas 🚫
- Alunos sem CMA são bloqueados automaticamente 🛡️
- Cadastro centralizado substitui planilhas isoladas 🗃️
- Painel inicial reúne métricas e agendamentos 🎛️
- Histórico de aulas acessível a qualquer momento 📚
- Professor aprova ou reprova cancelamentos registrados ✅
- Cores indicam disponibilidade de horários na agenda 🎨

![A Solução](https://github.com/thaynabds/AeroclubAsasAbertas/blob/main/Solução.png)

---

## 🖼️ Protótipos

### Visão do Aluno
![Protótipo da parte do Aluno](https://raw.githubusercontent.com/thaynabds/AeroclubAsasAbertas/refs/heads/main/Prot%C3%B3tipo%20Solu%C3%A7%C3%A3o%20Web%20Aluno.png)

### Visão do Professor
![Protótipo da parte do Professor](https://raw.githubusercontent.com/thaynabds/AeroclubAsasAbertas/refs/heads/main/Prot%C3%B3tipo%20Solu%C3%A7%C3%A3o%20Web%20Instrutor.png)

### QR Code / Acesso rápido ao protótipo
![QR Code do protótipo](https://raw.githubusercontent.com/thaynabds/AeroclubAsasAbertas/refs/heads/main/Squad%20e%20Prot%C3%B3tipo.png)

Protótipo Funcional — HTML, CSS e JavaScript: [https://asasabertas-aero-clube.vercel.app/](https://asasabertas-aero-clube.vercel.app/)

Para acessar o site:
- **E-mail:** `dashboardgeneral`
- **Senha:** `*_aeroClube@`

---

## 🌍 Impacto ESG

### E – Environmental 🌱
Eliminação do uso de papel na gestão administrativa.

### S – Social 👥
Digitalização de escola de aviação civil, ampliando acesso organizado à formação de pilotos.

### G – Governance 📋
Digitalização com rastreabilidade, padronização e controle de dados, apoiando compliance e segurança operacional.

![Impacto ESG](https://github.com/thaynabds/AeroclubAsasAbertas/blob/main/Impacto%20ESG.png)

---

## 📈 Mercado

**Organização é Prioridade!**

Aeroclubes e escolas de aviação civil no Brasil enfrentam crescimento da demanda por pilotos civis e necessidade crescente de digitalização operacional. A regulamentação da ANAC e as exigências do Ministério da Aeronáutica criam obrigações de registro que sistemas manuais não suportam com segurança.

O sistema foi validado com usuários reais do Aeroclube Coroa do Avião (PE), que opera com as mesmas dores. Sistemas similares existem em escolas de aviação de grande porte, mas são inacessíveis ou inapropriados para aeroclubes de médio porte.

![Mercado](https://github.com/thaynabds/AeroclubAsasAbertas/blob/main/Mercado.png)

---

## 💼 Modelo de Negócio

Protótipo desenvolvido como projeto acadêmico via NTTDATA | Residência em Software & Inteligência Artificial (Porto Digital / Faculdade Senac Recife-PE).

O modelo de negócio futuro pressupõe licenciamento da plataforma para aeroclubes, com backend, banco de dados e módulos financeiro, de manutenção e documentos ainda em desenvolvimento.

> ✈️ **Digitalizar Evita Conflito e Perda de Informação**

![Modelo de Negócios](https://raw.githubusercontent.com/thaynabds/AeroclubAsasAbertas/refs/heads/main/Modelo%20de%20Neg%C3%B3cios.png)

---

## 🧾 Análise de Custo e Viabilidade

| Item | Valor |
|------|-------|
| 11 integrantes × 20h × R$ 20,00/h | R$ 4.400,00 |
| Custos operacionais (internet e energia) | R$ 300,00 |
| **Total estimado** | **R$ 4.700,00** |
| **Prazo estimado** | **~12 semanas** |

![Análise de Custo e Viabilidade](https://raw.githubusercontent.com/thaynabds/AeroclubAsasAbertas/refs/heads/main/An%C3%A1lise%20de%20Custo%20e%20Viabilidade.png)

---

## 🎯 Público-Alvo

- Alunos aspirantes a pilotos (ex.: Piloto Privado de Avião) ✈️
- Instrutores de voo habilitados 👨‍✈️
- Administradores de aeroclubes 🧑‍💼
- Gestores de manutenção e operações 🔧

![Público-Alvo](https://github.com/thaynabds/AeroclubAsasAbertas/blob/main/Público%20Alvo.png)

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Uso |
|------------|-----|
| HTML5 | Estrutura e marcação semântica |
| CSS3 | Estilização, responsividade e identidade visual |
| JavaScript | Lógica de interação e validação de formulários |
| Figma | Prototipagem visual das telas |
| Vercel | Hospedagem do protótipo |
| Scrum | Metodologia ágil de desenvolvimento |
| GitHub | Versionamento de código |

> 🤝 **NTTDATA via Residência em Software & Inteligência Artificial em parceria com a Faculdade Senac Recife-PE no Rise Up do Porto Digital.**

---

## 🚀 Como Executar Localmente

```bash
# 1. Clone o repositório
git clone https://github.com/thaynabds/AeroclubAsasAbertas.git

# 2. Acesse a pasta do projeto
cd AeroclubAsasAbertas

# 3. Abra o arquivo index.html no navegador
```

> **Observação:** projeto 100% frontend, sem necessidade de backend ou configuração de ambiente.

---

## 👥 Equipe — Squad 43

### Atribuições da Equipe

![Atribuições 1](https://github.com/thaynabds/AeroclubAsasAbertas/blob/main/Atribuições.png)
![Atribuições 2](https://github.com/thaynabds/AeroclubAsasAbertas/blob/main/Atribuições%202.png)

| Nome | Função / Responsabilidades |
|------|---------------------------|
| **Thayná Batista da Silva** | Scrum Master · Análise de Requisitos · Product Designer · Design e Prototipação (Figma) |
| Henrique Nascimento Vasco Alves | Líder de Teste do sistema · Relatos de IA · Análise de custo e viabilidade |
| James Bernardino Da Silva Neto | Responsividade do menu lateral · Relatos de IA · Análise de custo e viabilidade |
| Pedro Henrique Marques da Silva | Responsividade geral do site · Front-End (HTML, CSS e JS) · Relatos de IA · Análise de custo e viabilidade |
| Pedro Lucas de Souza Pessoa | Líder de Programação Front-End · Repositório do código · Relatos de IA · Líder de Regras de Negócio |
| Pedro Ruan Verissimo da Costa | Front-End (HTML, CSS e JS) · Relatos de IA · Análise de custo e viabilidade |
| Silvoney Felipe Bernardino | Auxílio de Pesquisa · Revisão da documentação · Líder de Documentação · Relatos de IA |
| Sophia Maria Lima da Costa | Produção e revisão da documentação · Pesquisa de tipografia e cores · Relatos de IA · Regras de negócio |
| Suelen Bezerra Alves dos Santos | Relatos de IA · Produção da documentação · Desenvolvimento · Responsividade · Líder de Análise de custo |
| Tatiana Cristina Nunes Bezerra | Líder de Pesquisa · Questionário · Requisitos · Personas · Trilha inicial · Comparativos web x mobile · Relatos de IA |
| Vicente de Paula Gomes da Silva Junior | Prototipagem Figma · Trilha inicial · Requisitos Funcionais e Não Funcionais · Regras de negócio · Líder de Fluxo de telas · Documentação · Teste do sistema |

---

## 📋 Documentação Técnica

### 1. Definição do Problema

O Aeroclube Asas Abertas enfrenta dificuldades com a gestão manual de dados administrativos e operacionais. Com o crescimento do número de alunos e sócios, o controle baseado em papéis e planilhas tornou-se ineficiente, gerando erros, riscos à segurança de voo e prejuízos financeiros.

**Síntese:** Gestão manual de dados no aeroclube gera erros, riscos e prejuízos. Com mais sócios e alunos, planilhas e papéis causam desorganização, dificultando controle em tempo real.

#### Pontos Críticos Abordados pelo Sistema

- **Ausência de registro digital de aulas:** resolvido com o Diário do Professor (registro completo) e o Diário do Aluno (leitura filtrada por tipo de serviço).
- **Falta de controle de acesso por perfil:** login por e-mail e senha com perfis distintos — aluno, professor e administrador.
- **Dificuldade no agendamento:** Agenda com visualização de horários, seleção de tipo de serviço (Aula Teórica, Aula Prática/Voo, Simulador ou Aluguel de Aeronave) e cancelamentos com até 3 dias de antecedência.
- **Ausência de cadastro centralizado:** tela de Cadastro unifica dados pessoais, documentação aeronáutica, CMA, licenças e especializações.
- **Falta de visão geral:** Painel Inicial (Home) com métricas de voos do mês, horas de voo, alunos ativos e próximos agendamentos.

#### 1.2 Solução Proposta

Plataforma web front-end em HTML, CSS3 e JavaScript, focada nas funcionalidades solicitadas pela NTTData para o Aeroclube Asas Abertas de Pernambuco. O sistema centraliza cadastros, agendamentos e o histórico de aulas por perfil de usuário.

**Telas funcionais entregues:**

| Tela | Descrição |
|------|-----------|
| Login | E-mail, senha, 'Lembrar-me' e link para cadastro |
| Home | Cards de métricas, navegação e próximos agendamentos |
| Agenda | Busca por data/tipo de serviço, legenda de cores e agendamento |
| Diário do Professor | Registro completo de aulas, notas, coeficiente de rendimento e observações |
| Diário do Aluno | Visualização somente leitura, filtrada por tipo de serviço |
| Cadastro | Abas separadas para aluno e professor, acesso exclusivo pelo administrador |

**Telas em construção:** Cronograma de Aulas Teóricas, Histórico de Voos, Manutenção, Documentos, Financeiro, Extrato e Treinamentos.

#### 1.3 Onde a IA Gera Valor

| Dimensão | Aplicação |
|----------|-----------|
| Automação | Cadastro automático, organização de dados e atualização de status |
| Predição | Previsão de demanda de aulas, manutenção preventiva e risco de inadimplência |
| Geração de Conteúdo | Relatórios automáticos, alertas de vencimento de documentos e análises de desempenho |

**IA no desenvolvimento do projeto:**
- Definição dos campos dos formulários de cadastro com base em práticas reais de escolas de aviação
- Levantamento dos dados necessários para a agenda de agendamentos
- Geração de imagem temática via Gemini (Nano Banana) para telas em construção
- Auxílio na produção da documentação e estruturação do backlog

#### 1.4 Personas

**Persona 1 — Lucas, 22 anos | Aluno Aspirante a Piloto Privado (PP – Avião)**

| | |
|-|-|
| **Perfil** | Jovem buscando sua primeira licença de Piloto Privado. Sem experiência prévia em aviação formal. |
| **Objetivo** | Concluir o curso de PP-Avião, acumular horas de voo e obter o brevet. |
| **Necessidades** | Agendar aulas práticas, conferir horários, consultar aprovação em avaliações e conteúdo ministrado. |
| **Atenção** | Deve manter pagamentos em dia e entregar documentos obrigatórios para não ser bloqueado das aulas. |

**Persona 2 — Juliana, 34 anos | Instrutora de Voo Habilitada**

| | |
|-|-|
| **Perfil** | Piloto habilitada que ministra aulas teóricas e práticas, acompanha o progresso dos alunos e gerencia registros de missão. |
| **Objetivo** | Registrar aulas com eficiência, acompanhar a evolução dos alunos e gerenciar sua agenda mensal. |
| **Necessidades** | Informar disponibilidade, registrar tempo de voo, ocorrências, presença/ausência, nota e conteúdo; aprovar ou reprovar cancelamentos. |

#### 1.5 Casos de Borda (Edge Cases) de IA

| Cenário | Impacto |
|---------|---------|
| Perda de dados | Falha no sistema pode causar perda de registros de aulas e agendamentos |
| Erro no controle financeiro | Cobranças duplicadas ou desconto incorreto (15% à vista) geram prejuízos |
| Conflito de agendamento | Sem sincronização em tempo real, há risco de sobreposição de recursos |
| Aluno inadimplente | Falha na validação financeira pode violar a regra de negócio |
| Cancelamento fora do prazo | O sistema bloqueia e informa a regra dos 3 dias de antecedência |
| IA com baixa precisão | Previsões abaixo de 70% de acerto devem acionar supervisão humana |
| Documento vencido / não entregue | Aluno sem CMA é bloqueado automaticamente |

#### 1.6 Entrevistas e Validação de Hipóteses

Foi realizada entrevista com usuários reais do Aeroclube Coroa do Avião (PE) para validação das necessidades levantadas. O feedback foi organizado por perfil de acesso: aluno/sócio, instrutor/professor, ADM-Manutenção e Estoque, e ADM-Operacional. A IA (Gemini e ChatGPT) foi utilizada como agente inteligente complementar para validação de hipóteses e levantamento de requisitos.

---

### 2. Backlog e Engenharia de Requisitos

#### 2.1 Épicos do Projeto

| Épico | Descrição |
|-------|-----------|
| Épico 1 | Autenticação e Cadastro |
| Épico 2 | Painel Principal (Home) |
| Épico 3 | Agenda e Agendamentos |
| Épico 4 | Diário do Professor |
| Épico 5 | Diário do Aluno |
| Épico 6 | Telas em Construção |

#### 2.2 Histórias de Usuário

| ID | Perfil | História |
|----|--------|----------|
| HU-01 | Aluno | Consultar status de aprovação após o exame do Ministério da Aeronáutica. |
| HU-02 | Aluno | Agendar aulas teóricas e práticas antecipadamente. |
| HU-03 | Aluno | Visualizar registro das aulas com data, hora, presença, nota e conteúdo. |
| HU-04 | Instrutor | Registrar e modificar informações sobre cada aula realizada. |
| HU-05 | Instrutor | Gerenciar disponibilidade mensal e aprovar/reprovar cancelamentos. |
| HU-06 | Administrador | Cadastrar alunos e professores no sistema. |

#### 2.3 Requisitos Funcionais

| ID | Descrição |
|----|-----------|
| RF01 | Selecionar data de agendamento por meio de calendário. |
| RF02 | Filtrar agendamento por tipo de serviço: Aula Teórica, Aula Prática (Voo), Simulador, Aluguel de Aeronave. |
| RF03 | Seleção opcional de instrutor/aeronave no agendamento. |
| RF04 | Exibir horários disponíveis com legenda de cores (Disponível, Indisponível, Manutenção, Aguarde o retorno). |
| RF05 | Permitir ao aluno selecionar e confirmar um horário disponível. |
| RF06 | Permitir solicitar cancelamento de agendamento com até 3 dias de antecedência. |
| RF07 | Exibir painel principal (Home) com cards de acesso rápido às funcionalidades. |
| RF08 | Apresentar cards de navegação para módulos (Treinamento, Voos, Documentos, Financeiro, Extrato, Sair). |
| RF09 | Exibir na Home: número de voos do mês, horas de voo, alunos ativos e próximos agendamentos. |
| RF10 | Professor registra: nome da aula, data, hora, presença/ausência, nota (0–10), coeficiente de rendimento, conteúdo e observações. |
| RF11 | Professor pode modificar registros de aulas já criados. |
| RF12 | Aluno visualiza no Diário: data/hora, matéria, presença, nota, conteúdo e status da aula. |
| RF13 | Aluno filtra o Diário por tipo de serviço. |
| RF14 | Aluno não pode fazer modificações ou anotações no Diário. |
| RF15 | Cadastro de aluno com todos os campos obrigatórios e opcionais definidos. |
| RF16 | Cadastro de professor com todos os campos obrigatórios definidos. |
| RF17 | Tela de login com e-mail, senha, opção 'Lembrar-me' e link para cadastro. |
| RF18 | Telas em construção exibindo mensagem padronizada com imagem temática de aviação. |

#### Requisitos Não Funcionais

| ID | Descrição |
|----|-----------|
| RNF01 | Interface intuitiva e de fácil navegação para todos os perfis. |
| RNF02 | Uso de cores para representar status de horários (verde, vermelho, amarelo, cinza). |
| RNF03 | Minimizar o número de cliques para execução de tarefas frequentes. |
| RNF04 | Sistema responsivo para desktop e mobile. |
| RNF05 | Consistência visual entre todos os módulos do sistema. |
| RNF06 | Sem conflitos de agendamento entre alunos, instrutores e aeronaves. |
| RNF07 | O aluno logado visualiza apenas suas próprias informações. |
| RNF08 | Telas em construção apresentam mensagem padronizada com imagem gerada por IA. |

---

### 3. UX/UI para Interfaces Inteligentes

#### 3.1 Status das Telas

| Tela | Status |
|------|--------|
| Login | ✅ Funcional |
| Cadastro de Aluno | ✅ Funcional |
| Cadastro de Professor | ✅ Funcional |
| Home (Painel Principal) | ✅ Funcional |
| Agenda | ✅ Funcional |
| Diário do Professor | ✅ Funcional |
| Diário do Aluno | ✅ Funcional |
| Cronograma de Aulas Teóricas | 🚧 Em construção |
| Histórico de Voos | 🚧 Em construção |
| Manutenção | 🚧 Em construção |
| Documentos | 🚧 Em construção |
| Financeiro | 🚧 Em construção |
| Extrato do Aluno / Instrutor | 🚧 Em construção |
| Treinamentos | 🚧 Em construção |

#### 3.2 Detalhamento de Navegação

Menu lateral fixo (visível após login) com as seções: **Início · Agenda · Treinamento · Voos · Documentos · Financeiro · Extrato · Sair**

#### 3.3 Tratamento de Erros

- Telas em construção exibem imagem temática gerada por IA com indicador de progresso
- Campos obrigatórios marcados com `*` e validados antes do envio
- Horários indisponíveis exibidos em vermelho; em manutenção em amarelo
- Formulários de cadastro possuem botão de retorno ao login

---

### 4. Arquitetura de Software e Stack de Desenvolvimento

#### 4.1 Stack de Desenvolvimento

| Ferramenta | Finalidade | Custo |
|------------|-----------|-------|
| HTML5 | Estrutura e marcação semântica | Gratuito |
| CSS3 | Estilização e responsividade | Gratuito |
| JavaScript (Vanilla) | Lógica, validação e navegação | Gratuito |
| Figma | Prototipagem visual | Gratuito |
| Visual Studio Code | Desenvolvimento do sistema | Gratuito |
| GitHub | Versionamento de código | Gratuito |
| Gemini (Google) | Geração de imagem e consultas | Gratuito |
| ChatGPT / Gemini | Levantamento de requisitos | Gratuito |
| Google Docs / Drive | Documentação colaborativa | Gratuito |

#### 4.2 Estrutura de Pastas

```
AeroclubAsasAbertas/
├── index.html              # Tela de Login
├── cadastro.html           # Cadastro de Aluno e Professor
├── home.html               # Painel Principal (Home)
├── agenda.html             # Agenda e Agendamentos
├── diario-professor.html   # Diário do Professor
├── diario-aluno.html       # Diário do Aluno
├── pages/                  # Demais telas (em construção)
├── css/                    # style.css, components.css
├── js/                     # login.js, agenda.js, diario.js
└── assets/                 # Imagens, logo e ícones
```

#### 4.3 Integração Frontend e Tratamento de Erros

Como o projeto é exclusivamente front-end sem banco de dados, os dados são simulados via JavaScript. A lógica de negócio (bloqueio por inadimplência, cancelamento com 3 dias de antecedência) é implementada com dados mockados. Em versões futuras recomenda-se backend com loaders/spinners para requisições e timeout de requisição com mensagem amigável.

---

### 5. Relato do Processo e Engenharia de Prompt

#### 5.1 Repositório de Prompts

**Prompt 1 — Campos do Formulário de Cadastro de Aluno**
> _"Quais informações são necessárias para cadastrar um aluno em uma escola de pilotagem civil no Brasil? Considere dados pessoais, documentação aeronáutica e informações de contato de emergência."_

✅ **Resultado:** Nome Completo, CPF, RG, Data de Nascimento, E-mail, Telefone, Endereço, CMA, Experiência Anterior.
⚠️ **Ajuste:** A IA sugeriu 'número de passaporte', inaplicável ao contexto nacional — removido manualmente.

---

**Prompt 2 — Campos do Formulário de Cadastro de Professor/Instrutor**
> _"Quais informações são necessárias para cadastrar um instrutor de voo em um aeroclube no Brasil? Considere habilitações, horas de voo e especializações."_

✅ **Resultado:** Nome, CPF, RG, Número de Licença, Categoria da Licença, Horas de Voo Totais, Anos de Experiência, Especializações.
✅ **Ajuste:** Nenhum — saída diretamente aplicável ao design da tela.

---

**Prompt 3 — Estrutura da Agenda de Agendamentos**
> _"Em uma agenda de marcação de horários para escola de pilotagem e aluguel de aeronaves, quais tipos de serviço e campos adicionais devem estar disponíveis para garantir um agendamento completo e sem conflitos?"_

✅ **Resultado:** Tipos de serviço (Aula Teórica, Aula Prática/Voo, Simulador, Aluguel de Aeronave) e legenda de status de horários.
⚠️ **Ajuste:** Campo de duração da aula sugerido pela IA foi omitido para manter o formulário mais simples.

---

**Prompt 4 — Geração de Imagem para Telas em Construção**
> _"Gere uma imagem de página em construção com temática de pilotagem de aviões, estilo ilustração vetorial, cores azul e branco, mostrando mecânicos trabalhando em um avião."_

✅ **Resultado:** Imagem utilizada em todas as telas marcadas como 'Em construção'.
⚠️ **Ajuste:** Necessárias 3 iterações até obter o resultado visual adequado.

#### 5.2 Relato de IA · Uso de IA no Código do Site

> Não foi utilizada Inteligência Artificial para a produção do código do site. Todo o código front-end (HTML, CSS e JavaScript) foi desenvolvido manualmente pela equipe do Squad 43. As ferramentas de IA foram empregadas apenas como apoio na validação de requisitos, na definição de campos de formulários e na geração de imagens temáticas para as telas em construção.

---

### 6. Análise de Custos e Viabilidade

#### 6.1 Custos de Desenvolvimento

| Descrição | Quantidade |
|-----------|------------|
| Número de integrantes | 11 |
| Horas trabalhadas por integrante | 20h |
| Total de horas do projeto | 220h |
| Valor/hora estimado | R$ 20,00 |

| Categoria | Valor |
|-----------|-------|
| Mão de obra | R$ 4.400,00 |
| Energia elétrica e internet | R$ 300,00 |
| **Total Geral Estimado** | **R$ 4.700,00** |

#### 6.2 Análise de Viabilidade

| Dimensão | Avaliação |
|----------|-----------|
| Técnica | ✅ Viável — tecnologias amplamente difundidas e estrutura modular para futuras integrações |
| Financeira | ✅ Viável — custo baixo com ferramentas gratuitas e mão de obra acadêmica |
| Operacional | ✅ Viável — interface intuitiva com perfis de acesso distintos |
| Prazo | ✅ Viável — ~12 semanas contemplando todas as etapas |

#### 6.3 Cronograma Estimado

| Etapa | Prazo |
|-------|-------|
| Levantamento de requisitos | 2 semanas |
| Protótipos e design | 2 semanas |
| Desenvolvimento front-end | 5 semanas |
| Testes e ajustes | 2 semanas |
| Documentação final | 1 semana |

---

### 7. Evoluções Futuras

- [ ] Conclusão dos módulos em construção: Financeiro, Documentos, Voos e Extrato
- [ ] Integração com banco de dados para persistência das informações
- [ ] Implementação de backend e APIs
- [ ] Recursos de IA: análise preditiva de demanda e manutenção preventiva de aeronaves
- [ ] Autenticação real com controle de sessão
- [ ] Notificações automáticas por e-mail/SMS

---

## 📽️ Demonstrações

| Recurso | Link |
|---------|------|
| 🌐 Protótipo funcional | [asasabertas-aero-clube.vercel.app](https://asasabertas-aero-clube.vercel.app/) |
| 🎬 Vídeo do protótipo | [Assista aqui](https://lnkd.in/dZ5u4z6Z) |
| 📊 Pitch Deck | [Assista ao Pitch](https://lnkd.in/dhV3dBw7) |
| 💻 Repositório do Aplicativo | [github.com/p3drolucassp/AsasabertasAeroClube](https://github.com/p3drolucassp/AsasabertasAeroClube) |
| 📖 README do Projeto | [github.com/thaynabds/AeroclubAsasAbertas](https://github.com/thaynabds/AeroclubAsasAbertas) |

---

## 📄 Licença

**Copyright © 2026, Membros do Squad 43 do Rise Up — Sistema de Gestão do Aeroclube Asas Abertas 🛩️. Todos os direitos reservados.** 🔒

**Obrigado pela visita! ⭐ Não se esqueça de dar uma estrela ao projeto se gostou!** 🌟

---

## 📞 Contato

<div align="center">

  <a href="https://br.linkedin.com/in/thaynabds" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
  <a href="https://www.instagram.com/thaynabdstec/" target="_blank">
    <img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" />
  </a>

</div>

📧 **Email:** [thaynabdstec@gmail.com](mailto:thaynabdstec@gmail.com)  
📱 **Phone:** +55 (81) 97912-6121

---

<div align="center">

### 👤 Thayná Batista da Silva
**Scrum Master • Product Designer • Requirements Analyst** 💼  
Faculdade Senac Recife-PE | Análise e Desenvolvimento de Sistemas 🎓

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://br.linkedin.com/in/thaynabds)
[![Instagram](https://img.shields.io/badge/Instagram-Follow-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/thaynabdstec/)

**Copyright © 2026, Members of Squad 43 of Rise Up — Asas Abertas Aeroclub Management System 🛩️. All rights reserved.**

</div>
