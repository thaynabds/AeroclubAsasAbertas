function configurarLogoutCard() {
  const logoutCard = document.getElementById("logoutCard");

  if (logoutCard) {
    logoutCard.onclick = () => {
      window.location.href = "/index.html";
    };
  }
}

function carregarNomeUsuario() {
  const emailLogado = localStorage.getItem("usuarioLogado");
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuario = usuarios.find(u => u.email === emailLogado);

  if (!usuario) return;

  const nomeCompleto = usuario.nomeCompleto || "Usuário";

  const nomeUsuario = document.getElementById("nomeUsuario");
  const saudacaoUsuario = document.getElementById("saudacaoUsuario");

  if (nomeUsuario) {
    nomeUsuario.innerText = nomeCompleto;
  }

  if (saudacaoUsuario) {
    saudacaoUsuario.innerText = `Olá, ${usuario.nome}!`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  carregarNomeUsuario();
});

// ===============================
// AGUARDA CARREGAR A PÁGINA
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  // DROPDOWN MENUs
  document.querySelectorAll(".menu-title").forEach(title => {
    title.addEventListener("click", function () {
      const parent = this.parentElement;

      document.querySelectorAll(".dropdown").forEach(item => {
        if (item !== parent) {
          item.classList.remove("active");
        }
      });

      parent.classList.toggle("active");
    });
  });

  // LOGOUT
  function logout() {
    window.location.href = "/index.html";
  }

  const logoutMenu = document.getElementById("logoutMenu");
  if (logoutMenu) {
    logoutMenu.addEventListener("click", logout);
  }

  const logoutCard = document.getElementById("logoutCard");
  if (logoutCard) {
    logoutCard.addEventListener("click", logout);
  }

  // DASHBOARD ORIGINAL
  const conteudo = document.getElementById("conteudo");
  const dashboard = conteudo.innerHTML;

  atualizarDashboard();
  configurarCardsInicio();

  // MENU CLICK
  document.querySelectorAll(".menu-item").forEach(item => {
    item.addEventListener("click", () => {
      const texto = item.querySelector("span")?.innerText.trim();

      // INÍCIO
      if (texto === "Início") {
        conteudo.innerHTML = dashboard;

        setTimeout(() => {
          configurarLogoutCard();
        }, 0);

        return;
      }

      // AGENDA
      if (texto === "Agenda") {
        abrirAgenda();
        return;
      }

      // OUTROS
      carregarConstrucao();
    });
  });

  // SUBMENUS
  document.querySelectorAll(".submenu li").forEach(item => {
    item.addEventListener("click", () => {
      const texto = item.querySelector("span")?.innerText.trim();

      // DIÁRIO DO INSTRUTOR
      if (texto === "Diário do Instrutor") {
        abrirDiarioInstrutor();
        return;
      }

      // OUTROS SUBMENUS
      carregarConstrucao();
    });
  });

});


// ===============================
// ABRIR AGENDA
// ===============================
function abrirAgenda() {
  fetch("pages/pagedashboard/agenda1.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("conteudo").innerHTML = data;

      configurarAgenda();
      carregarAlunos();
      limparAulasAntigas();
      verificarAgenda();
    })
    .catch(error => {
      console.error("Erro ao carregar agenda:", error);
    });
}


// ===============================
// ABRIR DIÁRIO DO INSTRUTOR
// ===============================
function abrirDiarioInstrutor() {
  fetch("pages/pagedashboard/diariodoinstrutor.html")
    .then(response => response.text())
    .then(data => {
      const conteudo = document.getElementById("conteudo");
      conteudo.innerHTML = data;

      // remove script antigo se existir
      const scriptAntigo = document.getElementById("scriptDiario");
      if (scriptAntigo) {
        scriptAntigo.remove();
      }

      // adiciona novamente o JS do diário
      const novoScript = document.createElement("script");
      novoScript.src = "js/diariodoinstrutor.js";
      novoScript.id = "scriptDiario";

      novoScript.onload = () => {
        if (typeof carregarDiarioInstrutor === "function") {
          carregarDiarioInstrutor();
        }
      };

      document.body.appendChild(novoScript);
    })
    .catch(error => {
      console.error("Erro ao carregar Diário do Instrutor:", error);
    });
}


