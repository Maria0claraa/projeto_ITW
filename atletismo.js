document.addEventListener("DOMContentLoaded", () => {
    // URL da API
    const apiUrl = "http://192.168.160.58/Paris2024/api/Athletics/Events";

    // Elementos do DOM
    const competitionsContainer = document.querySelector(".accordion-body .button-container");
    const phasesContainer = document.querySelector(".competition-options");

    // Fetch data from API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Limpa os contêineres
            competitionsContainer.innerHTML = "";
            phasesContainer.innerHTML = "";

            // Itera sobre os eventos
            data.forEach(event => {
                // Cria botão para cada competição
                const competitionButton = document.createElement("button");
                competitionButton.className = "competition-button";
                competitionButton.textContent = event.EventName;
                competitionButton.dataset.target = `event-${event.EventId}-stages`;

                // Adiciona evento de clique para exibir as fases correspondentes
                competitionButton.addEventListener("click", () => {
                    // Remove destaque de outros botões
                    document.querySelectorAll(".competition-button").forEach(btn => {
                        btn.style.backgroundColor = '';
                        btn.style.color = '';
                    });

                    // Destaca o botão atual
                    competitionButton.style.backgroundColor = '#4ca1af';
                    competitionButton.style.color = 'white';

                    // Esconde todas as fases e exibe apenas as do evento selecionado
                    document.querySelectorAll(".competition-options").forEach(option => {
                        option.style.display = 'none';
                    });
                    const targetContainer = document.getElementById(`event-${event.EventId}-stages`);
                    if (targetContainer) {
                        targetContainer.style.display = 'block';
                    }
                });

                competitionsContainer.appendChild(competitionButton);

                // Cria contêiner para fases do evento
                const stagesContainer = document.createElement("div");
                stagesContainer.className = "competition-options";
                stagesContainer.id = `event-${event.EventId}-stages`;
                stagesContainer.style.display = "none";

                // Adiciona fases ao contêiner
                event.Stages.forEach(stage => {
                    const stageButton = document.createElement("button");
                    stageButton.className = "phase-button";
                    stageButton.textContent = stage.StageName;

                    // Adiciona evento de clique para destacar a fase selecionada
                    stageButton.addEventListener("click", () => {
                        document.querySelectorAll(".phase-button").forEach(btn => {
                            btn.style.backgroundColor = '';
                            btn.style.color = '';
                        });

                        stageButton.style.backgroundColor = '#4ca1af';
                        stageButton.style.color = 'white';
                    });

                    stagesContainer.appendChild(stageButton);
                });

                // Adiciona o contêiner de fases ao DOM
                phasesContainer.parentElement.appendChild(stagesContainer);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar os dados da API:", error);
        });
});
