function AthleteDetailsViewModel() {
    var self = this;

    // Propriedades observáveis para armazenar os detalhes do atleta
    self.Id = ko.observable();
    self.Name = ko.observable();
    self.Date = ko.observable();
    self.EventId = ko.observable();
    self.EventName = ko.observable();
    self.StageId = ko.observable();
    self.StageName = ko.observable();
    self.Sex = ko.observable();
    self.Venue = ko.observable();
    self.ParticipantType = ko.observable();
    self.ParticipantCode = ko.observable();
    self.ParticipantName = ko.observable();
    self.CountryCode = ko.observable();
    self.CountryName = ko.observable();
    self.CountryFlag = ko.observable();
    self.NOCFlag = ko.observable();
    self.Rank = ko.observable();
    self.Result = ko.observable();
    self.ResultType = ko.observable();
    self.ResultIRM = ko.observable();
    self.ResultDiff = ko.observable();
    self.ResultWLT = ko.observable();
    self.QualificationMark = ko.observable();
    self.StartOrder = ko.observable();
    self.Bib = ko.observable();
    

    // Função para buscar os detalhes do atleta
    self.loadAthleteDetails = function () {
        const params = new URLSearchParams(window.location.search);
        const athleteId = params.get('id');

        if (athleteId) {
            fetch(`http://192.168.160.58/Paris2024/api/Cycling_Tracks/${athleteId}`, {
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
                    self.Date(data.Date || 'unknown');
                    self.EventId(data.EventId || 'unknown');
                    self.EventName(data.EventName || 'unknown');
                    self.StageId(data.StageId || 'unknown');
                    self.StageName(data.StageName|| 'unknown');
                    self.Sex(data.Sex || 'unknown');
                    self.Venue(data.Venue || 'unknown');
                    self.ParticipantType(data.ParticipantType || 'unknown');
                    self.ParticipantCode(data.ParticipantCode || 'unknown');
                    self.ParticipantName(data.ParticipantName || 'unknown');
                    self.CountryCode(data.CountryCode || 'unknown');
                    self.CountryFlag(data.CountryFlag || 'unknown');
                    self.CountryName(data.CountryName || 'unknown');
                    self.NOCFlag(data.NOCFlag || 'unknown');
                    self.Rank(data.Rank || 'unknown');
                    self.Result(data.Result|| 'unknown');
                    self.ResultType(data.ResultType || 'unknown');
                    self.ResultIRM(data.ResultIRM || 'unknown');
                    self.ResultDiff(data.ResultDiff || 'unknown');
                    self.ResultWLT(data.ResultWLT || 'unknown');
                    self.QualificationMark(data.QualificationMark || 'unknown');
                    self.StartOrder(data.StartOrder || 'unknown');
                    self.Bib(data.Bib || 'unknown');
                    
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