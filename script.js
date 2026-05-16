// --- 1. BANCO DE DADOS DE SIGNOS (ESTÁTICO PARA O EXEMPLO) ---
// Em uma aplicação real, isso viria de uma API.
const zodaicData = {
    aries: { name: 'Áries', dates: '21 Mar - 19 Abr', icon: 'fa-aries', text: 'Hoje, a lua em seu signo amplifica sua coragem. É um dia excelente para iniciar projetos que exigem iniciativa pura. Cuidado com a impulsividade em conversas importantes.', amor: 'Demonstre afeto com atitudes concretas.', trabalho: 'Foque na execução, não apenas na ideia.', pedra: 'Jaspe Vermelho' },
    touro: { name: 'Touro', dates: '20 Abr - 20 Maio', icon: 'fa-taurus', text: 'Vênus sugere um dia focado no conforto e na beleza. Permita-se um momento de prazer sensorial. No trabalho, sua persistência será notada e recompensada.', amor: 'A estabilidade emocional é sua aliada.', trabalho: 'Evite mudanças bruscas de planos hoje.', pedra: 'Esmeralda' },
    gemeos: { name: 'Gêmeos', dates: '21 Maio - 20 Jun', icon: 'fa-gemini', text: 'Mercúrio estimula sua curiosidade. Conexões sociais podem trazer insights valiosos ou oportunidades inesperadas. Mantenha a mente aberta e o diálogo fluindo.', amor: 'A comunicação clara resolve mal-entendidos.', trabalho: 'Multitarefa pode ser produtiva, mas foque.', pedra: 'Citrino' },
    cancer: { name: 'Câncer', dates: '21 Jun - 22 Jul', icon: 'fa-cancer', text: 'Suas emoções estão à flor da pele, mas de uma forma intuitiva e protetora. Use essa sensibilidade para acolher quem você ama e decorar seu espaço pessoal.', amor: 'Abra seu coração para conexões profundas.', trabalho: 'Siga sua intuição em decisões difíceis.', pedra: 'Pedra da Lua' },
    leao: { name: 'Leão', dates: '23 Jul - 22 Ago', icon: 'fa-leo', text: 'Seu brilho natural está ofuscante hoje. É um ótimo momento para liderar e inspirar os outros. Lembre-se de compartilhar o palco e reconhecer o esforço alheio.', amor: 'A generosidade fortalece os laços.', trabalho: 'Assuma o comando de um projeto desafiador.', pedra: 'Olho de Tigre' },
    virgem: { name: 'Virgem', dates: '23 Ago - 22 Set', icon: 'fa-virgo', text: 'Seu olho para detalhes está afiado. Aproveite para organizar sua rotina, suas finanças ou um espaço bagunçado. A eficiência será sua maior satisfação.', amor: 'Pequenos gestos de serviço contam muito.', trabalho: 'Revise contratos e e-mails com atenção.', pedra: 'Amazonita' },
    libra: { name: 'Libra', dates: '23 Set - 22 Out', icon: 'fa-libra', text: 'O dia pede equilíbrio e harmonia nas relações. Você pode mediar um conflito ou simplesmente desfrutar da companhia de amigos. Busque a beleza em tudo.', amor: 'O romance está favorecido. Planeje algo especial.', trabalho: 'A colaboração trará melhores resultados.', pedra: 'Quartzo Rosa' },
    escorpiao: { name: 'Escorpião', dates: '23 Out - 21 Nov', icon: 'fa-scorpio', text: 'Sua intensidade e magnetismo estão em alta. É um dia para mergulhar fundo em investigações, autoconhecimento ou em uma paixão. Transformações são possíveis.', amor: 'A paixão está intensa, mas evite o controle.', trabalho: 'Foque em resolver problemas complexos.', pedra: 'Granada' },
    sagitario: { name: 'Sagitário', dates: '22 Nov - 21 Dez', icon: 'fa-sagittarius', text: 'O otimismo bate à sua porta. Um desejo de aventura ou aprendizado pode surgir. Expanda seus horizontes, seja viajando (mesmo mentalmente) ou estudando algo novo.', amor: 'Aventurem-se juntos em algo novo.', trabalho: 'Visão de longo prazo está favorecida.', pedra: 'Sodalita' },
    capricornio: { name: 'Capricórnio', dates: '22 Dez - 19 Jan', icon: 'fa-capricorn', text: 'Sua disciplina e foco em metas de longo prazo estão fortíssimos. É um dia produtivo para dar passos concretos rumo à sua ambição. Mantenha os pés no chão.', amor: 'A lealdade é o alicerce do seu relacionamento.', trabalho: 'Persista, os resultados virão com o tempo.', pedra: 'Ônix' },
    aquario: { name: 'Aquário', dates: '20 Jan - 18 Fev', icon: 'fa-aquarius', text: 'Sua mente está fervilhando com ideias inovadoras e sociais. É um bom dia para colaborar em grupo ou defender uma causa em que acredita. Pense fora da caixa.', amor: 'A amizade é a base do amor hoje.', trabalho: 'Proponha soluções originais para problemas antigos.', pedra: 'Ametista' },
    peixes: { name: 'Peixes', dates: '19 Fev - 20 Mar', icon: 'fa-pisces', text: 'Sua imaginação e empatia estão elevadas. Use esse fluxo criativo para arte, música ou para ajudar alguém em necessidade. Momentos de introspecção serão valiosos.', amor: 'A conexão espiritual é forte.', trabalho: 'Use sua criatividade para resolver tarefas chatas.', pedra: 'Água-Marinha' }
};

