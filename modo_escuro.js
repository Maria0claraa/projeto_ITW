document.addEventListener("DOMContentLoaded", function () {
    // Seleciona o botão de alternância de tema e o corpo da página
    const themeSwitcher = document.getElementById('themeSwitcher');
    const body = document.body;

    // Verifica o tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');

    // Aplica o tema salvo ou define o tema padrão
    if (savedTheme === 'dark-theme') {
        body.classList.add('dark-theme');
        themeSwitcher.innerHTML = '<i class="fa fa-sun-o"></i>'; // Ícone: Sol
    } else {
        body.classList.add('light-theme');
        themeSwitcher.innerHTML = '<i class="fa fa-moon-o"></i>'; // Ícone: Lua
    }

    // Alterna o tema ao clicar no botão
    themeSwitcher.addEventListener('click', function () {
        if (body.classList.contains('light-theme')) {
            // Muda para modo escuro
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeSwitcher.innerHTML = '<i class="fa fa-sun-o"></i>'; // Ícone: Sol
            localStorage.setItem('theme', 'dark-theme'); // Salva o tema no localStorage
        } else {
            // Muda para modo claro
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeSwitcher.innerHTML = '<i class="fa fa-moon-o"></i>'; // Ícone: Lua
            localStorage.setItem('theme', 'light-theme'); // Salva o tema no localStorage
        }
    });
});
