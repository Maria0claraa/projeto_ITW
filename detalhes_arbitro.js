function TechnicalOfficialsDetailsViewModel() {
    var self = this;

    // Propriedades observáveis para armazenar os detalhes do oficial técnico
    self.Id = ko.observable();
    self.Name = ko.observable();
    self.Sex = ko.observable();
    self.BirthDate = ko.observable();
    self.Function = ko.observable();
    self.Photo = ko.observable();
    self.Url = ko.observable();
    self.Organisation = ko.observable();
    self.OrganisationCode = ko.observable();
    self.Sports = ko.observable();

    // Função para buscar os detalhes do atleta
    self.loadTechnicalOfficialDetails = function () {
        const params = new URLSearchParams(window.location.search);
        const technicalOfficialId = params.get('id');

        if (technicalOfficialId) {
            fetch(`http://192.168.160.58/Paris2024/api/Technical_officials/${technicalOfficialId}`, {
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
                    self.Id(data.Id || 'unknown');
                    self.Name(data.Name) || 'unknown';
                    self.Sex(data.Sex) || 'unknown';
                    self.BirthDate(data.BirthDate) || 'unknown';
                    self.Function(data.Function) || 'unknown';
                    self.Photo(data.Photo && data.Photo.trim() !== '' ? data.Photo : 'imagemDefault.png');
                    self.Url(data.Url) || 'unknown';
                    self.Organisation(data.Organisation) || 'unknown';
                    self.OrganisationCode(data.OrganisationCode) || 'unknown';
                    self.Sports(data.Sports) || 'unknown';
                })
                .catch(error => {
                    console.error('Houve um problema com a operação de fetch:', error);
                });
        }
    };
}

// Aplica o Knockout.js bindings
const technicalOfficialsDetailsViewModel = new TechnicalOfficialsDetailsViewModel();
ko.applyBindings(technicalOfficialsDetailsViewModel);

// Carrega os detalhes do atleta ao iniciar a página
technicalOfficialsDetailsViewModel.loadTechnicalOfficialDetails();

function ViewModel() {
    this.Photo = ko.observable('');
    this.Name = ko.observable('Atleta Anônimo');

    // Configura uma imagem padrão se "Photo" estiver vazio
    this.PhotoWithDefault = ko.computed(() => {
        return this.Photo() || 'https://img.freepik.com/vetores-premium/ilustracao-plana-vetorial-em-escala-de-cinza-avatar-perfil-de-usuario-icone-de-pessoa-imagem-de-perfil-de-silhueta-neutra-de-genero-adequado-para-perfis-de-midia-social-icones-protetores-de-tela-e-como-um-modelo-x9xa_719432-875.jpg?semt=ais_hybrid';
    });
}

// Aplicar o binding
ko.applyBindings(new ViewModel());
