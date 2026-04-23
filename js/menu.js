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


  // MENU CLIQUE
  document.querySelectorAll(".menu-item").forEach(item => {
    item.addEventListener("click", () => {

      const texto = item.querySelector("span")?.innerText.trim();

      // INÍCIO
      if (texto === "Início") {
        conteudo.innerHTML = dashboard;
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