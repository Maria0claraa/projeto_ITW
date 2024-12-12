// matches.js

// ViewModel para os matches de atletismo
function MatchesViewModel() {
    const self = this;

    // Observables para a interface
    self.matches = ko.observableArray([]);
    self.currentPage = ko.observable(1);
    self.totalPages = ko.observable(1);
    self.totalRecords = ko.observable(0);
    self.pageSize = ko.observable(10);

    self.fromRecord = ko.computed(() => (self.currentPage() - 1) * self.pageSize() + 1);
    self.toRecord = ko.computed(() => Math.min(self.currentPage() * self.pageSize(), self.totalRecords()));

    // Computed para criar a lista de páginas
    self.pageArray = ko.computed(() => {
        const total = self.totalPages();
        const current = self.currentPage();
        const pages = [];

        const start = Math.max(1, current - 4);
        const end = Math.min(total, current + 4);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    });

    // Função para buscar os matches da API
    self.fetchMatches = function () {
        const apiUrl = 'http://192.168.160.58/Paris2024/Help/Api/GET-api-Athletics_EventId_StageId';
        const params = {
            page: self.currentPage(),
            pageSize: self.pageSize()
        };

        $.ajax({
            url: apiUrl,
            method: 'GET',
            data: params,
            success: function (response) {
                self.matches(response.data); // Atualiza a lista de matches
                self.totalRecords(response.totalRecords);
                self.totalPages(response.totalPages);
            },
            error: function (error) {
                console.error("Erro ao carregar matches:", error);
                alert("Ocorreu um erro ao carregar os dados.");
            }
        });
    };

    // Funções para navegação entre páginas
    self.previousPage = ko.computed(() => Math.max(1, self.currentPage() - 1));
    self.nextPage = ko.computed(() => Math.min(self.totalPages(), self.currentPage() + 1));

    self.goToPage = function (page) {
        if (page >= 1 && page <= self.totalPages()) {
            self.currentPage(page);
            self.fetchMatches();
        }
    };

    // Inicializa a aplicação
    self.fetchMatches();
}

// Ativa o Knockout.js
$(document).ready(function () {
    ko.applyBindings(new MatchesViewModel());
});