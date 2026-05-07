document.addEventListener("DOMContentLoaded", () => {
  carregarDiarioInstrutor();

  const filtro = document.getElementById("filtroAluno");

  if (filtro) {
    filtro.addEventListener("keyup", () => {
      carregarDiarioInstrutor();
    });
  }
});

function carregarDiarioInstrutor() {
  const container = document.getElementById("cardsDiario");
  const filtro = document.getElementById("filtroAluno");

  if (!container) return;

  const textoFiltro = filtro
    ? filtro.value.toLowerCase().trim()
    : "";

  const agenda = JSON.parse(localStorage.getItem("agenda")) || {};
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // somente alunos cadastrados
  const alunosCadastrados = usuarios
    .filter(user => user.tipo === "aluno")
    .map(user =>
      (
        user.nomeCompleto ||
        `${user.nome || ""} ${user.sobrenome || ""}`
      )
        .toLowerCase()
        .trim()
    );

  container.innerHTML = "";

  let encontrou = false;

  Object.keys(agenda).forEach((data) => {
    const aulas = agenda[data].aulas || [];

    aulas.forEach((aula, index) => {

      const nomeAluno = (aula.aluno || "")
        .toLowerCase()
        .trim();

      // somente alunos cadastrados
      if (!alunosCadastrados.includes(nomeAluno)) {
        return;
      }

      // filtro
      if (
        textoFiltro &&
        !nomeAluno.includes(textoFiltro)
      ) {
        return;
      }

      const concluida =
        aula.situacaoFinal === "Aula Concluída" ||
        aula.situacaoFinal === "Aluno não compareceu";

      const diarioPreenchido =
        aula.diarioPreenchido === true;

      const card = document.createElement("div");
      card.className = "card-diario";

      card.innerHTML = `
        <div class="card-topo">

          <div class="lado-esquerdo">
            <h3>${aula.aluno || "Aluno"}</h3>

            <p class="disciplina">
              ${aula.tipo || "Aula"}
            </p>

            <p class="data-hora">
              ${formatarData(data)} | ${aula.hora || "--:--"}
            </p>
          </div>

          <div class="lado-direito">

            <span class="tag-status">
              ${
                aula.situacaoFinal === "Aluno não compareceu"
                  ? "Não Compareceu"
                  : concluida
                    ? "Aula Realizada"
                    : "Não Realizada"
              }
            </span>

            ${
              concluida
                ? `
                <span class="tag-presenca">
                  ${
                    aula.situacaoFinal === "Aluno não compareceu"
                      ? "Ausente"
                      : "Presente"
                  }
                </span>

                <span class="tag-nota">
                  Nota: ${aula.nota || "-"}
                </span>
              `
                : ""
            }

          </div>
        </div>

        ${
          concluida && !diarioPreenchido
            ? `
          <div class="area-expandida">

            <div class="bloco-form">
              <label>Nota do Aluno (0 a 10)</label>

              <input
                type="text"
                id="nota-${data}-${index}"
                value="${aula.nota || ""}"
                placeholder="Digite a nota"
              >
            </div>

            <div class="bloco-form">
              <label>Conteúdo da Aula</label>

              <textarea
                id="conteudo-${data}-${index}"
                placeholder="Descreva o conteúdo da aula"
              >${aula.conteudo || ""}</textarea>
            </div>

            <div class="bloco-form">
              <label>Como a Aula Aconteceu</label>

              <textarea
                id="como-${data}-${index}"
                placeholder="Explique como foi a aula"
              >${aula.comoFoi || ""}</textarea>
            </div>

            <div class="bloco-form">
              <label>Observações do Professor</label>

              <textarea
                id="obs-${data}-${index}"
                placeholder="Digite observações importantes"
              >${aula.observacoes || ""}</textarea>
            </div>

            <button
              class="btn-salvar"
              onclick="salvarDiario('${data}', '${aula.hora}')"
            >
              Salvar Alterações
            </button>

          </div>
          `
            : ""
        }

        ${
          concluida && diarioPreenchido
            ? `
          <div class="area-expandida">

            <div class="bloco-form">
              <label><strong>Conteúdo da Aula</strong></label>
              <p>${aula.conteudo || "-"}</p>
            </div>

            <div class="bloco-form">
              <label><strong>Como a Aula Aconteceu</strong></label>
              <p>${aula.comoFoi || "-"}</p>
            </div>

            <div class="bloco-form">
              <label><strong>Observações do Professor</strong></label>
              <p>${aula.observacoes || "-"}</p>
            </div>

            <button
              class="btn-salvar"
              onclick="editarDiario('${data}', '${aula.hora}')"
            >
              Editar
            </button>

            <button
              class="btn-salvar"
              onclick="excluirDiario('${data}', '${aula.hora}')"
            >
              Excluir
            </button>

          </div>
          `
            : ""
        }
      `;

      container.appendChild(card);
      encontrou = true;
    });
  });

  if (!encontrou) {
    container.innerHTML = `
      <div class="card-diario">
        <p>Nenhuma aula encontrada.</p>
      </div>
    `;
  }
}

// =====================================
// SALVAR DIÁRIO
// =====================================
function salvarDiario(data, hora) {

  const agenda =
    JSON.parse(localStorage.getItem("agenda")) || {};

  if (!agenda[data]) return;

  const aula = agenda[data].aulas.find(a =>
    a.hora === hora
  );

  if (!aula) return;

  const index =
    agenda[data].aulas.indexOf(aula);

  aula.nota =
    document.getElementById(`nota-${data}-${index}`)?.value || "";

  aula.conteudo =
    document.getElementById(`conteudo-${data}-${index}`)?.value || "";

  aula.comoFoi =
    document.getElementById(`como-${data}-${index}`)?.value || "";

  aula.observacoes =
    document.getElementById(`obs-${data}-${index}`)?.value || "";

  aula.diarioPreenchido = true;

  localStorage.setItem("agenda", JSON.stringify(agenda));

  carregarDiarioInstrutor();

  alert("Alterações salvas com sucesso.");
}

// =====================================
// EDITAR DIÁRIO
// =====================================
function editarDiario(data, hora) {

  const agenda =
    JSON.parse(localStorage.getItem("agenda")) || {};

  if (!agenda[data]) return;

  const aula = agenda[data].aulas.find(a =>
    a.hora === hora
  );

  if (!aula) return;

  aula.diarioPreenchido = false;

  localStorage.setItem("agenda", JSON.stringify(agenda));

  carregarDiarioInstrutor();
}

// =====================================
// EXCLUIR DIÁRIO
// =====================================
function excluirDiario(data, hora) {

  const agenda =
    JSON.parse(localStorage.getItem("agenda")) || {};

  if (!agenda[data]) return;

  const aula = agenda[data].aulas.find(a =>
    a.hora === hora
  );

  if (!aula) return;

  if (!confirm("Deseja realmente excluir este diário?")) {
    return;
  }

  aula.nota = "";
  aula.conteudo = "";
  aula.comoFoi = "";
  aula.observacoes = "";
  aula.diarioPreenchido = false;

  localStorage.setItem("agenda", JSON.stringify(agenda));

  carregarDiarioInstrutor();

  alert("Diário removido com sucesso.");
}

// =====================================
// FORMATAR DATA
// =====================================
function formatarData(data) {

  const d = new Date(data + "T00:00:00");

  const dia = String(d.getDate()).padStart(2, "0");
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const ano = d.getFullYear();

  return `${dia}/${mes}/${ano}`;
}