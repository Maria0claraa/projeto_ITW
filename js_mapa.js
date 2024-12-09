// Inicializar o mapa
var map = L.map('olympics-map').setView([48.8566, 2.3522], 12); // Paris (latitude, longitude) e zoom inicial

// Adicionar uma camada de mapa de fundo (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Adicionar marcadores para os locais dos Jogos Olímpicos (coordenadas de exemplo)
var venues = [
    { name: 'Estádio Olímpico', lat: 48.8584, lon: 2.2945 },
    { name: 'Arena de Basquete', lat: 48.8566, lon: 2.3522 },
    { name: 'Pista de Atletismo', lat: 48.8738, lon: 2.2950 }
];

// Criar marcadores e adicioná-los ao mapa
venues.forEach(function (venue) {
    L.marker([venue.lat, venue.lon])
        .addTo(map)
        .bindPopup('<b>' + venue.name + '</b><br>Local dos Jogos Olímpicos 2024')
        .openPopup();
});
var customIcon = L.icon({
    iconUrl: 'https://example.com/path-to-your-icon.png',
    iconSize: [32, 32]
});

L.marker([48.8566, 2.3522], { icon: customIcon }).addTo(map);
L.marker([48.8566, 2.3522])
    .addTo(map)
    .bindPopup('<b>Estádio Olímpico</b><br>Evento: Atletismo<br><a href="https://www.example.com">Mais Informações</a>')
    .openPopup();
