function SportsViewModel() {
    var self = this;

    // Propriedades observáveis para armazenar os esportes
    self.Sports = ko.observableArray(); // Lista de esportes

    const getQueryParams = () => {
        const params = new URLSearchParams(window.location.search);
        return {
            search: params.get('q') || '',
        };
    };

    // Função para buscar os dados da API de esportes
    self.loadSports = function () {
        const { search} = getQueryParams();
        console.log(search);
        // URL da API
        
        const apiUrl = "http://192.168.160.58/Paris2024/api/Sports";

        fetch(apiUrl, {
            method: "GET"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('A resposta da rede não foi ok: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Verifique os dados retornados no console
                self.Sports(data); // Atualiza a lista de esportes com os dados recebidos
            })
            .catch(error => {
                console.error('Erro ao carregar os dados dos esportes:', error);
            });
    };

    // Função para abrir o modal com detalhes de um esporte
    self.showSportDetails = function (sport) {
        // Verifica se o modal existe
        var modalSportName = document.getElementById('modalSportName');
        if (modalSportName) {
            modalSportName.innerText = sport.Name || 'unknown';
        }
    
        var modalSportAthletes = document.getElementById('modalSportAthletes');
        if (modalSportAthletes) {
            modalSportAthletes.innerText = sport.Athletes || 'unknown';
        }
    
        var modalSportCoaches = document.getElementById('modalSportCoaches');
        if (modalSportCoaches) {
            modalSportCoaches.innerText = sport.Coaches || 'unknown';
        }
    
        var modalSportCompetitions = document.getElementById('modalSportCompetitions');
        if (modalSportCompetitions) {
            modalSportCompetitions.innerText = sport.Competitions || 'unknown';
        }
    
        var modalSportTeams = document.getElementById('modalSportTeams');
        if (modalSportTeams) {
            modalSportTeams.innerText = sport.Teams || 'unknown';
        }
    
        var modalSportVenues = document.getElementById('modalSportVenues');
        if (modalSportVenues) {
            modalSportVenues.innerText = sport.Venues || 'unknown';
        }
    
        var modalSportPictogram = document.getElementById('modalSportPictogram');
        if (modalSportPictogram) {
            modalSportPictogram.src = sport.Pictogram || 'imagem_default_nocs.png';
        }
    
        // Mostra o modal
        var myModal = new bootstrap.Modal(document.getElementById('sportDetailsModal'));
        myModal.show();
    };
}

// Aplica o Knockout.js bindings
const SportsViewModelInstance = new SportsViewModel();
ko.applyBindings(SportsViewModelInstance);

// Carrega os esportes ao iniciar a página
SportsViewModelInstance.loadSports();

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