// --- 2. INICIALIZAÇÃO DA PÁGINA ---
document.addEventListener('DOMContentLoaded', () => {
    setTodayDate();
    populateSignGrid();
    setupCloseButton();
    setupOutsideClick();
});

// --- 3. FUNÇÕES ---

/**
 * Define a data atual no header
 */
function setTodayDate() {
    const dateElement = document.getElementById('current-date');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    // Formata para: "quarta-feira, 10 de abril de 2026"
    dateElement.textContent = today.toLocaleDateString('pt-BR', options);
}

/**
 * Cria os itens do grid dinamicamente
 */
function populateSignGrid() {
    const grid = document.getElementById('sign-grid');
    
    // Limpa o grid antes de popular
    grid.innerHTML = '';
    
    for (const key in zodaicData) {
        const sign = zodaicData[key];
        
        const signItem = document.createElement('div');
        signItem.className = 'sign-item';
        signItem.dataset.sign = key;
        signItem.title = `Ver previsão de ${sign.name}`;
        signItem.setAttribute('tabindex', '0');
        signItem.setAttribute('role', 'button');
        signItem.setAttribute('aria-pressed', 'false');
        
        signItem.innerHTML = `
            <i class="fas ${sign.icon}"></i>
            <span>${sign.name}</span>
            <small>${sign.dates}</small>
        `;
        
        signItem.addEventListener('click', () => showHoroscope(key));
        signItem.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showHoroscope(key);
            }
        });
        
        grid.appendChild(signItem);
    }
}

/**
 * Mostra o horóscopo detalhado no card
 */
function showHoroscope(signKey) {
    const sign = zodaicData[signKey];
    const displaySection = document.getElementById('horoscope-display');
    
    // Atualiza os elementos do card
    document.getElementById('card-icon').className = `fas ${sign.icon}`;
    document.getElementById('card-sign-name').textContent = sign.name;
    document.getElementById('card-sign-dates').textContent = sign.dates;
    document.getElementById('card-horoscope-text').textContent = sign.text;
    document.getElementById('card-amor').textContent = sign.amor;
    document.getElementById('card-trabalho').textContent = sign.trabalho;
    document.getElementById('card-pedra').textContent = sign.pedra;
    
    // Mostra a seção e adiciona a animação de fade-in
    displaySection.style.display = 'block';
    
    // Pequeno delay para a animação do CSS funcionar
    setTimeout(() => {
        displaySection.classList.add('show');
    }, 10);
    
    // Marca o item no grid como 'ativo'
    updateActiveSign(signKey);
    
    // Scroll suave até o card
    setTimeout(() => {
        displaySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

/**
 * Atualiza a classe 'active' no grid de signos
 */
function updateActiveSign(activeKey) {
    const items = document.querySelectorAll('.sign-item');
    items.forEach(item => {
        if (item.dataset.sign === activeKey) {
            item.classList.add('active');
            item.setAttribute('aria-pressed', 'true');
        } else {
            item.classList.remove('active');
            item.setAttribute('aria-pressed', 'false');
        }
    });
}

/**
 * Configura o botão de fechar
 */
function setupCloseButton() {
    const closeButton = document.getElementById('close-button');
    if (closeButton) {
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            hideHoroscope();
        });
        
        // Fechar com tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const displaySection = document.getElementById('horoscope-display');
                if (displaySection.style.display === 'block') {
                    hideHoroscope();
                }
            }
        });
    }
}

/**
 * Esconde a seção de horóscopo
 */
function hideHoroscope() {
    const displaySection = document.getElementById('horoscope-display');
    displaySection.classList.remove('show');
    
    setTimeout(() => {
        displaySection.style.display = 'none';
        // Remove a classe active de todos os items
        const items = document.querySelectorAll('.sign-item');
        items.forEach(item => {
            item.classList.remove('active');
            item.setAttribute('aria-pressed', 'false');
        });
    }, 300);
}

/**
 * Fecha o horóscopo ao clicar fora do card
 */
function setupOutsideClick() {
    document.addEventListener('click', (e) => {
        const displaySection = document.getElementById('horoscope-display');
        const horoscopeCard = document.querySelector('.horoscope-card');
        const signGrid = document.getElementById('sign-grid');
        
        if (displaySection && displaySection.style.display === 'block') {
            // Verifica se clicou fora do card e da grid
            if (horoscopeCard && !horoscopeCard.contains(e.target) && !signGrid.contains(e.target)) {
                hideHoroscope();
            }
        }
    });
}
