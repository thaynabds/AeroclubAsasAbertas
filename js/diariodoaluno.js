document.addEventListener("DOMContentLoaded", () => {
    carregarDiarioAluno();
});

function carregarDiarioAluno() {
    const container = document.getElementById("cardsDiarioAluno");

    if (!container) return;

    // ===============================
    // ALUNO REALMENTE LOGADO
    // ===============================
    const nomeAlunoLogado = (
        localStorage.getItem("nomeCompletoUsuario") || ""
    )
        .toLowerCase()
        .trim();

    const agenda = JSON.parse(localStorage.getItem("agenda")) || {};

    container.innerHTML = "";

    let encontrou = false;

    // ===============================
    // PERCORRER TODAS AS DATAS
    // ===============================
    Object.keys(agenda).forEach((data) => {
        const aulas = agenda[data].aulas || [];

        aulas.forEach((aula) => {
            const nomeAlunoAula = (
                aula.aluno || ""
            )
                .toLowerCase()
                .trim();

            // ===============================
            // MOSTRAR SOMENTE O ALUNO LOGADO
            // ===============================
            if (nomeAlunoAula !== nomeAlunoLogado) {
                return;
            }

            // ===============================
            // SOMENTE AULAS FINALIZADAS
            // ===============================
            if (
                aula.situacaoFinal !== "Aula Concluída" &&
                aula.situacaoFinal !== "Aluno não compareceu"
            ) {
                return;
            }

            // ===============================
            // DIÁRIO PRECISA ESTAR PREENCHIDO
            // ===============================
            if (aula.diarioPreenchido !== true) {
                return;
            }

            encontrou = true;

            const card = document.createElement("div");
            card.className = "card-diario-aluno";

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
                                    : "Aula Realizada"
                            }
                        </span>

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

                    </div>

                </div>

                <div class="bloco-info">
                    <label>Conteúdo da Aula</label>
                    <p>${aula.conteudo || "-"}</p>
                </div>

                <div class="bloco-info">
                    <label>Como a Aula Aconteceu</label>
                    <p>${aula.comoFoi || "-"}</p>
                </div>

                <div class="bloco-info">
                    <label>Observações do Professor</label>
                    <p>${aula.observacoes || "-"}</p>
                </div>
            `;

            container.appendChild(card);
        });
    });

    // ===============================
    // SE NÃO ENCONTRAR NADA
    // ===============================
    if (!encontrou) {
        container.innerHTML = `
            <div class="sem-aulas">
                Nenhuma aula registrada encontrada.
            </div>
        `;
    }
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