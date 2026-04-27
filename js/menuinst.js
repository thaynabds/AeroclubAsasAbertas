// ===============================
// AGUARDA CARREGAR A PÁGINA
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  // DROPDOWN MENU
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

  // MENU CLICK
  document.querySelectorAll(".menu-item").forEach(item => {
    item.addEventListener("click", () => {
      const texto = item.querySelector("span")?.innerText.trim();

      if (texto === "Início") {
        conteudo.innerHTML = dashboard;
        return;
      }

      if (texto === "Agenda") {
        abrirAgenda();
        return;
      }

      carregarConstrucao();
    });
  });

  // SUBMENUS
  document.querySelectorAll(".submenu li").forEach(item => {
    item.addEventListener("click", () => {
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

  select.innerHTML = `<option value="">Selecione o aluno...</option>`;

  let alunos = [
    {
      nome: "Pedro Lucas",
      email: "pedrinholira007@gmail.com"
    }
  ];

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  usuarios.forEach(user => {
    alunos.push({
      nome: user.nome,
      email: user.email
    });
  });

  let usados = [];

  alunos.forEach(aluno => {
    if (!usados.includes(aluno.email)) {
      usados.push(aluno.email);

      const option = document.createElement("option");
      option.value = aluno.nome;
      option.textContent = aluno.nome;
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
      return getBlocoAula(a.hora).includes(hora);
    });

    if (aulaExistente) {
      classe = "indisponivel";
      texto = "Em aula";
      tag = aulaExistente.status || "Agendado";

      infoTexto = `
        Aluno: ${aulaExistente.aluno || "Turma"} <br>
        ${aulaExistente.local}
      `;

      // solicitação de cancelamento do aluno
      if (aulaExistente.statusCancelamento === "pendente") {
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

      // cancelamento direto pelo instrutor
      infoExtra += `
        <div class="acoes">
          <button onclick="cancelarAulaDireto('${data}', '${aulaExistente.hora}')">
            Cancelar Aula
          </button>
        </div>
      `;

      // status final
      if (!aulaExistente.situacaoFinal) {
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
      } else {
        infoExtra += `
          <div class="situacao-final">
            Status Final:
            <strong>${aulaExistente.situacaoFinal}</strong>
          </div>
        `;
      }
    }

    if (classe === "disponivel") {
      disponiveis++;
      infoTexto = `Disponível para agendamento`;
    }

    if (classe === "manutencao") {
      infoTexto = "";
    }

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

    // marcar aula
    if (classe === "disponivel") {
      card.style.cursor = "pointer";

      card.onclick = () => {
        if (
          tipoSelecionado !== "Aula Teórica" &&
          dados.aulas.some(a => a.tipo === tipoSelecionado)
        ) {
          alert("Já existe uma aula deste tipo agendada neste dia.");
          return;
        }

        if (
          tipoSelecionado !== "Aula Teórica" &&
          !alunoSelecionado
        ) {
          alert("Selecione um aluno.");
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

        dados.aulas.push({
          hora: hora,
          local: localEscolhido,
          aluno:
            tipoSelecionado === "Aula Teórica"
              ? "Turma"
              : alunoSelecionado,
          tipo: tipoSelecionado,
          status: "Agendado",
          statusCancelamento: null,
          situacaoFinal: null
        });

        agenda[data] = dados;
        salvarAgenda();
        verificarAgenda();

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

  alert("Aula cancelada pelo instrutor.");
}

// ===============================
// AULA CONCLUÍDA
// ===============================
function marcarConcluida(data, hora) {
  const aula = agenda[data].aulas.find(a => a.hora === hora);

  if (aula) {
    aula.situacaoFinal = "Aula Concluída";
  }

  salvarAgenda();
  verificarAgenda();

  alert("Aula concluída.");
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