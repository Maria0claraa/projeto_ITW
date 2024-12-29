function vm() {
    var self = this;

    // Propriedades KO disponíveis 
    self.Nocs_info = ko.observableArray([]);
    self.totalPages = ko.observable(0);
    self.currentPage = ko.observable(0);
    self.totalNocs = ko.observable(0);
    self.fromRecord = ko.observable(0);
    self.toRecord = ko.observable(0);

    // Relativamente às páginas: 
    self.hasPreviousPage = ko.computed(() => {
        return self.currentPage() > 1;
    });
    self.hasNextPage = ko.computed(() => {
        return self.currentPage() < self.totalPages();
    });

    // Computed properties for adjacent pages
    self.previousPage = ko.computed(() => {
        return self.currentPage() > 1 ? self.currentPage() - 1 : 1;
    });
    self.nextPage = ko.computed(() => {
        return self.currentPage() < self.totalPages() ? self.currentPage() + 1 : self.totalPages();
    });

    const getQueryParams = () => {
        const params = new URLSearchParams(window.location.search);
        return {
            page: +params.get('page') || 1,
            pageSize: +params.get('pageSize') || 20,
            order: 1,
            search: params.get('q') || '',
        };
    };

    // Função para conseguir mudar de página 
    self.getPageHref = (page_number) => {
        const params = getQueryParams();
        const pageLink = './paises.html?' +
            'page=' + page_number +
            '&pageSize=' + params.pageSize +
            '&order=' + params.order +
            '&q=' + params.search;
        return pageLink;
    };

    // Função para atualizar os dados a mostrar em cada página
    self.inventory_populate = function () {
        const { page, pageSize, search, order } = getQueryParams();

        // Mostrar modal de carregamento
        showLoadingModal();

        // Para conseguir ir buscar a API
        fetch(`http://192.168.160.58/Paris2024/api/Nocs?page=${page}&pageSize=${pageSize}&order=${order}&search=${search}`, {
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
                self.Nocs_info(data.NOCs); // Atualiza o array observável com os dados NOCs
                self.currentPage(data.CurrentPage);
                self.totalPages(data.TotalPages);
                self.totalNocs(data.TotalNOCs); // Corrigido de TotalAhletes para TotalNOCs
                self.fromRecord((data.CurrentPage - 1) * data.PageSize + 1);
                self.toRecord(Math.min(data.TotalNOCs, data.CurrentPage * data.PageSize));
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

    // Cálculo do número da página anterior 
    self.previousPage = function () {
        return Math.max(1, self.currentPage() - 1);
    };

    // Função para saber a quantidade de páginas que deixamos visíveis 
    self.visiblePages = ko.computed(() => {
        const current = self.currentPage();
        const total = self.totalPages();
        const pages = [];

        // Adiciona as páginas antes da página atual (até 3 páginas)
        for (let i = current - 3; i < current; i++) {
            if (i >= 1) pages.push(i);
        }

        pages.push(current);

        // Adiciona as páginas depois da página atual (até 3 páginas)
        for (let i = current + 1; i <= current + 3; i++) {
            if (i <= total) pages.push(i);
        }
        return pages;
    });

    const searchQuery = getQueryParams().search;
    document.getElementById("input-query").value = searchQuery;
    self.inventory_populate();
}


const appElement = document.querySelector("#knockout-app");
const viewModel = new vm();
ko.applyBindings(viewModel, appElement);

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