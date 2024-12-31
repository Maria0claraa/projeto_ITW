document.addEventListener("DOMContentLoaded", () => {
    // URL da API para colocar os eventos e fases no accordion
    const apiUrl = "http://192.168.160.58/Paris2024/api/Cycling_Tracks/Events";

    // Uma maneira de conseguir aceder aos locais onde vamos ter os botões 
    const competitionsContainer = document.querySelector(".accordion-body .button-container");
    const phasesContainer = document.querySelector(".competition-options");
    const resultsTableBody = document.querySelector("tbody[data-bind='foreach: atheletics_info']");

    // Buscra os dados da API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Limpa os containers
            competitionsContainer.innerHTML = "";
            phasesContainer.innerHTML = "";

            // Para conseguir buscar cada evento 
            data.forEach(event => {
                // Cria botão para cada competição - desta maneira criamos um botão automaticamente para cada competição 
                const competitionButton = document.createElement("button");
                competitionButton.className = "competition-button";
                competitionButton.textContent = event.EventName; // o que vai aparecer no botão 
                competitionButton.dataset.eventId = event.EventId; //o que fica guardado para usar depois 

                // adicionar um evento de click para quando clicarmos num evento ele ficar com outra cor, e apresentar as fases do evento , e apresentar as coisas na tabela 
                competitionButton.addEventListener("click", () => {
                    // primeiro remove-mos os destaques de outros botões
                    document.querySelectorAll(".competition-button").forEach(btn => {
                        btn.style.backgroundColor = '';
                        btn.style.color = '';
                    });

                    // em segundo vamos destacar o botão em que clicamos 
                    competitionButton.style.backgroundColor = '#4ca1af';
                    competitionButton.style.color = 'white';

                    // quando é clicado vamos "esconder" todas as fases que não pertencem a este evento
                    document.querySelectorAll(".competition-options").forEach(option => {
                        option.style.display = 'none';
                    });

                    // damos reset á fase que foi selecionada anteriormente 
                    document.querySelectorAll(".phase-button").forEach(btn => {
                        btn.style.backgroundColor = '';
                        btn.style.color = '';
                    });

                    // criamos um container para exibir as fases do evento que foi selecionado 
                    const stagesContainer = document.createElement("div");
                    stagesContainer.className = "competition-options";
                    stagesContainer.id = `stages-${event.EventId}`;
                    stagesContainer.style.display = "block";

                    // Adicionar as fases ao container com a classe selecionada 
                    event.Stages.forEach(stage => {
                        const stageButton = document.createElement("button");
                        stageButton.className = "phase-button";
                        stageButton.textContent = stage.StageName;
                        stageButton.dataset.stageId = stage.StageId; // Guardamos o id para depois poder usar 

                        // Adicionamos um evento de click ao selecionar a fase, para que 
                        stageButton.addEventListener("click", () => {
                            // Resetar a fase selecionada
                            document.querySelectorAll(".phase-button").forEach(btn => {
                                btn.style.backgroundColor = '';
                                btn.style.color = '';
                            });

                            // destacamos o botão da fase atual 
                            stageButton.style.backgroundColor = '#4ca1af';
                            stageButton.style.color = 'white';

                            // Agora podemos chamar a api do evento 
                            fetch(`http://192.168.160.58/Paris2024/api/Cycling_Tracks?EventId=${competitionButton.dataset.eventId}&StageId=${stageButton.dataset.stageId}`)
                                .then(response => response.json())
                                .then(results => {
                                    // Limpa a tabela antes de adicionar novos resultados
                                    resultsTableBody.innerHTML = "";

                                    // Adiciona os resultados à tabela
                                    results.forEach(result => {
                                        
                                        const row = document.createElement("tr");
                                        row.innerHTML = `
                                            <td class="align-middle">${result.EventName}</td>
                                            <td class="align-middle">${result.StageName}</td>
                                            <td class="align-middle">${result.Sex}</td>
                                            <td class="align-middle">${result.ParticipantName}</td>
                                            <td class="align-middle">${result.CountryName}</td>
                                            <td class="text-end">
                                                <a class="btn btn-default btn-light btn-xs" href="detalhes_ciclismo.html?id=${result.Id}">
                                                    <i class="fa fa-eye" title="Show details"></i>
                                                </a>
                                                <button class="btn btn-default btn-xs" onclick="addToFavorites(${result.ParticipantCode})">
                                                    <i class="fa fa-heart-o" title="Add to favorites"></i>
                                                </button>
                                            </td>
                                        `;
                                        resultsTableBody.appendChild(row);
                                    });
                                })
                                .catch(error => {
                                    console.error("Erro ao buscar os dados da API:", error);
                                });
                        });

                        stagesContainer.appendChild(stageButton);
                    });

                    // Adiciona o contêiner de fases ao DOM
                    phasesContainer.parentElement.appendChild(stagesContainer);
                });

                competitionsContainer.appendChild(competitionButton);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar os dados da API:", error);
        });
});