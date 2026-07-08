const API = "http://localhost:3000";

async function login() {

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem");

    try {

        const resposta = await fetch("http://localhost:3000/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                senha
            })

        });

        const dados = await resposta.json();

        if (!resposta.ok) {

            mensagem.style.color = "red";
            mensagem.innerHTML = dados.erro || "Erro ao realizar login.";

            return;
        }

        localStorage.setItem("token", dados.token);

        mensagem.style.color = "green";
        mensagem.innerHTML = "Login realizado com sucesso!";

        // Próxima página do sistema
        window.location.href = "dashboard.html";

    } catch (erro) {

        mensagem.style.color = "red";
        mensagem.innerHTML = "Erro ao conectar com o servidor.";

    }

}