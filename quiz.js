// Quiz Data
const quizQuestions = [
    {
        question: "Qual porcentagem das mulheres no mundo já sofreu violência física ou sexual?",
        options: ["1 em 10", "1 em 5", "1 em 3", "1 em 2"],
        correct: 2,
        explanation: "Segundo a OMS, 1 em cada 3 mulheres (35%) já sofreu violência física ou sexual na vida.",
        category: "gender"
    },
    {
        question: "Qual é a diferença salarial média entre homens e mulheres no Brasil?",
        options: ["5%", "10%", "20%", "30%"],
        correct: 2,
        explanation: "Mulheres ganham em média 20% menos que homens para a mesma função no Brasil.",
        category: "gender"
    },
    {
        question: "Quantas pessoas no mundo vivem com depressão?",
        options: ["50 milhões", "130 milhões", "264 milhões", "500 milhões"],
        correct: 2,
        explanation: "Segundo a OMS, mais de 264 milhões de pessoas de todas as idades sofrem de depressão.",
        category: "mental"
    },
    {
        question: "O que NÃO ajuda a melhorar a saúde mental?",
        options: ["Exercício físico", "Isolamento social", "Sono adequado", "Conexões sociais"],
        correct: 1,
        explanation: "O isolamento social prolongado prejudica a saúde mental. Conexões sociais são essenciais.",
        category: "mental"
    },
    {
        question: "Qual percentual de assentos parlamentares no mundo são ocupados por mulheres?",
        options: ["10%", "26%", "40%", "50%"],
        correct: 1,
        explanation: "Apenas 26% dos assentos parlamentares no mundo são ocupados por mulheres.",
        category: "gender"
    },
    {
        question: "Qual é o número do CVV para apoio emocional?",
        options: ["180", "188", "190", "192"],
        correct: 1,
        explanation: "O CVV atende pelo telefone 188, funcionando 24 horas, todos as dias.",
        category: "mental"
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function loadQuestion() {
    if (!quizQuestions[currentQuestion]) {
        console.error('Questão não encontrada');
        return;
    }
    
    const question = quizQuestions[currentQuestion];
    
    // Update progress
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    const progressBar = document.getElementById('quizProgressBar');
    const questionNumber = document.getElementById('questionNumber');
    const progressPercent = document.getElementById('progressPercent');
    
    if (progressBar) progressBar.style.width = progress + '%';
    if (questionNumber) questionNumber.textContent = `Questão ${currentQuestion + 1} de ${quizQuestions.length}`;
    if (progressPercent) progressPercent.textContent = Math.round(progress) + '%';
    
    // Update score
    const scoreValue = document.getElementById('scoreValue');
    if (scoreValue) scoreValue.textContent = `${score}/${currentQuestion}`;
    
    // Update category
    const categoryEl = document.getElementById('questionCategory');
    if (categoryEl) {
        if (question.category === 'gender') {
            categoryEl.textContent = '🔷 Igualdade de Gênero';
            categoryEl.className = 'question-category category-gender';
        } else {
            categoryEl.textContent = '💜 Saúde Mental';
            categoryEl.className = 'question-category category-mental';
        }
    }
    
    // Update question
    const questionText = document.getElementById('questionText');
    if (questionText) questionText.textContent = question.question;
    
    // Create options
    const optionsContainer = document.getElementById('optionsContainer');
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `<span>${option}</span>`;
            btn.onclick = () => selectAnswer(index);
            optionsContainer.appendChild(btn);
        });
    }
    
    // Reset state
    const explanation = document.getElementById('explanation');
    const nextBtn = document.getElementById('nextBtn');
    const quizHint = document.getElementById('quizHint');
    
    if (explanation) explanation.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    if (quizHint) quizHint.style.display = 'block';
    
    answered = false;
}

