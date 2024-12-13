function ViewModel() {
    const self = this;

    // Observables para controlar os dados e a navegação
    self.baseUri = ko.observable('http://192.168.160.58/Paris2024/API/athletes');
    self.pagesize = ko.observable(20); // Tamanho da página
    self.currentPage = ko.observable(1); // Página atual
    self.totalRecords = ko.observable(0); // Total de registros
    self.athletes = ko.observableArray([]); // Lista de atletas
    self.hasPrevious = ko.observable(false); // Botão "Anterior"
    self.hasNext = ko.observable(false); // Botão "Próxima"
    self.error = ko.observable(''); // Mensagens de erro

    // Função para buscar dados da API
    self.activate = function (page) {
        console.log(`Fetching data for page ${page}...`);
        const uri = `${self.baseUri()}?page=${page}&pageSize=${self.pagesize()}`;
        console.log(`Request URI: ${uri}`);

        $.ajax({
            url: uri,
            type: 'GET',
            contentType: 'application/json',
            success: function (data) {
                console.log('Data fetched successfully:', data);

                // Verifica se os dados retornados possuem as propriedades esperadas
                if (data && data.Athletes) {
                    self.athletes(data.Athletes); // Atualiza a lista de atletas
                    self.currentPage(data.CurrentPage || 1); // Página atual
                    self.totalRecords(data.TotalAthletes || data.TotalAhletes || 0); // Total de atletas
                    self.hasPrevious(data.HasPrevious || false); // Existe página anterior
                    self.hasNext(data.HasNext || false); // Existe próxima página
                } else {
                    console.error('Unexpected data format:', data);
                    self.error('Unexpected data format received.');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(`Error fetching data: ${textStatus}`, jqXHR);
                self.error(`Error: ${textStatus} - ${errorThrown}`);
            }
        });
    };

    // Navegação para a página anterior
    self.previousPage = function () {
        if (self.hasPrevious()) {
            self.activate(self.currentPage() - 1);
        }
    };

    // Navegação para a próxima página
    self.nextPage = function () {
        if (self.hasNext()) {
            self.activate(self.currentPage() + 1);
        }
    };

    // Inicializa a primeira página
    self.activate(self.currentPage());
}

// Inicializa o Knockout.js
$(document).ready(function () {
    ko.applyBindings(new ViewModel());
});
