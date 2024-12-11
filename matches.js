// matches.js

// ViewModel para os eventos de atletismo
function MatchesViewModel() {
    const self = this;

    // Flag para verificar se a API já foi chamada
    self.isDataLoaded = ko.observable(false);

    // Observáveis para a interface
    self.events = ko.observableArray([]); // Observável para armazenar eventos de atletismo

    // Função para buscar os eventos da API
    self.fetchEvents = function () {
        // Verifica se os dados já foram carregados
        if (self.isDataLoaded()) {
            return; // Se já foi carregado, não faz a chamada novamente
        }

        const apiUrl = 'http://192.168.160.58/Paris2024/Help/Api/GET-api-Athletics-Events';

        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function (response) {
                // Atualiza a lista de eventos com os dados recebidos
                self.events(response);
                self.isDataLoaded(true); // Marca como carregado
            },
            error: function (error) {
                console.error("Erro ao carregar eventos:", error);
                alert("Ocorreu um erro ao carregar os eventos.");
            }
        });
    };

    // Inicializa a aplicação
    self.fetchEvents();
}

// Ativa o Knockout.js
$(document).ready(function () {
    ko.applyBindings(new MatchesViewModel());
});
