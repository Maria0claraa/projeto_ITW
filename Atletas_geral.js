function vm() {
    var self = this;

    // propriedade KO disponiveis 
    self.athletes_info = ko.observableArray([]);
    self.totalPages = ko.observable(0);
    self.currentPage = ko.observable(0);
    self.totalAhletes = ko.observable(0);
    self.fromRecord = ko.observable(0);
    self.toRecord = ko.observable(0);

    // relativamente ás páginas : 
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
            page: +params.get('page') || 1, // estamos a usar o operador + para conseguir converter strings para números 
            pageSize: +params.get('pageSize') || 20,
            order: 1,
            search: params.get('q') || '', //significa que se não pesquisarmos nada é como se tivesse-mos uma pesquisa vazia 
        };
    };


    //função para conseguir mudar de página 
    self.getPageHref = (page_number) => {
        const params = getQueryParams();
        const pageLink = './Atletas_geral.html?' +
            // nº de página
            'page=' + page_number +
            // tamanho da página
            '&pageSize=' + params.pageSize +
            // ordem 
            '&order=' + params.order +
            // pesquisa (se houver)
            '&q=' + params.search;
        return pageLink; //retornamos o link completo 
    };


    // função para atualizar os dados a mostrar em cada página
    self.inventory_populate = function () {

        const { page, pageSize, search, order } = getQueryParams();

        // Para conseguir ir buscar a api
        fetch(`http://192.168.160.58/Paris2024/api/Athletes?page=${page}&pageSize=${pageSize}&order=${order}&search=${search}`, {
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
                const formattedData = data.Athletes.map(athlete => ({
                    ...athlete,
                    BirthDate: athlete.BirthDate.split('T')[0] // de maneira a ter apenas a data de nascimento
                }));

                // atualização dos dados
                self.athletes_info(formattedData);
                self.currentPage(data.CurrentPage);
                self.totalPages(data.TotalPages);
                self.totalAhletes(data.TotalAhletes);
                self.fromRecord((data.CurrentPage - 1) * data.PageSize + 1);
                self.toRecord(Math.min(data.TotalAhletes, data.CurrentPage * data.PageSize));
            })

            //caso haja algum problema
            .catch(error => {
                console.error('Houve um problema com a operação de fetch:', error);
            });
    };

    // Função para adicionar um atleta aos favoritos
self.addToFavorites = function(athleteId) {
    // Obtém os favoritos atuais do localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Verifica se o atleta já está nos favoritos
    if (!favorites.includes(athleteId)) {
        // Adiciona o atleta aos favoritos
        favorites.push(athleteId);
        // Atualiza o localStorage com os novos favoritos
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
};


    //Calculo do numero da página anterior 
    self.previousPage = function () {
        return Math.max(1, self.currentPage() - 1);
    };

    // função para saber a quantidade de páginas que deixamos visiveis 
    self.visiblePages = ko.computed(() => {
        const current = self.currentPage();
        const total = self.totalPages();
        const pages = [];

        // Adiciona as páginas antes da página atual (até 3 páginas)
        for (let i = current - 3; i < current; i++) {
            if (i >= 1) pages.push(i);// fazemos isto para não dar para adicionar páginas antes da primeira
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

// Função para carregar os favoritos
function loadFavorites() {
    // Obtém os IDs dos atletas favoritos do localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Para cada ID de atleta favorito, você pode buscar as informações dele
    favorites.forEach(athleteId => {
        // Aqui você deve fazer a requisição para buscar os dados do atleta com esse ID
        // Pode ser uma requisição para a API, ou você pode ter os dados já carregados
        fetch(`http://192.168.160.58/Paris2024/api/Athletes/${athleteId}`)
            .then(response => response.json())
            .then(data => {
                // Aqui você pode adicionar os dados do atleta aos favoritos na interface
                displayFavoriteAthlete(data);
            })
            .catch(error => console.error('Erro ao carregar atleta favorito:', error));
    });
}

// Função para exibir um atleta favorito
function displayFavoriteAthlete(athlete) {
    const favoriteContainer = document.getElementById('favorite-athletes-container');

    const athleteCard = document.createElement('div');
    athleteCard.classList.add('card', 'mb-3');
    athleteCard.innerHTML = `
        <img src="${athlete.PhotoUrl}" class="card-img-top" alt="${athlete.Name}">
        <div class="card-body">
            <h5 class="card-title">${athlete.Name}</h5>
        </div>
    `;
    favoriteContainer.appendChild(athleteCard);
}

// Carrega os favoritos quando a página for carregada
document.addEventListener('DOMContentLoaded', loadFavorites);
