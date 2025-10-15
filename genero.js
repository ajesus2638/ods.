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

// Toggle Goal Details
function toggleGoalDetails(card) {
    const actions = card.querySelector('.goal-actions');
    const toggle = card.querySelector('.goal-toggle');
    const isExpanded = card.classList.contains('expanded');
    
    if (isExpanded) {
        card.classList.remove('expanded');
        actions.style.display = 'none';
        toggle.textContent = 'Ver ações';
    } else {
        card.classList.add('expanded');
        actions.style.display = 'block';
        toggle.textContent = 'Ocultar ações';
    }
}
