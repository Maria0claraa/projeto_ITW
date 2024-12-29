function NocsDetailsViewModel() {
    var self = this;

    // Propriedades observáveis para armazenar os detalhes do treinador
    self.Id = ko.observable();
    self.Name = ko.observable();
    self.Note = ko.observable();
    self.Url = ko.observable();
    self.Athletes = ko.observableArray();
    self.Coaches = ko.observableArray();
    self.Medals = ko.observableArray();
    self.Teams = ko.observableArray(); // Usamos observableArray para uma lista de esportes
    self.Photo = ko.observable();

    // Função para buscar os detalhes do treinador
    self.loadNocsDetails = function () {
        const params = new URLSearchParams(window.location.search);
        const nocId = params.get('id'); // Corrigido para coachId

        if (nocId) {
            fetch(`http://192.168.160.58/Paris2024/api/NOCs/${nocId}`, {
                method: "GET"
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('A resposta da rede não foi ok: ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    self.Id(data.Id || 'unknown');
                    self.Name(data.Name || 'unknown');
                    self.Note(data.Note || 'unknown');
                    self.Url(data.Url || 'unknown'); 
                    self.Athletes(data.Athletes || []);
                    self.Coaches(data.Coaches || []);
                    self.Medals(data.Medals || []);
                    self.Teams(data.Teams || []); // Atualiza os esportes, se houver
                    self.Photo(data.Photo && data.Photo.trim() !== '' ? data.Photo : 'imagemDefault.png'); // Foto do treinador
                })
                .catch(error => {
                    console.error('Erro ao carregar os dados da Comitiva:', error);
                    // Trate o erro, se necessário (por exemplo, exiba uma mensagem para o usuário)
                });
        }
    };
}

// Aplica o Knockout.js bindings
const NocsDetailsViewModelInstance = new NocsDetailsViewModel(); // Nome correto da instância
ko.applyBindings(NocsDetailsViewModelInstance);

// Carrega os detalhes do treinador ao iniciar a página
NocsDetailsViewModelInstance.loadNocsDetails();

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