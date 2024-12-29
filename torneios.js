function vm() {
    var self = this;

    // Propriedades KO disponíveis 
    
    self.totalPages = ko.observable(1); // Inicializa com 1, pois não há paginação
    self.currentPage = ko.observable(1); // Inicializa com 1
    self.totalSports = ko.observable(0); // Renomeado para totalSports
    self.fromRecord = ko.observable(0);
    self.toRecord = ko.observable(0);
    self.Id = ko.observable();
    self.Name = ko.observable();
    self.Sport_url = ko.observable();
    self.Pictogram = ko.observable();
    self.Athletes = ko.observable();
    self.Coaches = ko.observable();
    self.Competitions = ko.observable();
    self.Teams = ko.observable();
    self.Tecnical_officials = ko.observable();
    self.Venues = ko.observable();

    // Computed properties para verificar páginas
    self.hasPreviousPage = ko.computed(() => {
        return self.currentPage() > 1;
    });
    self.hasNextPage = ko.computed(() => {
        return self.currentPage() < self.totalPages();
    });

    // Função para atualizar os dados a mostrar
    self.inventory_populate = function () {
        // Mostrar modal de carregamento
        showLoadingModal();

        // Para conseguir ir buscar a API
        fetch('http://192.168.160.58/Paris2024/api/Sports', {
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

                // Atualização dos dados
                
                self.totalSports(data.length); // Total de esportes
                self.fromRecord(1); // Como não há paginação, sempre começa do 1
                self.toRecord(data.length); // Total de registros
                self.Id (data.Id || 'unknown');
                self.Name (data.Name || 'unknown');
                self.Sport_url (data.Sport_url || 'unknown');
                self.Pictogram (data.Pictogram || 'unknown');
                self.Athletes (data.Athletes || 'unknown');
                self.Coaches (data.Coaches || 'unknown');
                self.Competitions (data.Competitions || 'unknown');
                self.Teams (data.Teams || 'unknown');
                self.Tecnical_officials (data.Tecnical_officials || 'unknown');
                self.Venues (data.Venues || 'unknown');
            })
            .catch(error => {
                console.error('Houve um problema com a operação de fetch:', error);
            })
            .finally(() => {
                // Esconder modal de carregamento após os dados serem buscados
                const myModal = bootstrap.Modal.getInstance(document.getElementById('myModal'));
                if (myModal) {
                    myModal.hide();
                }
            });
    };

    // Inicializa a busca de dados
    self.inventory_populate();
}

const appElement = document.querySelector("#knockout-app");
const viewModel = new vm();
ko.applyBindings(viewModel, appElement);

function showLoadingModal() {
    var myModal = new bootstrap.Modal(document.getElementById('myModal'));
    myModal.show();
}

// Chama a função para mostrar o modal e carregar os dados
document.addEventListener('DOMContentLoaded', function () {
    showLoadingModal();
});