// ===============================
// TELA EM CONSTRUÇÃO
// ===============================
function carregarConstrucao() {
  fetch("pages/pagedashboard/construcao.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("conteudo").innerHTML = html;
    });
}


// ===============================
// CONFIGURAR DATA
// ===============================
function configurarAgenda() {
  const data = document.getElementById("dataAgendamento");

  if (data) {
    const hoje = new Date().toISOString().split("T")[0];
    data.setAttribute("min", hoje);
  }
}
// ===============================
// LOCAL STORAGE
// ===============================
let agenda = JSON.parse(localStorage.getItem("agenda")) || {};

function salvarAgenda() {
  localStorage.setItem("agenda", JSON.stringify(agenda));
}

// ===============================
// CARREGAR ALUNOS
// ===============================
function carregarAlunos() {
  const select = document.getElementById("alunoSelecionado");

  if (!select) return;

  select.innerHTML = `
    <option value="">Selecione o aluno...</option>
  `;

  let alunos = [
    {
      nomeCompleto: "Pedro Lucas",
      email: "pedrinholira007@gmail.com",
      tipo: "aluno"
    }
  ];

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  usuarios.forEach(user => {
    // SOMENTE ALUNOS
    if (user.tipo === "aluno") {
      alunos.push({
        nomeCompleto: user.nomeCompleto || `${user.nome} ${user.sobrenome || ""}`.trim(),
        email: user.email,
        tipo: user.tipo
      });
    }
  });

  let usados = [];

  alunos.forEach(aluno => {
    if (!usados.includes(aluno.email)) {
      usados.push(aluno.email);

      const option = document.createElement("option");
      option.value = aluno.nomeCompleto;
      option.textContent = aluno.nomeCompleto;

      select.appendChild(option);
    }
  });
}

// ===============================
// LIMPAR AULAS ANTIGAS
// ===============================
function limparAulasAntigas() {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  Object.keys(agenda).forEach(data => {
    const dataAgenda = new Date(data + "T00:00:00");

    if (dataAgenda < hoje) {
      delete agenda[data];
    }
  });

  salvarAgenda();
}

// ===============================
// HORÁRIOS
// ===============================
const horarios = [];

for (let h = 7; h <= 20; h++) {
  horarios.push(`${String(h).padStart(2, "0")}:00`);
}

const ALMOCO = ["12:00"];

// ===============================
// BLOCO DE 3 HORAS
// ===============================
function getBlocoAula(hora) {
  const idx = horarios.indexOf(hora);

  if (idx >= horarios.length - 2) {
    return [
      horarios[idx],
      horarios[idx - 1],
      horarios[idx - 2]
    ];
  }

  return [
    horarios[idx],
    horarios[idx + 1],
    horarios[idx + 2]
  ];
}

