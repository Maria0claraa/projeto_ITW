function vm() {
    var self = this;

    // Propriedades KO disponíveis
    self.teams_info = ko.observableArray([]);
    self.totalPages = ko.observable(0);
    self.currentPage = ko.observable(1);
    self.totalTeams = ko.observable(0);
    self.fromRecord = ko.observable(0);
    self.toRecord = ko.observable(0);

    // Função para obter parâmetros da query string
    const getQueryParams = () => {
        const params = new URLSearchParams(window.location.search);
        return {
            page: +params.get('page') || 1, // Convertendo para número
            pageSize: +params.get('pageSize') || 20,
            order: params.get('order') || '',
            search: params.get('q') || ''
        };
    };

    // Função para atualizar os dados a mostrar em cada página
    self.inventory_populate = function () {
        const { page, pageSize, search, order } = getQueryParams();

        // Para conseguir ir buscar a API
        fetch(`http://192.168.160.58/Paris2024/api/Teams?page=${page}&pageSize=${pageSize}&order=${order}&search=${search}`, {
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
            const formattedData = data.Teams.map(team => ({
                ...team,
                // Aqui você pode formatar os dados conforme necessário
            }));

            // Atualização dos dados
            self.teams_info(formattedData);
            self.currentPage(data.CurrentPage);
            self.totalPages(data.TotalPages);
            self.totalTeams(data.TotalTeams);
            self.fromRecord((data.CurrentPage - 1) * data.PageSize + 1);
            self.toRecord(Math.min(data.TotalTeams, data.CurrentPage * data.PageSize));
        })
        .catch(error => {
            console.error('Houve um problema com a operação de fetch:', error);
        });
    };

    // Função para mudar de página
    self.getPageHref = (page_number) => {
        const params = getQueryParams();
        return `equipas.html?page=${page_number}&pageSize=${params.pageSize}&order=${params.order}&q=${params.search}`;
    };

    // Propriedades computadas para navegação entre páginas
    self.hasPreviousPage = ko.computed(() => {
        return self.currentPage() > 1;
    });
    self.hasNextPage = ko.computed(() => {
        return self.currentPage() < self.totalPages();
    });
    self.previousPage = ko.computed(() => {
        return self.currentPage() > 1 ? self.currentPage() - 1 : 1;
    });
    self.nextPage = ko.computed(() => {
        return self.currentPage() < self.totalPages() ? self.currentPage() + 1 : self.totalPages();
    });

    // Propriedade computada para páginas visíveis
    self.visiblePages = ko.computed(() => {
        const totalPages = self.totalPages();
        const currentPage = self.currentPage();
        const visiblePages = [];

        for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
            visiblePages.push(i);
        }
        return visiblePages;
    });

    // Inicializa a população de dados
    self.inventory_populate();
}

const appElement = document.querySelector("#knockout-app");
const viewModel = new vm();
ko.applyBindings(viewModel, appElement);
