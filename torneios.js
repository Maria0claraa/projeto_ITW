function vm() {
    var self = this;

    // Propriedades KO disponíveis
    self.sports_info = ko.observableArray([]);

    // Função para atualizar os dados a mostrar
    self.inventory_populate = function () {
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
                self.sports_info(data);
            })
            .catch(error => {
                console.error('Houve um problema com a operação de fetch:', error);
            });
    };

    // Inicializa a função para popular os dados
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
    }, 500);
}

// Chama a função para mostrar o modal ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    showLoadingModal();
});