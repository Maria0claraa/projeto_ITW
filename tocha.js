
const map = L.map('map').setView([37.6385, 21.6247], 7); // Coordenadas centradas entre Olympia e Atenas


// Adicionando camada de mapa base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Elemento para exibir informações ao passar o mouse
const hoverInfo = document.getElementById('hover-info');

// URL da API
const apiUrl = 'http://192.168.160.58/Paris2024/API/Torch_route';

// Array para armazenar as coordenadas
const coordinates = [];

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
            const { Lat, Lon, Title, City, Date_start, Date_end } = location;

            // Criar um marcador apenas se Lat e Lon forem válidos
            if (Lat && Lon) {
                const latLon = [parseFloat(Lat), parseFloat(Lon)];
                coordinates.push(latLon); // Armazenar coordenadas no array

                const marker = L.marker(latLon).addTo(map);

                // Formatar datas
                const startDate = new Date(Date_start).toLocaleString();
                const endDate = new Date(Date_end).toLocaleString();

                // Adicionar eventos de mouse (hover)
                marker.on('mouseover', (e) => {
                    hoverInfo.style.display = 'block';
                    hoverInfo.innerHTML = `
                        <strong>${Title}</strong><br>
                        <strong>City:</strong> ${City}<br>
                        <strong>Start:</strong> ${startDate}<br>
                        <strong>End:</strong> ${endDate}
                    `;
                    hoverInfo.style.left = e.originalEvent.pageX + 'px';
                    hoverInfo.style.top = e.originalEvent.pageY + 'px';
                });

                marker.on('mouseout', () => {
                    hoverInfo.style.display = 'none';
                });

                // Adicionar evento de click com popup
                marker.bindPopup(`
                    <b>${Title}</b><br>
                    City: ${City}<br>
                    Start: ${startDate}<br>
                    End: ${endDate}
                `);
            }
        });

        // Adicionar a linha preta conectando todas as localizações
        if (coordinates.length > 1) {
            L.polyline(coordinates, { color: 'black', weight: 2 }).addTo(map);
        }
    })
    .catch(error => {
        console.error('Erro ao carregar dados:', error);
        alert('Não foi possível carregar as localizações.');
    });
