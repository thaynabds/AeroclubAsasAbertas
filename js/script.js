function cadastrar() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("emailCadastro").value;
    const senha = document.getElementById("senhaCadastro").value;

    if (!nome || !email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuarios.push({
        nome: nome,
        email: email,
        senha: senha
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado!");
    window.location.href = "index.html";
}

function login() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (email === "dashboardgeneral" && senha === "*_aeroClube@") {
        window.location.href = "cadastro.html";
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(u =>
        u.email === email && u.senha === senha
    );

    if (usuarioEncontrado) {
        alert("Login realizado com sucesso!");
        window.location.href = "dashboard.html";
    } else {
        alert("Email ou senha incorretos");
    }
}

function toggleSenha() {
    const senha = document.getElementById("senha");

    if (senha.type === "password") {
        senha.type = "text";
    } else {
        senha.type = "password";
    }
}

function logout() {
    window.location.href = "index.html";
}