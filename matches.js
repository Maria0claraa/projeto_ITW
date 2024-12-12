// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    // Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/paris2024/api/athletics');
    self.displayName = 'Paris 2024 Athletics';
    self.records = ko.observableArray([]);

    // Função para buscar os dados da API
    self.activate = function (id) {
        console.log('CALL: getAthletics...');
        var composedUri = self.baseUri();

        ajaxHelper(composedUri, 'GET')
            .done(function (data) {
                console.log('Dados recebidos:', data);
                self.records(data);
                self.error(''); // Limpa erros anteriores, se existirem
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Erro ao buscar dados:', textStatus, errorThrown);
                self.error('Erro ao carregar os dados. Por favor, tente novamente mais tarde.');
            });
    };

    // Inicialização
    self.activate = function () {
        self.getAthletics();
    };

    // Chamar a função de ativação ao carregar
    self.activate();
    console.log('ViewModel initialized!');
};

 // Função AJAX Helper
 function ajaxHelper(uri, method, data) {
    return $.ajax({
        type: method,
        url: uri,
        dataType: 'json',
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : null,
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(`AJAX Call [${uri}] Failed:`, textStatus, errorThrown);
        }
    });
}

// Aplicação de Bindings ao carregar a página
$(document).ready(function () {
    console.log('Document ready!');
    ko.applyBindings(new vm());
});