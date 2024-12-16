const map = L.map('map').setView([48.8566, 2.3522], 5); // Coordenadas iniciais (Paris)

// Adicionando camada de mapa base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Elemento para exibir informações ao passar o mouse
const hoverInfo = document.getElementById('hover-info');

// URL da API
const apiUrl = 'http://192.168.160.58/Paris2024/API/Venues';

// Fetch dos dados da API e adição de marcadores ao mapa
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar dados da API');
        }
        return response.json();
    })
    .then(data => {
        data.forEach(location => {
            const { Lat, Lon, Name, DateStart, DateEnd, NumSports } = location;

            // Criar um marcador apenas se Lat e Lon forem válidos
            if (Lat && Lon) {
                const marker = L.marker([parseFloat(Lat), parseFloat(Lon)]).addTo(map);

                // Formatar datas
                const startDate = new Date(DateStart).toLocaleString();
                const endDate = new Date(DateEnd).toLocaleString();

                // Adicionar eventos de mouse (hover)
                marker.on('mouseover', (e) => {
                    hoverInfo.style.display = 'block';
                    hoverInfo.innerHTML = `
                        <strong>${Name}</strong><br>
                        <strong>Start:</strong> ${startDate}<br>
                        <strong>End:</strong> ${endDate}<br>
                        <strong>Categories:</strong> ${NumSports} sports
                    `;
                    hoverInfo.style.left = e.originalEvent.pageX + 'px';
                    hoverInfo.style.top = e.originalEvent.pageY + 'px';
                });

                marker.on('mouseout', () => {
                    hoverInfo.style.display = 'none';
                });

                // Adicionar evento de click com popup
                marker.bindPopup(`
                    <b>${Name}</b><br>
                    Start: ${startDate}<br>
                    End: ${endDate}<br>
                    Categories: ${NumSports} sports
                `);
            }
        });
    })
// Função para mostrar o modal de carregamento
function showLoadingModal() {
    var myModal = new bootstrap.Modal(document.getElementById('myModal'));
    myModal.show();

    // Simula o tempo de carregamento de dados (por exemplo, 3 segundos)
    setTimeout(function () {
        myModal.hide();
        loadMapData();
    }, 500);
}

// Função para carregar dados no mapa (simulada)
function loadMapData() {
    // Inicializa o mapa com Leaflet
    var map = L.map('map').setView([48.8566, 2.3522], 13); // Coordenadas de Paris

    // Adiciona o layer de mapa (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Exemplo de um marcador em Paris
    L.marker([48.8566, 2.3522]).addTo(map)
        .bindPopup('Bem-vindo às Olimpíadas Paris 2024!')
        .openPopup();
}

// Chama a função para mostrar o modal e carregar os dados
document.addEventListener('DOMContentLoaded', function () {
    showLoadingModal();
});
// Função para mostrar o modal de carregamento
function showLoadingModal() {
    var myModal = new bootstrap.Modal(document.getElementById('myModal'));
    myModal.show();

    // Simula o tempo de carregamento de dados (por exemplo, 3 segundos)
    setTimeout(function () {
        myModal.hide();
        loadMapData();
    }, 500);
}

// Função para carregar dados no mapa (simulada)
function loadMapData() {
    // Inicializa o mapa com Leaflet
    var map = L.map('map').setView([48.8566, 2.3522], 13); // Coordenadas de Paris

    // Adiciona o layer de mapa (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Exemplo de um marcador em Paris
    L.marker([48.8566, 2.3522]).addTo(map)
        .bindPopup('Bem-vindo às Olimpíadas Paris 2024!')
        .openPopup();
}

// Chama a função para mostrar o modal e carregar os dados
document.addEventListener('DOMContentLoaded', function () {
    showLoadingModal();
});