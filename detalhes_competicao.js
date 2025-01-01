function AthleteDetailsViewModel() {
    var self = this;

    // Propriedades observáveis para armazenar os detalhes do atleta
    self.SportId = ko.observable();
    self.Name = ko.observable();
    self.Tag = ko.observable();
    self.Photo = ko.observable();
    self.SportInfo = ko.observableArray();
    self.Athletes = ko.observableArray();
    
    

    // Função para buscar os detalhes do atleta
    self.loadAthleteDetails = function () {
        const params = new URLSearchParams(window.location.search);
        const sportId = params.get('id');
        const name = params.get('name');

        if (sportId) {
            fetch(`http://192.168.160.58/Paris2024/api/Competitions?sportId=${sportId}&name=${name}`, {
                method: "GET"
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('A resposta da rede não foi ok: ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    // Atualiza as propriedades observáveis com os dados do atleta
                    self.SportId(data.SportId || 'unknown');
                    self.Name(data.Name) || 'unknown';
                    self.Tag(data.Tag || 'unknown');
                    self.Photo(data.Photo|| 'unknown');
                    self.SportInfo(data.SportInfo || []);
                    self.Athletes(data.Athletes || []);
                    
                    
                })
        }
    };
}

// Aplica o Knockout.js bindings
const athleteDetailsViewModel = new AthleteDetailsViewModel();
ko.applyBindings(athleteDetailsViewModel);

// Carrega os detalhes do atleta ao iniciar a página
athleteDetailsViewModel.loadAthleteDetails();

function showLoadingModal() {
    var myModal = new bootstrap.Modal(document.getElementById('myModal'));
    myModal.show();

    // Simula o tempo de carregamento de dados (por exemplo, 3 segundos)
    setTimeout(function () {
        myModal.hide();
        loadMapData();
    }, 500);
}
// Chama a função para mostrar o modal e carregar os dados
document.addEventListener('DOMContentLoaded', function () {
    showLoadingModal();
});