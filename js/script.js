function cadastrar() {
    const tipo = document.getElementById("tipoUsuario")?.value;

    const nome = document.getElementById("nome")?.value.trim();
    const sobrenome = document.getElementById("sobrenome")?.value.trim();

    const email = document.getElementById("emailCadastro")?.value.trim();
    const senha = document.getElementById("senhaCadastro")?.value.trim();

    const nomeCompleto = `${nome} ${sobrenome}`.trim();

    if (!tipo) {
        alert("Selecione se o cadastro é de aluno ou instrutor.");
        return;
    }

    if (!nome || !sobrenome || !email || !senha) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // verificar se já existe email cadastrado
    const existe = usuarios.find(
        u => u.email.toLowerCase() === email.toLowerCase()
    );

    if (existe) {
        alert("Este e-mail já está cadastrado.");
        return;
    }

    const novoUsuario = {
        tipo: tipo, // aluno ou instrutor
        nome: nome,
        sobrenome: sobrenome,
        nomeCompleto: nomeCompleto,
        email: email,
        senha: senha
    };

    usuarios.push(novoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert(
        tipo === "instrutor"
            ? "Instrutor cadastrado com sucesso!"
            : "Aluno cadastrado com sucesso!"
    );

    // limpar campos
    document.getElementById("tipoUsuario").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("sobrenome").value = "";
    document.getElementById("emailCadastro").value = "";
    document.getElementById("senhaCadastro").value = "";

    window.location.href = "login.html";
}

function login() {
    const email = document.getElementById("email")?.value.trim();
    const senha = document.getElementById("senha")?.value.trim();

    if (!email || !senha) {
        alert("Preencha email e senha.");
        return;
    }

    // 🔐 ADMIN
    if (email === "dashboardgeneral" && senha === "*_aeroClube@") {
        window.location.href = "cadastro.html";
        return;
    }

    // 👨‍🎓 ALUNO FIXO
    if (email === "pedrinholira007@gmail.com" && senha === "123") {
        localStorage.setItem("usuarioLogado", email);
        localStorage.setItem("nomeUsuario", "Pedro");
        localStorage.setItem("sobrenomeUsuario", "Lucas");
        localStorage.setItem("nomeCompletoUsuario", "Pedro Lucas");
        localStorage.setItem("tipoUsuario", "aluno");

        window.location.href = "dashboard.html";
        return;
    }

    // 👨‍✈️ INSTRUTOR FIXO
    if (email === "vicentedepaula@gmail.com" && senha === "123") {
        localStorage.setItem("usuarioLogado", email);
        localStorage.setItem("nomeUsuario", "Vicente");
        localStorage.setItem("sobrenomeUsuario", "de Paula");
        localStorage.setItem("nomeCompletoUsuario", "Vicente de Paula");
        localStorage.setItem("tipoUsuario", "instrutor");

        window.location.href = "dashinstrutor.html";
        return;
    }

    // 🔎 USUÁRIOS CADASTRADOS PELO ADMIN
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(
        u =>
            u.email.toLowerCase() === email.toLowerCase() &&
            u.senha === senha
    );

    if (usuarioEncontrado) {
        localStorage.setItem("usuarioLogado", usuarioEncontrado.email);
        localStorage.setItem("nomeUsuario", usuarioEncontrado.nome || "");
        localStorage.setItem("sobrenomeUsuario", usuarioEncontrado.sobrenome || "");
        localStorage.setItem("nomeCompletoUsuario", usuarioEncontrado.nomeCompleto || "");
        localStorage.setItem("tipoUsuario", usuarioEncontrado.tipo || "aluno");

        alert("Login realizado com sucesso!");

        if (
            usuarioEncontrado.tipo &&
            usuarioEncontrado.tipo.toLowerCase() === "instrutor"
        ) {
            window.location.href = "dashinstrutor.html";
        } else {
            window.location.href = "dashboard.html";
        }

        return;
    }

    alert("Email ou senha incorretos");
}

function toggleSenha() {
    const senha = document.getElementById("senha");

    if (!senha) return;

    senha.type =
        senha.type === "password"
            ? "text"
            : "password";
}

function logout() {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("nomeUsuario");
    localStorage.removeItem("sobrenomeUsuario");
    localStorage.removeItem("nomeCompletoUsuario");
    localStorage.removeItem("tipoUsuario");

    window.location.href = "index.html";
}

let currentImageIndex = 0;
const images = document.querySelectorAll(".carousel-img");
const indicators = document.querySelectorAll(".indicator");

function showImage(index) {
    if (!images.length) return;

    images.forEach(img =>
        img.classList.remove("active")
    );

    indicators.forEach(ind =>
        ind.classList.remove("active")
    );

    images[index].classList.add("active");

    if (indicators[index]) {
        indicators[index].classList.add("active");
    }

    currentImageIndex = index;
}

function nextImage() {
    if (!images.length) return;

    let nextIndex =
        (currentImageIndex + 1) % images.length;

    showImage(nextIndex);
}

function prevImage() {
    if (!images.length) return;

    let prevIndex =
        (currentImageIndex - 1 + images.length) % images.length;

    showImage(prevIndex);
}

function goToImage(index) {
    showImage(index);
}