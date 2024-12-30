function SportsDetailsViewModel() {
    var self = this;

    // Propriedades observáveis para armazenar os detalhes do treinador
    self.Id = ko.observable();
    self.Name = ko.observable();
    self.Sports_url = ko.observable();
    self.Pictogram = ko.observable();
    self.Athletes = ko.observableArray();
    self.Coaches = ko.observableArray();
    self.Competitions = ko.observableArray();
    self.Teams = ko.observableArray();
    self.Technical_officials = ko.observableArray();
    self.Venues = ko.observableArray();

    // Função para buscar os detalhes do treinador
    self.loadSportsDetails = function () {
        const params = new URLSearchParams(window.location.search);
        const sportsId = params.get('id'); // Verifique se a URL está passando corretamente o parâmetro 'id'
    
        if (sportsId) {
            // Verifique se o nocId está correto no console
            console.log("ID da Comitiva:", sportsId);
    
            fetch(`http://192.168.160.58/Paris2024/api/Sports/${sportsId}`, {
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
                    self.Sports_url(data.Sports_url|| 'unknown');
                    self.Athletes(data.Athletes || []);
                    self.Coaches(data.Coaches || []);
                    self.Competitions(data.Competitions || []);
                    self.Teams(data.Teams || []);
                    self.Technical_officials(data.Technical_officials || []);
                    self.Venues(data.Venues || []);
                    console.log(data.Pictogram);
                    self.Pictogram(data.Pictogram && data.Pictogram.trim() !== '' ? data.Pictogram : 'imagemDefault.png'); // Foto do treinador
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
const SportsDetailsViewModelInstance = new SportsDetailsViewModel(); // Nome correto da instância
ko.applyBindings(SportsDetailsViewModelInstance);

// Carrega os detalhes do treinador ao iniciar a página
SportsDetailsViewModelInstance.loadSportsDetails();

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