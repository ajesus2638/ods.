// Emotion Selection
function selectEmotion(button) {
    // Remove selected from all
    document.querySelectorAll('.emotion-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selected to clicked
    button.classList.add('selected');
    
    // Get emotion
    const emotion = button.dataset.emotion;
    
    // Show feedback
    const messages = {
        'Feliz': 'Continue cultivando essa sensação positiva! ✨',
        'Calmo': 'Que maravilha estar em paz. Aproveite esse momento. 🌊',
        'Triste': 'Tudo bem não estar bem. Considere conversar com alguém de confiança. 💙',
        'Ansioso': 'Respire fundo. Tente práticas de mindfulness. 🌸',
        'Irritado': 'É válido sentir raiva. Encontre formas saudáveis de expressá-la. 🎯',
        'Cansado': 'Descanse. Seu corpo e mente precisam de recuperação. 😴'
    };
    
    const feedback = document.getElementById('emotionFeedback');
    feedback.innerHTML = `
        <div class="mood-feedback">
            <p>É normal sentir-se ${emotion.toLowerCase()}. Suas emoções são válidas.</p>
            <p class="feedback-message">${messages[emotion]}</p>
        </div>
    `;
}

// Mood Slider
const moodSlider = document.getElementById('moodSlider');
const moodValue = document.getElementById('moodValue');
const sliderFeedback = document.getElementById('sliderFeedback');

if (moodSlider) {
    moodSlider.addEventListener('input', function() {
        const value = this.value;
        moodValue.textContent = value;
        
        let message = '';
        if (value < 30) {
            message = 'Se está difícil, não hesite em buscar ajuda profissional.';
        } else if (value < 70) {
            message = 'Pequenos passos fazem diferença. Continue cuidando de si.';
        } else {
            message = 'Ótimo! Continue praticando o autocuidado.';
        }
        
        sliderFeedback.textContent = message;
    });
}

// Tab Switching
function switchTab(tabName) {
    // Hide all panels
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Remove active from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected panel
    document.getElementById('tab-' + tabName).classList.add('active');
    
    // Set active button
    event.target.classList.add('active');
}
