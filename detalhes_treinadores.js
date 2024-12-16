function CoachDetailsViewModel() {
    var self = this;

    // Propriedades observáveis para armazenar os detalhes do treinador
    self.Id = ko.observable();
    self.Name = ko.observable();
    self.Sex = ko.observable();
    self.BirthDate = ko.observable();
    self.Function = ko.observable();
    self.Country = ko.observable();
    self.Sports = ko.observableArray(); // Usamos observableArray para uma lista de esportes
    self.Photo = ko.observable();

    // Função para buscar os detalhes do treinador
    self.loadCoachDetails = function () {
        const params = new URLSearchParams(window.location.search);
        const coachId = params.get('id'); // Corrigido para coachId

        if (coachId) { // Verifica se o coachId existe
            fetch(`http://192.168.160.58/Paris2024/api/Coaches/${coachId}`, {
                method: "GET"
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('A resposta da rede não foi ok: ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    // Atualiza os dados do treinador
                    self.Id(data.Id || 'unknown');
                    self.Name(data.Name || 'unknown');
                    self.Sex(data.Sex || 'unknown');
                    self.BirthDate(data.BirthDate ? data.BirthDate.split('T')[0] : 'unknown'); // Formata a data
                    self.Function(data.Function || 'unknown');
                    self.Country(data.Country || 'unknown');
                    self.Sports(data.Sports || []); // Atualiza os esportes, se houver
                    self.Photo(data.Photo || 'imagemDefault.png'); // Foto do treinador
                })
                .catch(error => {
                    console.error('Erro ao carregar os dados do treinador:', error);
                    // Trate o erro, se necessário (por exemplo, exiba uma mensagem para o usuário)
                });
        }
    };
}

// Aplica o Knockout.js bindings
const CoachDetailsViewModelInstance = new CoachDetailsViewModel(); // Nome correto da instância
ko.applyBindings(CoachDetailsViewModelInstance);

// Carrega os detalhes do treinador ao iniciar a página
CoachDetailsViewModelInstance.loadCoachDetails();

// Função para mostrar o modal de carregamento
function showLoadingModal() {
    var myModal = new bootstrap.Modal(document.getElementById('myModal'));
    myModal.show();

    // Simula o tempo de carregamento de dados (por exemplo, 3 segundos)
    setTimeout(function () {
        myModal.hide();
        // Você pode adicionar qualquer função para carregar dados adicionais aqui
    }, 500); // 500 ms para simulação de carregamento
}

// Chama a função para mostrar o modal de carregamento ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    showLoadingModal();
});
