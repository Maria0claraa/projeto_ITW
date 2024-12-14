// Função para criar a conta e redirecionar para a loja
function criarConta(event) {
    event.preventDefault();

    // Capturar valores do formulário
    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const email = document.getElementById('e_mail').value.trim();
    const password = document.getElementById('pass_word').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Capturar elementos de erro
    const nomeError = document.getElementById('nome-error');
    const telefoneError = document.getElementById('telefone-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');

    // Resetar mensagens de erro
    nomeError.textContent = "";
    telefoneError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";

    let valid = true;

    // Validação do Nome
    if (nome.length < 3) {
        nomeError.textContent = "O nome deve ter no mínimo 3 letras.";
        valid = false;
    }

    // Validação do Telefone (9 dígitos)
    const telefoneRegex = /^[0-9]{9}$/;
    if (!telefoneRegex.test(telefone)) {
        telefoneError.textContent = "O telefone deve ter exatamente 9 dígitos.";
        valid = false;
    }

    // Validação da Confirmação da Password
    if (password !== confirmPassword) {
        confirmPasswordError.textContent = "As passwords não coincidem.";
        valid = false;
    }

    // Validação da Password
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@$!%#*?&])[A-Za-z\d@$!%#*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
        passwordError.textContent = "A senha deve ter no mínimo 6 caracteres, contendo pelo menos 1 número, 1 letra e 1 caractere especial (@, $, !, %, #, *, ?, &).";
        valid = false;
    }
    

    // Se tudo for válido
    if (valid) {
        const userData = { nome, telefone, email, password };
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', true); // Logar automaticamente
        alert('Conta criada com sucesso! Redirecionando para a loja...');
        window.location.href = 'loja.html'; // Redirecionar diretamente
    }
}

// Função para realizar o login
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData && userData.email === email && userData.password === password) {
        localStorage.setItem('isLoggedIn', true);
        alert('Login efetuado com sucesso!');
        window.location.href = 'loja.html'; // Redirecionar para a loja
    } else {
        alert('Email ou senha inválidos.');
    }
});
