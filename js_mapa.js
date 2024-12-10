// Inicializando o mapa
var map = L.map('olympics-map').setView([48.8566, 2.3522], 10); // Coordenadas iniciais para Paris

// Camada de mapa base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Locais das competições
var venues = [
    { name: "Trocadéro", sports: "Cerimónia de Abertura (partes protocolares)", lat: 48.8629, lon: 2.2888, capacity: "—" },
    { name: "Praça das Medalhas", sports: "Eventos comemorativos", lat: 48.8606, lon: 2.3376, capacity: "30,000" },
    { name: "Pont d'Iéna", sports: "Cerimônia de abertura, Ciclismo de Estrada, Maratona", lat: 48.8611, lon: 2.2973, capacity: "13,000" },
    { name: "Pont Alexandre III", sports: "Triatlo, Maratona Aquática", lat: 48.8632, lon: 2.3126, capacity: "3,000 (sentado)" },
    { name: "Estádio Torre Eiffel", sports: "Voleibol de praia", lat: 48.8584, lon: 2.2945, capacity: "12,000" },
    { name: "Grand Palais", sports: "Esgrima, Taekwondo", lat: 48.8663, lon: 2.3121, capacity: "8,000" },
    { name: "Praça da Concórdia", sports: "Basquetebol 3x3, Skateboarding, Breakdancing", lat: 48.8656, lon: 2.3211, capacity: "30,000" },
    { name: "Invalides", sports: "tiro com arco, tiro com arco adaptado", lat: 48.8569, lon: 2.3126, capacity: "6,000" },
    { name: "Parc des Princes", sports: "Futebol", lat: 48.8414, lon: 2.2530, capacity: "61,338" },
    { name: "Stade Roland Garros (Quadra Philippe Chatrier)", sports: "Tênis (principais)", lat: 48.8472, lon: 2.2496, capacity: "15,000" },
    { name: "Stade Roland Garros (Quadra Suzanne Lenglen)", sports: "Tênis (quartas)", lat: 48.8473, lon: 2.2507, capacity: "10,000" },
    { name: "Beicy Arena", sports: "Basquetebol (finais), Ginástica Artística", lat: 48.8522, lon: 2.2707, capacity: "15,000" },
    { name: "Estádio Jean-Bouin", sports: "Rugby Sevens", lat: 48.8416, lon: 2.2556, capacity: "20,000" },
    { name: "Stade de France", sports: "Atletismo, Cerimónia de Encerramento", lat: 48.9245, lon: 2.3602, capacity: "78,338" },
    { name: "Paris Aquatic Centre", sports: "Saltos Ornamentais, Natação Artística", lat: 48.8992, lon: 2.3589, capacity: "5,000" },
    { name: "L'Île-Saint-Denis", sports: "Vila Olímpica", lat: 48.9366, lon: 2.3558, capacity: "—" },
    { name: "Le Bourget", sports: "Escalada Desportiva", lat: 48.9313, lon: 2.4246, capacity: "3,000" },
    { name: "Porte de La Chapelle Arena", sports: "Badminton, Ginástica Rítmica", lat: 48.8982, lon: 2.3565, capacity: "8,000" },
    { name: "Palácio de Versalhes (Jardins)", sports: "Hipismo, Pentatlo Moderno", lat: 48.8049, lon: 2.1204, capacity: "30,000" },
    { name: "Le Golf National", sports: "Golf", lat: 48.7544, lon: 2.0657, capacity: "35,000" },
    { name: "Velódromo de Saint-Quentin-en-Yvelines", sports: "Ciclismo de Pista", lat: 48.7736, lon: 2.0343, capacity: "10,000" },
    { name: "Yves-du-Manoir Stadium", sports: "Hóquei em Campo", lat: 48.9239, lon: 2.2495, capacity: "14,000" },
    { name: "Vaires-sur-Marne", sports: "Remo, Canoagem", lat: 48.8596, lon: 2.6467, capacity: "22,000" },
    { name: "Porto de Marselha", sports: "Vela", lat: 43.2951, lon: 5.3619, capacity: "5,000" },
    { name: "Stade Vélodrome", sports: "Futebol", lat: 43.2699, lon: 5.3958, capacity: "67,394" },
    { name: "Teahupo'o", sports: "Surf", lat: -17.8362, lon: -149.2675, capacity: "5,000" }
];

var markers = {};

// Adicionando marcadores ao mapa e preenchendo o dicionário
venues.forEach(function (venue) {
    var marker = L.marker([venue.lat, venue.lon]).addTo(map)
        .bindPopup('<b>' + venue.name + '</b><br>' +
            'Desportes: ' + venue.sports + '<br>' +
            'Capacidade: ' + venue.capacity);

    // Dividindo os esportes para múltiplas palavras-chave
    venue.sports.split(", ").forEach(function (sport) {
        markers[sport.toLowerCase()] = marker;
    });
});

// Funcionalidade da barra de pesquisa
document.getElementById('search-button').addEventListener('click', function () {
    var query = document.getElementById('search-input').value.toLowerCase();
    if (markers[query]) {
        map.setView(markers[query].getLatLng(), 14);
        markers[query].openPopup();
    } else {
        alert("Desporto não encontrado!");
    }
});

// Ativar busca ao pressionar "Enter"
document.getElementById('search-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        document.getElementById('search-button').click();
    }
});