// ===============================
// FORMATAR DATA
// ===============================
function formatarData(data) {
  const d = new Date(data + "T00:00:00");

  const dia = String(d.getDate()).padStart(2, "0");
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const ano = d.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

// ===============================
// VERIFICAR AGENDA
// ===============================
function verificarAgenda() {
  const data = document.getElementById("dataAgendamento")?.value;
  const tipoSelecionado = document.getElementById("tipoServico")?.value;
  const alunoSelecionado = document.getElementById("alunoSelecionado")?.value;

  const container = document.getElementById("cardsHorarios");
  const titulo = document.getElementById("tituloData");
  const qtd = document.querySelector(".qtd");

  if (!container || !titulo || !qtd) return;

  // nome do instrutor realmente logado
  const nomeInstrutor =
    localStorage.getItem("nomeCompletoUsuario") || "Instrutor";

  container.innerHTML = "";

  if (!data || !tipoSelecionado) {
    titulo.innerText = "Selecione a data e o tipo de aula";
    qtd.innerText = "";
    return;
  }

  titulo.innerText = `Agenda do Instrutor em ${formatarData(data)}`;

  const dados = agenda[data] || { aulas: [] };

  let disponiveis = 0;

  horarios.forEach(hora => {

    let classe = "disponivel";
    let texto = "Disponível";
    let tag = "";
    let infoTexto = "";
    let infoExtra = "";

    // manutenção
    if (hora === "11:00") {
      classe = "manutencao";
      texto = "Aeronave em manutenção";
    }

    // almoço
    if (ALMOCO.includes(hora)) {
      classe = "almoco";
      texto = "Horário de almoço";
    }

    // verificar aula existente
    const aulaExistente = dados.aulas.find(a => {
      return (
        getBlocoAula(a.hora).includes(hora) &&
        a.tipo === tipoSelecionado
      );
    });

    // =====================================
    // AULA EXISTENTE
    // =====================================
    if (aulaExistente) {

      // só pode gerenciar se o filtro for o mesmo aluno
      const podeGerenciar =
        alunoSelecionado &&
        aulaExistente.aluno === alunoSelecionado;

      classe = "indisponivel";
      texto = "Em aula";

      tag = aulaExistente.status || "Agendado";

      infoTexto = `
        Aluno: ${aulaExistente.aluno || "Aluno"} <br>
        ${aulaExistente.local}
      `;

      // solicitação cancelamento
      if (
        aulaExistente.statusCancelamento === "pendente" &&
        podeGerenciar
      ) {

        infoExtra += `
          <div class="acoes">

            <button onclick="aprovarCancelamento('${data}', '${aulaExistente.hora}')">
              Aprovar Cancelamento
            </button>

            <button onclick="recusarCancelamento('${data}', '${aulaExistente.hora}')">
              Recusar
            </button>

          </div>
        `;
      }

      // cancelar aula
      if (podeGerenciar) {

        infoExtra += `
          <div class="acoes">

            <button onclick="cancelarAulaDireto('${data}', '${aulaExistente.hora}')">
              Cancelar Aula
            </button>

          </div>
        `;
      }

      // status final
      if (!aulaExistente.situacaoFinal && podeGerenciar) {

        infoExtra += `
          <div class="acoes">

            <button onclick="marcarConcluida('${data}', '${aulaExistente.hora}')">
              Aula Concluída
            </button>

            <button onclick="marcarFalta('${data}', '${aulaExistente.hora}')">
              Não Compareceu
            </button>

          </div>
        `;

      } else if (aulaExistente.situacaoFinal && podeGerenciar) {

        infoExtra += `
          <div class="situacao-final">

            Status Final:
            <strong>${aulaExistente.situacaoFinal}</strong>

          </div>
        `;
      }
    }

    // disponível
    if (classe === "disponivel") {

      disponiveis++;

      infoTexto = `
        Instrutor: ${nomeInstrutor} <br>
        Disponível para agendamento
      `;
    }

    // manutenção
    if (classe === "manutencao") {
      infoTexto = "";
    }

    // criar card
    const card = document.createElement("div");

    card.className = `card-horario ${classe}`;

    card.innerHTML = `
      <div class="topo">

        <div>
          <span class="hora">${hora}</span>
          <span class="status">${texto}</span>
        </div>

        ${tag ? `<span class="tag-agendado">${tag}</span>` : ""}

      </div>

      ${infoTexto ? `<div class="info">${infoTexto}</div>` : ""}

      ${infoExtra}
    `;

    // =====================================
    // MARCAR AULA
    // =====================================
    if (classe === "disponivel") {

      card.style.cursor = "pointer";

      card.onclick = () => {

        // selecionar aluno
        if (
          tipoSelecionado !== "Aula Teórica" &&
          !alunoSelecionado
        ) {
          alert("Selecione um aluno.");
          return;
        }

        // impedir MESMO aluno ter 2 aulas iguais no dia
        const alunoJaTemAula = dados.aulas.some(a => {

          return (
            a.aluno === alunoSelecionado &&
            a.tipo === tipoSelecionado
          );

        });

        if (
          tipoSelecionado !== "Aula Teórica" &&
          alunoJaTemAula
        ) {

          alert("Este aluno já possui uma aula deste tipo neste dia.");

          return;
        }

        let localEscolhido;

        if (tipoSelecionado.includes("Prática")) {

          localEscolhido =
            "Hangar " + Math.floor(Math.random() * 3 + 1);

        } else {

          localEscolhido =
            "Sala " + Math.floor(Math.random() * 3 + 1);
        }

        // salvar aula
        dados.aulas.push({

          hora: hora,

          local: localEscolhido,

          aluno:
            tipoSelecionado === "Aula Teórica"
              ? "Turma"
              : alunoSelecionado,

          instrutor: nomeInstrutor,

          tipo: tipoSelecionado,

          status: "Agendado",

          statusCancelamento: null,

          situacaoFinal: null,

          diarioPreenchido: false,

          nota: "",

          conteudo: "",

          comoFoi: "",

          observacoes: ""

        });

        agenda[data] = dados;

        salvarAgenda();

        verificarAgenda();

        atualizarDashboard();

        alert("Aula marcada com sucesso.");
      };
    }

    container.appendChild(card);

  });

  qtd.innerText = `${disponiveis} horários disponíveis`;
}

// ===============================
// APROVAR CANCELAMENTO
// ===============================
function aprovarCancelamento(data, hora) {
  const dados = agenda[data];

  dados.aulas = dados.aulas.filter(a => a.hora !== hora);

  if (dados.aulas.length === 0) {
    delete agenda[data];
  }

  salvarAgenda();
  verificarAgenda();
  atualizarDashboard();

  alert("Cancelamento aprovado.");
}

// ===============================
// RECUSAR CANCELAMENTO
// ===============================
function recusarCancelamento(data, hora) {
  const aula = agenda[data].aulas.find(a => a.hora === hora);

  if (aula) {
    aula.statusCancelamento = null;
  }

  salvarAgenda();
  verificarAgenda();

  alert("Solicitação recusada.");
}

// ===============================
// CANCELAR DIRETO
// ===============================
function cancelarAulaDireto(data, hora) {
  const dados = agenda[data];

  dados.aulas = dados.aulas.filter(a => a.hora !== hora);

  if (dados.aulas.length === 0) {
    delete agenda[data];
  }

  salvarAgenda();
  verificarAgenda();
  atualizarDashboard();

  alert("Aula cancelada pelo instrutor.");
}

// ===============================
// AULA CONCLUÍDA
// ===============================
function marcarConcluida(data, hora) {
  if (!agenda[data]) {
    alert("Data não encontrada.");
    return;
  }

  const aula = agenda[data].aulas.find(a => {
    return a.hora === hora;
  });

  if (!aula) {
    alert("Aula não encontrada.");
    return;
  }

  // marca como concluída
  aula.situacaoFinal = "Aula Concluída";

  // dados extras para aparecer no Diário
  aula.statusDiario = "Aula Realizada";
  aula.presenca = "Presente";
  aula.nota = aula.nota || "";
  aula.conteudo = aula.conteudo || "";
  aula.comoFoi = aula.comoFoi || "";
  aula.observacoes = aula.observacoes || "";

  // salvar corretamente
  agenda[data].aulas = agenda[data].aulas;
  localStorage.setItem("agenda", JSON.stringify(agenda));

  verificarAgenda();
  atualizarDashboard();

  alert("Aula concluída com sucesso.");
}

// ===============================
// NÃO COMPARECEU
// ===============================
function marcarFalta(data, hora) {
  const aula = agenda[data].aulas.find(a => a.hora === hora);

  if (aula) {
    aula.situacaoFinal = "Aluno não compareceu";
  }

  salvarAgenda();
  verificarAgenda();

  alert("Falta registrada.");
}

// ===============================
// CARDS DA TELA INICIAL
// ===============================
function configurarCardsInicio() {
  document.addEventListener("click", function (e) {
    const card = e.target.closest(".cards .card");
    if (!card) return;

    const span = card.querySelector("span");
    if (!span) return;

    const texto = span.innerText.trim();

    if (
      texto === "Treinamentos" ||
      texto === "Voos" ||
      texto === "Documentos" ||
      texto === "Financeiro" ||
      texto === "Extrato"
    ) {
      carregarConstrucao();
    }
  });
}

// chama só uma vez
document.addEventListener("DOMContentLoaded", configurarCardsInicio);
// ===============================
// ===============================
// ATUALIZAR DASHBOARD INICIAL
// ===============================
function atualizarDashboard() {
  let proximaAula = null;
  let totalVoos = 12;

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  Object.keys(agenda)
    .sort()
    .forEach(data => {
      const dados = agenda[data];
      const dataAula = new Date(data + "T00:00:00");

      dados.aulas.forEach(aula => {
        // pegar apenas próxima aula futura ou de hoje
        if (
          !proximaAula &&
          aula.status === "Agendado" &&
          dataAula >= hoje
        ) {
          proximaAula = {
            data,
            hora: aula.hora,
            local: aula.local
          };
        }

        // contar voo concluído
        if (aula.situacaoFinal === "Aula Concluída") {
          totalVoos++;
        }
      });
    });

  // atualizar "Voos Este Mês"
  const stats = document.querySelectorAll(".stat strong");

  if (stats[0]) {
    stats[0].innerText = totalVoos;
  }

  // atualizar card Próximo Voo
  const flightInfo = document.querySelector(".flight-info");

  if (!flightInfo) return;

  if (proximaAula) {
    flightInfo.innerHTML = `
      <strong>Próximo Voo Agendado</strong>
      <p>${formatarData(proximaAula.data)} às ${proximaAula.hora}</p>
      <p>${proximaAula.local}</p>
    `;
  } else {
    flightInfo.innerHTML = `
      <strong>Próximo Voo Agendado</strong>
      <p>Nenhuma aula marcada no momento</p>
      <p>Aguardando novo agendamento</p>
    `;
  }
}

// ===============================
// ATUALIZAR DASHBOARD AUTOMÁTICO
// ===============================
function atualizarDashboard() {
  let proximaAula = null;
  let totalVoos = 12;

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  Object.keys(agenda)
    .sort()
    .forEach(data => {
      const dados = agenda[data];
      const dataAula = new Date(data + "T00:00:00");

      dados.aulas.forEach(aula => {
        // próxima aula agendada
        if (
          !proximaAula &&
          aula.status === "Agendado" &&
          dataAula >= hoje
        ) {
          proximaAula = {
            data,
            hora: aula.hora,
            local: aula.local
          };
        }

        // contar aulas concluídas
        if (aula.situacaoFinal === "Aula Concluída") {
          totalVoos++;
        }
      });
    });

  // atualizar card "Voos Este Mês"
  const stats = document.querySelectorAll(".stat strong");

  if (stats[0]) {
    stats[0].innerText = totalVoos;
  }

  // atualizar card "Próximo Voo Agendado"
  const flightInfo = document.querySelector(".flight-info");

  if (!flightInfo) return;

  if (proximaAula) {
    flightInfo.innerHTML = `
      <strong>Próximo Voo Agendado</strong>
      <p>${formatarData(proximaAula.data)} às ${proximaAula.hora}</p>
      <p>${proximaAula.local}</p>
    `;
  } else {
    flightInfo.innerHTML = `
      <strong>Próximo Voo Agendado</strong>
      <p>Nenhuma aula marcada no momento</p>
      <p>Aguardando novo agendamento</p>
    `;
  }
}

// ===============================
// ATUALIZA AUTOMATICAMENTE
// ===============================
window.addEventListener("storage", () => {
  atualizarDashboard();
});

setInterval(() => {
  atualizarDashboard();
}, 1000);

document.addEventListener("DOMContentLoaded", () => {
  const nomeCompleto =
    localStorage.getItem("nomeCompletoUsuario") || "Instrutor";

  const nome =
    localStorage.getItem("nomeUsuario") || "Instrutor";

  const sidebar = document.getElementById("nomeInstrutorSidebar");
  const saudacao = document.getElementById("saudacaoInstrutor");

  if (sidebar) {
    sidebar.textContent = nomeCompleto;
  }

  if (saudacao) {
    saudacao.textContent = `Olá, ${nome}!`;
  }
});