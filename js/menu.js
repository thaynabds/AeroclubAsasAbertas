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

  const nomeCompleto = usuario.nomeCompleto || "Aluno";

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

// AGUARDA CARREGAR A PÁGINA
document.addEventListener("DOMContentLoaded", () => {

  // DROPDOWN MENU
  document.querySelectorAll('.menu-title').forEach(title => {
    title.addEventListener('click', function () {
      const parent = this.parentElement;

      document.querySelectorAll('.dropdown').forEach(item => {
        if (item !== parent) item.classList.remove('active');
      });

      parent.classList.toggle('active');
    });
  });


  // FUNÇÃO GLOBAL DE LOGOUT
  function logout() {
    window.location.href = "/index.html";
  }


  // BOTÃO SAIR MENU
  const logoutMenu = document.getElementById("logoutMenu");

  if (logoutMenu) {
    logoutMenu.addEventListener("click", logout);
  }


  // BOTÃO SAIR CARD
  const logoutCard = document.getElementById("logoutCard");

  if (logoutCard) {
    logoutCard.addEventListener("click", logout);
  }


  // SALVAR DASHBOARD ORIGINAL
  const conteudo = document.getElementById('conteudo');
  const dashboard = conteudo.innerHTML;

  atualizarDashboardAluno();


  // MENU CLIQUE
  document.querySelectorAll(".menu-item").forEach(item => {
    item.addEventListener("click", () => {

      const texto = item.querySelector("span")?.innerText.trim();

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


  // SUBMENU CLIQUE
  document.querySelectorAll(".submenu li").forEach(item => {
    item.addEventListener("click", () => {
      const texto = item.querySelector("span")?.innerText.trim();

      // DIÁRIO DO ALUNO
      if (texto === "Diário do Aluno") {
        abrirDiarioAluno();
        return;
      }

      carregarConstrucao();
    });
  });


});


// ABRIR AGENDA
function abrirAgenda() {
  fetch("pages/pagedashboard/agenda.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("conteudo").innerHTML = data;
      configurarAgenda();
    })
    .catch(error => console.error("Erro ao carregar agenda:", error));
}


// CARREGAR TELA CONSTRUÇÃO
function carregarConstrucao() {
  fetch("pages/pagedashboard/construcao.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById('conteudo').innerHTML = html;
    });
}


// CONFIGURAR AGENDA
function configurarAgenda() {

  const data = document.getElementById("dataAgendamento");

  if (data) {
    const hoje = new Date().toISOString().split("T")[0];
    data.setAttribute("min", hoje);
  }

}


// VERIFICAR AGENDA
function verificarAgenda() {
  const data = document.getElementById("dataAgendamento").value;
  const hora = document.getElementById("horaAgendamento").value;
  const tipo = document.getElementById("tipoServico").value;

  const resultado = document.getElementById("resultadoAgenda");

  if (!data || !tipo) {
    resultado.innerHTML = "⚠ Preencha os campos obrigatórios";
    resultado.style.color = "red";
    return;
  }

  resultado.innerHTML = `
    ✅ Horário disponível<br>
    📅 Data: ${data}<br>
    ⏰ Horário: ${hora || "Todos disponíveis"}<br>
    📘 Serviço: ${tipo}
  `;

  resultado.style.color = "green";
}

// horario card da aula
// ===============================
// LOCAL STORAGE
// ===============================
let agenda = JSON.parse(localStorage.getItem("agenda")) || {};

function salvarAgenda() {
  localStorage.setItem("agenda", JSON.stringify(agenda));
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
// VERIFICAR AGENDA (ALUNO)
// ===============================
function verificarAgenda() {
  const data = document.getElementById("dataAgendamento")?.value;
  const tipoSelecionado = document.getElementById("tipoServico")?.value;

  const container = document.getElementById("cardsHorarios");
  const titulo = document.getElementById("tituloData");
  const qtd = document.querySelector(".qtd");

  if (!container || !titulo || !qtd) return;

  container.innerHTML = "";

  if (!data || !tipoSelecionado) {
    titulo.innerText = "Selecione a data e o tipo de aula";
    qtd.innerText = "";
    return;
  }

  titulo.innerText = `Horários disponíveis em ${formatarData(data)}`;

  const dados = agenda[data] || { aulas: [] };
  let disponiveis = 0;

  // =====================================
  // AULA TEÓRICA → ALUNO NÃO MARCA
  // =====================================
  if (tipoSelecionado === "Aula Teórica") {
    const aulasTeoricas = dados.aulas.filter(a => a.tipo === "Aula Teórica");

    // NÃO EXISTE AULA → MOSTRA CARD DE AVISO
    if (aulasTeoricas.length === 0) {
      container.innerHTML = `
        <div class="card-horario disponivel">
          <div class="topo">
            <div>
              <span class="status">
                Horário de aulas disponível em breve
              </span>
            </div>
          </div>

          <div class="info">
            O instrutor ainda não marcou nenhuma aula teórica.
          </div>
        </div>
      `;

      qtd.innerText = "";
      return;
    }

    // EXISTE AULA → APENAS VISUALIZA
    aulasTeoricas.forEach(aula => {
      const bloco = getBlocoAula(aula.hora);

      bloco.forEach(hora => {
        const card = document.createElement("div");
        card.className = "card-horario indisponivel";

        card.innerHTML = `
          <div class="topo">
            <div>
              <span class="hora">${hora}</span>
              <span class="status">Aula Teórica Agendada</span>
            </div>

            <span class="tag-agendado">
              ${aula.status || "Agendado"}
            </span>
          </div>

          <div class="info">
            Instrutor: Aleatório <br>
            ${aula.local}
          </div>
        `;

        container.appendChild(card);
      });
    });

    qtd.innerText = "Visualização da aula teórica";
    return;
  }

  // =====================================
  // PRÁTICA / ALUGUEL → FUNCIONA NORMAL
  // =====================================
  horarios.forEach(hora => {
    let classe = "disponivel";
    let texto = "Disponível";
    let tag = "";
    let local = "";
    let infoTexto = "";

    if (hora === "11:00") {
      classe = "manutencao";
      texto = "Aeronave em manutenção";
    }

    if (ALMOCO.includes(hora)) {
      classe = "almoco";
      texto = "Horário de almoço";
    }

    const aulaExistente = dados.aulas.find(a => {
      return (
        getBlocoAula(a.hora).includes(hora) &&
        a.tipo === tipoSelecionado
      );
    });

    if (aulaExistente) {
      classe = "indisponivel";
      texto = "Em aula";
      tag = aulaExistente.status || "Agendado";
      local = aulaExistente.local;
    }

    if (dados.aulas.some(a => a.tipo === tipoSelecionado) && classe === "disponivel") {
      classe = "indisponivel";
      texto = "Limite de 1 aula atingido";
    }

    if (classe === "disponivel") {
      disponiveis++;
      infoTexto = `Instrutor: Aleatório  <br>Disponível para agendamento`;
    } else if (tag) {
      infoTexto = `Instrutor: Aleatório <br>${local}`;
    }

    const card = document.createElement("div");
    card.className = `card-horario ${classe}`;

    card.innerHTML = `
      <div class="topo">
        <div>
          <span class="hora">${hora}</span>
          <span class="status">${texto}</span>
        </div>

        ${tag ? `
          <div class="acoes">
            <span class="tag-agendado">${tag}</span>

            ${aulaExistente?.statusCancelamento === "pendente"
          ? `<button class="btn-cancelar" disabled>Solicitação enviada</button>`
          : `<button class="btn-cancelar">Solicitar Cancelamento</button>`
        }
          </div>
        ` : ""}
      </div>

      ${infoTexto ? `<div class="info">${infoTexto}</div>` : ""}
    `;

    // MARCAR AULA
    if (classe === "disponivel") {
      card.style.cursor = "pointer";

      card.onclick = () => {
        if (dados.aulas.some(a => a.tipo === tipoSelecionado)) {
          alert("Você já possui uma aula deste tipo neste dia.");
          return;
        }

        let localEscolhido =
          tipoSelecionado.includes("Prática")
            ? "Hangar " + Math.floor(Math.random() * 3 + 1)
            : "Sala " + Math.floor(Math.random() * 3 + 1);

        dados.aulas.push({
          hora,
          local: localEscolhido,
          tipo: tipoSelecionado,
          status: "Agendado",
          statusCancelamento: null,
          situacaoFinal: null,

          // aluno correto
          aluno: localStorage.getItem("nomeCompletoUsuario") || "Aluno",

          // instrutor correto
          instrutor: "Instrutor"

        });

        agenda[data] = dados;
        salvarAgenda();
        verificarAgenda();

        alert("Aula marcada com sucesso.");
      };
    }

    // SOLICITAR CANCELAMENTO
    const btn = card.querySelector(".btn-cancelar");

    if (btn && !btn.disabled) {
      btn.onclick = (e) => {
        e.stopPropagation();

        aulaExistente.statusCancelamento = "pendente";

        salvarAgenda();
        verificarAgenda();

        alert("Solicitação enviada ao instrutor.");
      };
    }

    container.appendChild(card);
  });

  qtd.innerText = `${disponiveis} horários disponíveis`;
}

// ===============================
// INICIAR
// ===============================
window.onload = () => {
  verificarAgenda();
};

// ===============================
// DASHBOARD DO ALUNO AUTOMÁTICO
// ===============================
function atualizarDashboardAluno() {
  let proximaAula = null;
  let totalVoos = 12;

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  // aluno realmente logado
  const nomeAlunoLogado =
    (localStorage.getItem("nomeCompletoUsuario") || "")
      .toLowerCase()
      .trim();

  Object.keys(agenda)
    .sort()
    .forEach(data => {
      const dados = agenda[data];
      const dataAula = new Date(data + "T00:00:00");

      dados.aulas.forEach(aula => {
        const nomeAlunoAula =
          (aula.aluno || "")
            .toLowerCase()
            .trim();

        // pega somente a aula do aluno logado
        if (
          !proximaAula &&
          aula.status === "Agendado" &&
          dataAula >= hoje &&
          nomeAlunoAula === nomeAlunoLogado
        ) {
          proximaAula = {
            data,
            hora: aula.hora,
            local: aula.local
          };
        }

        // conta somente voos concluídos do aluno logado
        if (
          aula.situacaoFinal === "Aula Concluída" &&
          nomeAlunoAula === nomeAlunoLogado
        ) {
          totalVoos++;
        }
      });
    });

  // atualizar "Voos Este Mês"
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
  atualizarDashboardAluno();
});

setInterval(() => {
  atualizarDashboardAluno();
}, 1000);

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
// ABRIR DIÁRIO DO ALUNO
// ===============================
function abrirDiarioAluno() {
  fetch("pages/pagedashboard/diariodoaluno.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("conteudo").innerHTML = data;

      if (typeof carregarDiarioAluno === "function") {
        carregarDiarioAluno();
      }
    })
    .catch(error => {
      console.error("Erro ao carregar Diário do Aluno:", error);
    });
}