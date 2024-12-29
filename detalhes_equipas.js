function TeamsDetailsViewModel() {
    var self = this;

    // Propriedades observáveis para armazenar os detalhes do treinador
    self.Id = ko.observable();
    self.Name = ko.observable();
    self.Sex = ko.observable();
    self.Num_athletes = ko.observable();
    self.Num_coaches = ko.observable();
    self.Athletes = ko.observableArray();
    self.Coaches = ko.observableArray();
    self.Noc = ko.observableArray();
    self.Sport = ko.observableArray();
    self.Medals = ko.observableArray();
    
   

    // Função para buscar os detalhes do treinador
    self.loadTeamsDetails = function () {
        const params = new URLSearchParams(window.location.search);
        const teamId = params.get('id'); // Verifique se a URL está passando corretamente o parâmetro 'id'
    
        if (teamId) {
            // Verifique se o nocId está correto no console
            console.log("ID da equipa:", teamId);
    
            fetch(`http://192.168.160.58/Paris2024/api/Teams/${teamId}`, {
                method: "GET"
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('A resposta da rede não foi ok: ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    self.Id(data.Id || 'unknown');
                    self.Name(data.Name || 'unknown');
                    self.Sex(data.Sex || 'unknown');
                    self.Num_athletes(data.Num_athletes || 'unknown');
                    self.Num_coaches(data.Num_coaches || 'unknown');
                    self.Athletes(data.Athletes || []);
                    self.Coaches(data.Coaches || []);
                    self.Noc(data.NOC || []);
                    self.Sport(data.Sport || []);
                    self.Medals(data.Medals || []);
                    
                })
                .catch(error => {
                    console.error('Erro ao carregar os dados da Comitiva:', error);
                });
        } else {
            console.error('ID da Comitiva não encontrado na URL.');
        }
    };
    
}

// Aplica o Knockout.js bindings
const TeamsDetailsViewModelInstance = new TeamsDetailsViewModel(); // Nome correto da instância
ko.applyBindings(TeamsDetailsViewModelInstance);

// Carrega os detalhes do treinador ao iniciar a página
TeamsDetailsViewModelInstance.loadTeamsDetails();

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