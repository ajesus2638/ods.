// Stories Data
const stories = [
    {
        name: "Maria Silva",
        role: "Empreendedora Social",
        story: "Aos 45 anos, Maria fundou uma ONG que capacita mulheres em situação de vulnerabilidade. Já ajudou mais de 500 mulheres a conquistarem independência financeira através de cursos profissionalizantes e microcrédito.",
        impact: "500+ mulheres capacitadas | 120 negócios criados",
        category: "gender",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
    {
        name: "Dr. Carlos Mendes",
        role: "Psiquiatra Voluntário",
        story: "Carlos dedica suas tardes a atender gratuitamente pessoas em comunidades carentes. Criou um programa de acompanhamento em saúde mental que atende 200 pessoas mensalmente, oferecendo terapia e medicação gratuita.",
        impact: "2.400 atendimentos/ano | Redução de 40% em crises",
        category: "mental",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
    {
        name: "Ana Costa",
        role: "Ativista e Sobrevivente",
        story: "Após superar um relacionamento abusivo, Ana criou uma rede de apoio online que conecta vítimas de violência doméstica com advogadas, psicólogas e abrigos. A plataforma já ajudou milhares de mulheres a recomeçarem suas vidas.",
        impact: "15.000+ mulheres ajudadas | 50 profissionais voluntárias",
        category: "gender",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
    {
        name: "João Pedro",
        role: "Estudante e Ativista",
        story: "Aos 22 anos, João criou um projeto em sua universidade para combater o estigma sobre saúde mental. Organizou rodas de conversa, trouxe profissionais e criou um canal de escuta. O projeto já alcançou 5 universidades.",
        impact: "10.000+ estudantes alcançados | 30 eventos realizados",
        category: "mental",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
    {
        name: "Fernanda Oliveira",
        role: "CEO e Mentora",
        story: "Como CEO de uma startup de tecnologia, Fernanda implementou políticas de equidade de gênero em sua empresa: 50% de mulheres em cargos de liderança, licença parental igual e programa de mentoria. Hoje, outras empresas seguem seu exemplo.",
        impact: "Empresa modelo | 20 organizações inspiradas",
        category: "gender",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
    {
        name: "Luciana Santos",
        role: "Terapeuta Comunitária",
        story: "Luciana oferece terapia gratuita em uma comunidade periférica há 10 anos. Criou grupos de apoio para mães, adolescentes e idosos, transformando a saúde mental da região. Treinou 30 agentes comunitários para dar continuidade ao trabalho.",
        impact: "1.500 pessoas em terapia | 8 grupos de apoio ativos",
        category: "mental",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    }
];

// Filter Stories
function filterStories(category) {
    const cards = document.querySelectorAll('.story-card');
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Show/hide cards
    cards.forEach(card => {
        const cardCategory = card.dataset.category;
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Open Story Modal
function openStory(index) {
    const story = stories[index];
    const modal = document.getElementById('storyModal');
    const modalBody = document.getElementById('modalBody');
    
    const badgeClass = story.category === 'gender' ? 'story-badge-purple' : 'story-badge-blue';
    const badgeText = story.category === 'gender' ? 'Igualdade de Gênero' : 'Saúde Mental';
    
    modalBody.innerHTML = `
        <div class="modal-image">
            <img src="${story.image}" alt="${story.name}">
            <div class="modal-image-overlay"></div>
            <div class="modal-image-content">
                <span class="story-badge ${badgeClass}">${badgeText}</span>
                <h2 style="font-size: 2rem; margin-top: 1rem;">${story.name}</h2>
                <p style="font-size: 1.125rem; opacity: 0.9;">${story.role}</p>
            </div>
        </div>
        
        <div class="modal-body">
            <p class="modal-quote">
                "${story.story}"
            </p>

            <div class="modal-impact-box">
                <h3>Impacto Gerado:</h3>
                <p>${story.impact}</p>
            </div>

            <div class="modal-inspire-box">
                <p>
                    <strong>Inspire-se:</strong> ${story.name} prova que cada um de nós pode fazer a diferença. 
                    Pequenas ações diárias criam grandes transformações. O que você pode fazer hoje?
                </p>
            </div>

            <div class="modal-buttons">
                <button class="btn btn-outline" onclick="closeStory()">Fechar</button>
                <button class="btn btn-primary" onclick="shareStory('${story.name}')">Compartilhar História</button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Story Modal
function closeStory() {
    const modal = document.getElementById('storyModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Share Story
function shareStory(name) {
    const text = `Conheça a história inspiradora de ${name} sobre ODS! 🌍💜`;
    
    if (navigator.share) {
        navigator.share({ text: text })
            .catch(err => console.log('Erro ao compartilhar:', err));
    } else {
        navigator.clipboard.writeText(text)
            .then(() => alert('Texto copiado para a área de transferência!'))
            .catch(err => console.log('Erro ao copiar:', err));
    }
}

// Close modal when clicking ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeStory();
    }
});
