// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Set active nav link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'ods-index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', setActiveNavLink);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Quiz functionality
let currentQuestion = 0;
let score = 0;
let answered = [];

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
        explanation: "O CVV atende pelo telefone 188, funcionando 24 horas, todos os dias.",
        category: "mental"
    }
];

// Mood Tracker
function initMoodTracker() {
    const emotions = document.querySelectorAll('.emotion-btn');
    const moodSlider = document.getElementById('moodSlider');
    const moodValue = document.getElementById('moodValue');
    const moodFeedback = document.getElementById('moodFeedback');

    if (emotions) {
        emotions.forEach(btn => {
            btn.addEventListener('click', function() {
                emotions.forEach(e => e.classList.remove('selected'));
                this.classList.add('selected');
                
                const emotion = this.dataset.emotion;
                showMoodFeedback(emotion);
            });
        });
    }

    if (moodSlider && moodValue) {
        moodSlider.addEventListener('input', function() {
            moodValue.textContent = this.value + '%';
            updateMoodMessage(this.value);
        });
    }
}

function showMoodFeedback(emotion) {
    const messages = {
        'Feliz': 'Continue cultivando essa sensação positiva! ✨',
        'Calmo': 'Que maravilha estar em paz. Aproveite esse momento. 🌊',
        'Triste': 'Tudo bem não estar bem. Considere conversar com alguém de confiança. 💙',
        'Ansioso': 'Respire fundo. Tente práticas de mindfulness. 🌸',
        'Irritado': 'É válido sentir raiva. Encontre formas saudáveis de expressá-la. 🎯',
        'Cansado': 'Descanse. Seu corpo e mente precisam de recuperação. 😴'
    };

    const feedback = document.getElementById('emotionFeedback');
    if (feedback) {
        feedback.innerHTML = `
            <div class="mood-feedback">
                <p>É normal sentir-se ${emotion.toLowerCase()}. Suas emoções são válidas.</p>
                <p class="feedback-message">${messages[emotion]}</p>
            </div>
        `;
    }
}

function updateMoodMessage(value) {
    const feedback = document.getElementById('sliderFeedback');
    if (feedback) {
        let message = '';
        if (value < 30) {
            message = 'Se está difícil, não hesite em buscar ajuda profissional.';
        } else if (value < 70) {
            message = 'Pequenos passos fazem diferença. Continue cuidando de si.';
        } else {
            message = 'Ótimo! Continue praticando o autocuidado.';
        }
        feedback.textContent = message;
    }
}

// Actions Checklist
function initActionsChecklist() {
    const checkboxes = document.querySelectorAll('.action-checkbox');
    const savedActions = JSON.parse(localStorage.getItem('completedActions') || '[]');
    
    // Load saved state
    checkboxes.forEach(checkbox => {
        if (savedActions.includes(checkbox.dataset.actionId)) {
            checkbox.checked = true;
            checkbox.closest('.action-card').classList.add('completed');
        }
    });

    // Handle checkbox changes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const actionId = this.dataset.actionId;
            let completed = JSON.parse(localStorage.getItem('completedActions') || '[]');
            
            if (this.checked) {
                if (!completed.includes(actionId)) {
                    completed.push(actionId);
                }
                this.closest('.action-card').classList.add('completed');
            } else {
                completed = completed.filter(id => id !== actionId);
                this.closest('.action-card').classList.remove('completed');
            }
            
            localStorage.setItem('completedActions', JSON.stringify(completed));
            updateProgress();
        });
    });

    updateProgress();
}

function updateProgress() {
    const total = document.querySelectorAll('.action-checkbox').length;
    const completed = document.querySelectorAll('.action-checkbox:checked').length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const progressPercent = document.getElementById('progressPercent');

    if (progressBar) progressBar.style.width = percentage + '%';
    if (progressText) progressText.textContent = `${completed} de ${total} ações completadas`;
    if (progressPercent) progressPercent.textContent = percentage + '%';
}

// Initialize functions on page load
document.addEventListener('DOMContentLoaded', () => {
    initMoodTracker();
    initActionsChecklist();
});
