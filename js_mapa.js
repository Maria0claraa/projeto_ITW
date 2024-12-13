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
    .catch(error => {
        console.error('Erro ao carregar dados:', error);
        alert('Não foi possível carregar as localizações.');
    });