function selectAnswer(index) {
    if (answered) return;
    
    answered = true;
    const question = quizQuestions[currentQuestion];
    const options = document.querySelectorAll('.option-btn');
    const isCorrect = index === question.correct;
    
    // Disable all options
    options.forEach(opt => opt.disabled = true);
    
    // Mark correct answer
    if (options[question.correct]) {
        options[question.correct].classList.add('correct');
        options[question.correct].innerHTML += '<span class="option-icon">✓</span>';
    }
    
    // Mark wrong answer if incorrect
    if (!isCorrect && options[index]) {
        options[index].classList.add('incorrect');
        options[index].innerHTML += '<span class="option-icon">✗</span>';
    } else {
        score++;
    }
    
    // Show explanation
    const explanationEl = document.getElementById('explanation');
    if (explanationEl) {
        explanationEl.className = isCorrect ? 'explanation correct' : 'explanation info';
        explanationEl.innerHTML = `
            <span class="explanation-label">${isCorrect ? '✅ Correto!' : '📚 Saiba mais:'}</span>
            <p>${question.explanation}</p>
        `;
        explanationEl.style.display = 'block';
    }
    
    // Show next button
    const nextBtn = document.getElementById('nextBtn');
    const quizHint = document.getElementById('quizHint');
    
    if (nextBtn) nextBtn.style.display = 'block';
    if (quizHint) quizHint.style.display = 'none';
    
    // Update score
    const scoreValue = document.getElementById('scoreValue');
    if (scoreValue) scoreValue.textContent = `${score}/${currentQuestion + 1}`;
}

function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < quizQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    
    const questionCard = document.getElementById('questionCard');
    const nextBtn = document.getElementById('nextBtn');
    const quizHint = document.getElementById('quizHint');
    const resultsEl = document.getElementById('quizResults');
    
    if (questionCard) questionCard.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    if (quizHint) quizHint.style.display = 'none';
    if (resultsEl) resultsEl.style.display = 'block';
    
    const finalScore = document.getElementById('finalScore');
    const resultsMessage = document.getElementById('resultsMessage');
    
    if (finalScore) finalScore.textContent = `${score}/${quizQuestions.length}`;
    if (resultsMessage) resultsMessage.textContent = `Você acertou ${percentage}% das questões!`;
    
    // Feedback based on score
    const feedbackEl = document.getElementById('resultsFeedback');
    if (feedbackEl) {
        if (percentage >= 80) {
            feedbackEl.className = 'results-feedback feedback-excellent';
            feedbackEl.innerHTML = '🎉 Excelente! Você conhece muito bem os temas das ODSs!';
        } else if (percentage >= 50) {
            feedbackEl.className = 'results-feedback feedback-good';
            feedbackEl.innerHTML = '👏 Muito bom! Continue aprendendo sobre esses temas importantes!';
        } else {
            feedbackEl.className = 'results-feedback feedback-try-again';
            feedbackEl.innerHTML = '💪 Há muito a aprender! Explore mais sobre igualdade de gênero e saúde mental!';
        }
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;
    
    const questionCard = document.getElementById('questionCard');
    const resultsEl = document.getElementById('quizResults');
    
    if (questionCard) questionCard.style.display = 'block';
    if (resultsEl) resultsEl.style.display = 'none';
    
    loadQuestion();
}

function shareScore() {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const text = `Acertei ${score} de ${quizQuestions.length} perguntas no Quiz sobre ODS! Teste seus conhecimentos em igualdade de gênero e saúde mental. 🌍💜`;
    
    if (navigator.share) {
        navigator.share({ text: text })
            .catch(err => console.log('Erro ao compartilhar:', err));
    } else {
        navigator.clipboard.writeText(text)
            .then(() => alert('Texto copiado para a área de transferência!'))
            .catch(err => console.log('Erro ao copiar:', err));
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('Quiz carregado!');
    console.log('Total de questões:', quizQuestions.length);
    
    // Carregar primeira questão
    loadQuestion();
    
    // Configurar botão next
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.onclick = nextQuestion;
        console.log('Botão Next configurado');
    } else {
        console.error('Botão Next não encontrado!');
    }
});
