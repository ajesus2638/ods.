// Actions Data
const actions = [
    {
        id: "1",
        title: "Questione estereótipos de gênero",
        description: "Observe e questione comentários sexistas no dia a dia, seja na família, trabalho ou redes sociais.",
        difficulty: "easy",
        category: "gender",
        impact: "Mudança cultural"
    },
    {
        id: "2",
        title: "Pratique 5 minutos de mindfulness",
        description: "Dedique 5 minutos do seu dia para respiração consciente e meditação.",
        difficulty: "easy",
        category: "mental",
        impact: "Bem-estar pessoal"
    },
    {
        id: "3",
        title: "Divida tarefas domésticas igualmente",
        description: "Se você mora com outras pessoas, garanta que as responsabilidades sejam divididas de forma justa.",
        difficulty: "medium",
        category: "gender",
        impact: "Equidade no lar"
    },
    {
        id: "4",
        title: "Pergunte 'como você está?' de verdade",
        description: "Reserve tempo para realmente escutar quando alguém compartilha como está se sentindo.",
        difficulty: "easy",
        category: "mental",
        impact: "Conexão social"
    },
    {
        id: "5",
        title: "Apoie negócios de mulheres",
        description: "Priorize comprar de empreendedoras, especialmente de mulheres negras e periféricas.",
        difficulty: "easy",
        category: "gender",
        impact: "Empoderamento econômico"
    },
    {
        id: "6",
        title: "Crie um 'kit de bem-estar'",
        description: "Monte uma caixa com itens que te acalmam: chás, livros, músicas, contatos de apoio.",
        difficulty: "easy",
        category: "mental",
        impact: "Autocuidado"
    },
    {
        id: "7",
        title: "Denuncie violência quando testemunhar",
        description: "Ligue 180 ou 190 se presenciar situações de violência contra mulheres.",
        difficulty: "medium",
        category: "gender",
        impact: "Proteção e segurança"
    },
    {
        id: "8",
        title: "Compartilhe recursos de saúde mental",
        description: "Divulgue números como CVV (188) e informações sobre onde buscar ajuda gratuita.",
        difficulty: "easy",
        category: "mental",
        impact: "Conscientização"
    },
    {
        id: "9",
        title: "Amplifique vozes de mulheres",
        description: "Compartilhe trabalhos, ideias e conquistas de mulheres nas suas redes sociais.",
        difficulty: "easy",
        category: "gender",
        impact: "Visibilidade"
    },
    {
        id: "10",
        title: "Estabeleça limites saudáveis",
        description: "Aprenda a dizer não e proteger seu tempo e energia emocional.",
        difficulty: "medium",
        category: "mental",
        impact: "Saúde emocional"
    },
    {
        id: "11",
        title: "Mentore uma mulher jovem",
        description: "Compartilhe sua experiência e conhecimento com meninas e mulheres iniciantes na sua área.",
        difficulty: "hard",
        category: "gender",
        impact: "Desenvolvimento profissional"
    },
    {
        id: "12",
        title: "Organize um círculo de apoio",
        description: "Crie um grupo de amigos para conversar regularmente sobre saúde mental e se apoiarem mutuamente.",
        difficulty: "medium",
        category: "mental",
        impact: "Rede de suporte"
    }
];

let currentFilter = 'all';

// Load saved progress
const savedActions = JSON.parse(localStorage.getItem('completedActions') || '[]');

function renderActions() {
    const grid = document.getElementById('actionsGrid');
    grid.innerHTML = '';

    const filteredActions = actions.filter(action => {
        if (currentFilter === 'all') return true;
        return action.category === currentFilter;
    });

    filteredActions.forEach(action => {
        const isCompleted = savedActions.includes(action.id);
        
        const card = document.createElement('div');
        card.className = 'action-card' + (isCompleted ? ' completed' : '');
        
        const difficultyClass = `difficulty-${action.difficulty}`;
        const difficultyLabel = {
            'easy': 'Fácil',
            'medium': 'Médio',
            'hard': 'Desafiador'
        }[action.difficulty];

        card.innerHTML = `
            <div class="action-checkbox-wrapper">
                <input 
                    type="checkbox" 
                    class="action-checkbox" 
                    data-action-id="${action.id}"
                    ${isCompleted ? 'checked' : ''}
                >
            </div>
            <div class="action-content">
                <div class="action-header">
                    <h3 class="action-title">${action.title}</h3>
                    <span class="difficulty-badge ${difficultyClass}">${difficultyLabel}</span>
                </div>
                <p class="action-description">${action.description}</p>
                <div class="action-tags">
                    <span class="action-tag ${action.category === 'gender' ? 'tag-gender' : 'tag-mental'}">
                        ${action.category === 'gender' ? 'Igualdade de Gênero' : 'Saúde Mental'}
                    </span>
                    <span class="action-tag tag-impact">💡 ${action.impact}</span>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });

    // Add event listeners
    document.querySelectorAll('.action-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', handleCheckboxChange);
    });

    updateProgress();
}

function handleCheckboxChange(e) {
    const actionId = e.target.dataset.actionId;
    let completed = JSON.parse(localStorage.getItem('completedActions') || '[]');
    
    if (e.target.checked) {
        if (!completed.includes(actionId)) {
            completed.push(actionId);
        }
        e.target.closest('.action-card').classList.add('completed');
    } else {
        completed = completed.filter(id => id !== actionId);
        e.target.closest('.action-card').classList.remove('completed');
    }
    
    localStorage.setItem('completedActions', JSON.stringify(completed));
    updateProgress();
}

function updateProgress() {
    const completed = JSON.parse(localStorage.getItem('completedActions') || '[]');
    const total = actions.length;
    const count = completed.length;
    const percentage = Math.round((count / total) * 100);

    // Update progress bar
    document.getElementById('progressBar').style.width = percentage + '%';
    document.getElementById('progressText').textContent = `${count} de ${total} ações completadas (${percentage}%)`;
    document.querySelector('.progress-icon').textContent = count;

    // Update motivational message
    const motivationalCard = document.getElementById('motivationalCard');
    
    if (percentage === 100) {
        motivationalCard.className = 'motivational-card success-card';
        motivationalCard.innerHTML = `
            <div class="motivational-icon">🎉</div>
            <h3>Parabéns, Campeão(a)!</h3>
            <p>Você completou todas as ações! Seu comprometimento está fazendo a diferença. Continue inspirando outras pessoas!</p>
        `;
    } else if (count > 0) {
        motivationalCard.className = 'motivational-card';
        motivationalCard.innerHTML = `
            <div class="motivational-icon">⚡</div>
            <h3>Continue assim!</h3>
            <p>Você já completou ${count} ações. Cada passo conta para construir um mundo melhor! 💪</p>
        `;
    } else {
        motivationalCard.className = 'motivational-card';
        motivationalCard.innerHTML = `
            <div class="motivational-icon">⭐</div>
            <h3>Pronto para Começar?</h3>
            <p>Escolha uma ação fácil para começar sua jornada. Pequenas mudanças criam grandes impactos!</p>
        `;
    }
}

function filterActions(category) {
    currentFilter = category;
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderActions();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderActions();
});
