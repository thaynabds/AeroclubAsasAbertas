// ===============================
// 🔥 STORAGE COMPARTILHADO
// ===============================
let agenda = JSON.parse(localStorage.getItem("agenda")) || {};

// ===============================
// 🚀 RENDERIZAR AULAS
// ===============================
function renderizarAulas() {
  const container = document.getElementById("listaAulas");
  container.innerHTML = "";

  const datas = Object.keys(agenda);

  if (datas.length === 0) {
    container.innerHTML = `<p class="vazio">Nenhuma aula agendada</p>`;
    return;
  }

  datas.forEach(data => {

    agenda[data].aulas.forEach((aula, index) => {

      const card = document.createElement("div");
      card.className = "card-aula";

      card.innerHTML = `
        <strong>${formatarData(data)}</strong><br>
        Horário: ${aula.hora} <br>
        Local: ${aula.local} <br>

        <span class="status ${aula.status}">
          ${aula.status === "pendente" ? "Pendente" : "Confirmado"}
        </span>

        <div class="acoes">
          ${aula.status === "pendente" ? `
            <button class="btn-confirmar" onclick="confirmarAula('${data}', ${index})">
              Confirmar
            </button>
          ` : ""}

          <button class="btn-cancelar" onclick="cancelarAula('${data}', ${index})">
            Cancelar
          </button>
        </div>
      `;

      container.appendChild(card);
    });

  });
}

// ===============================
// ✔ CONFIRMAR
// ===============================
function confirmarAula(data, index) {
  agenda[data].aulas[index].status = "confirmado";
  salvar();
}

// ===============================
// ❌ CANCELAR
// ===============================
function cancelarAula(data, index) {
  agenda[data].aulas.splice(index, 1);

  // se não tiver mais aula no dia, remove o dia
  if (agenda[data].aulas.length === 0) {
    delete agenda[data];
  }

  salvar();
}

// ===============================
// 💾 SALVAR
// ===============================
function salvar() {
  localStorage.setItem("agenda", JSON.stringify(agenda));
  renderizarAulas();
}

// ===============================
// 📅 FORMATAR DATA
// ===============================
function formatarData(data) {
  const d = new Date(data + "T00:00:00");
  return d.toLocaleDateString("pt-BR");
}

// ===============================
// 🔄 ATUALIZA AUTOMÁTICO
// ===============================
setInterval(() => {
  agenda = JSON.parse(localStorage.getItem("agenda")) || {};
  renderizarAulas();
}, 1000);

// ===============================
window.onload = renderizarAulas;