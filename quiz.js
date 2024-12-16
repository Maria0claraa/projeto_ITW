const quizData = [
    {
        question: "Onde ocorreram os primeiros Jogos Olímpicos da era moderna?",
        options: ["Paris", "Atenas", "Londres", "Roma"],
        answer: 1,
        image: "https://www.iol.pt/multimedia/oratvi/multimedia/imagem/id/570426c80cf279af1523f058/"
    },
    {
        question: "Qual país ganhou mais medalhas de ouro na história das Olimpíadas?",
        options: ["Estados Unidos", "Rússia", "China", "Alemanha"],
        answer: 0,
        image: "https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w960/f_auto/primary/w2wgqcuihbyha0xcj9zj"
    },
    {
        question: "Quem é o atleta mais medalhado da história das Olimpíadas?",
        options: ["Usain Bolt", "Michael Phelps", "Larisa Latynina", "Carl Lewis"],
        answer: 1,
        image: "https://conpaas.einzelnet.com/services/mediaservice/api/media/de195c5eaf9f72166b38dfd095c6f84ef508aa53"
    },
    {
        question: "Em que ano ocorreram os Jogos Olímpicos no Brasil?",
        options: ["2024", "2010", "2016", "2020"],
        answer: 2,
        image: "https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2024/07/10/987658393-brasil-olimpiadas.jpg"
    },
    {
        question: "Qual destas modalidades foi disputada nos primeiros Jogos Olímpicos da era moderna?",
        options: ["Triatlo", "Remo", "Vólei", "Esgrima"],
        answer: 3,
        image: "https://s2.glbimg.com/jNzszSMfnRzgDaqHU2z1tflFQ_Q=/smart/e.glbimg.com/og/ed/f/original/2016/06/15/exposicao-jogos-olimpicos-atenas21.jpg"
    },
    {
        question: "Qual é a cor dos anéis olímpicos que representam a África?",
        options: ["Preto", "Amarelo", "Verde", "Azul"],
        answer: 0,
        image: "https://cdn-images.rtp.pt/icm/noticias/images/f0/f03f5ba1efde99964fca612835c3e6cb?w=860&q=90&rect=38,0,1167,640"
    },
    {
        question: "Qual cidade sediou os Jogos Olímpicos de Inverno em 2014?",
        options: ["Pequim", "Turim", "Sochi", "Vancouver"],
        answer: 2,
        image: "https://zap.aeiou.pt/wp-content/uploads/2014/02/789f1253b4a110cabe3bab1d7e7361e3-783x450.jpg"
    },
    {
        question: "Quem acendeu a pira olímpica nos Jogos de Barcelona 1992?",
        options: ["Muhammad Ali", "Juan Antonio Samaranch", "Wayne Gretzky", "Antonio Rebollo"],
        answer: 3,
        image: "https://www.olimpiadatododia.com.br/wp-content/uploads/2020/05/15007411677834.jpg"
    },
    {
        question: "Quantos anéis tem o símbolo dos Jogos Olímpicos?",
        options: ["4", "5", "6", "7"],
        answer: 1,
        image: "https://thumbs.web.sapo.io/?W=800&H=0&delay_optim=1&epic=M2UyU3MCcOlkGH5AQiQ4v1oNq9XtD+tH/lTn6X7OpW0HXOMQLqXOLBRCDT1FQcGOJO1MBsgpiN6jzovyriJ4JjGQymiPzG9teYvR6puDK30gUAY="
    },
    {
        question: "Qual país sediou os Jogos Olímpicos de 2008?",
        options: ["Grécia", "China", "Austrália", "Estados Unidos"],
        answer: 1,
        image: "https://media.gazetadopovo.com.br/2008/08/fccb5456c0d4039bdc3cbfa9c6c37140-gpLarge.jpg"
    },
    {
        question: "Quem é conhecido como 'O Raio' no atletismo?",
        options: ["Carl Lewis", "Jesse Owens", "Michael Johnson", "Usain Bolt"],
        answer: 3,
        image: "https://cdn.atletis.com.br/atletis-website/base/1b3/181/24e/900-473-atletismo.jpg"
    },
    {
        question: "Quantos desportos fazem parte do programa olímpico de verão de 2024?",
        options: ["30", "32", "28", "35"],
        answer: 1,
        image: "https://fattirebiketours.com/app/uploads/2021/11/paris-olympics-eiffel-tower-2024.jpg"
    },
    {
        question: "Quem foi a primeira mulher a ganhar uma medalha olímpica?",
        options: ["Charlotte Cooper", "Larisa Latynina", "Nadia Comaneci", "Wilma Rudolph"],
        answer: 0,
        image: "https://a.espncdn.com/photo/2024/0724/r1362606_1296x729_16-9.jpg"
    },
    {
        question: "Qual país sediou os Jogos Olímpicos de 1964?",
        options: ["México", "Japão", "Austrália", "Reino Unido"],
        answer: 1,
        image: "https://img.olympics.com/images/image/private/t_16-9_760/f_auto/primary/fhqag8cplw7hmmw8zuyp"
    },
    {
        question: "Quantas medalhas de ouro Usain Bolt ganhou em sua carreira olímpica?",
        options: ["6", "7", "8", "9"],
        answer: 2,
        image: "https://jpimg.com.br/uploads/2017/04/2052345198-usain-bolt-conquistou-tres-medalhas-olimpicas.jpg"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const questionText = document.getElementById("question-text");
const questionImage = document.getElementById("question-image");
const optionsList = document.getElementById("options");
const feedback = document.getElementById("feedback");
const resultContainer = document.getElementById("result");
const quizContainer = document.getElementById("quiz");
const scoreText = document.getElementById("score");

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);

function startQuiz() {
    startButton.style.display = "none";
    document.getElementById("intro-text").style.display = "none";
    quizContainer.style.display = "block";
    loadQuestion();
}

function loadQuestion() {
    const questionData = quizData[currentQuestionIndex];
    questionText.textContent = questionData.question;
    questionImage.src = questionData.image;
    optionsList.innerHTML = "";
    feedback.textContent = "";
    nextButton.style.display = "none";

    questionData.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.textContent = option;
        li.addEventListener("click", () => checkAnswer(index, li));
        optionsList.appendChild(li);
    });
}

function checkAnswer(selectedIndex, selectedElement) {
    const correctAnswer = quizData[currentQuestionIndex].answer;

    // Desabilita todas as opções
    const options = document.querySelectorAll("#options li");
    options.forEach(option => option.style.pointerEvents = "none");

    if (selectedIndex === correctAnswer) {
        score++;
        selectedElement.style.backgroundColor = "green";
        feedback.textContent = "Resposta correta!";
        feedback.style.color = "green";
    } else {
        selectedElement.style.backgroundColor = "red";
        feedback.textContent = "Resposta errada!";
        feedback.style.color = "red";
        options[correctAnswer].style.backgroundColor = "green"; // Mostra a resposta correta
    }

    nextButton.style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    scoreText.textContent = `Você acertou ${score} de ${quizData.length} perguntas!`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.style.display = "none";
    startButton.style.display = "block";
    document.getElementById("intro-text").style.display = "block";
}