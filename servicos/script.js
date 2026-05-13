const theme = {
    background: "#ffffff",
    surface: "#fafafa",
    text: "#1a1a1a",
    muted: "#6b6b6b",
    border: "#ebebeb",
    accent: "#1a1a1a"
};

function applyTheme() {
    const root = document.documentElement;
    root.style.setProperty('--bg-white', theme.background);
    root.style.setProperty('--bg-offwhite', theme.surface);
    root.style.setProperty('--text-dark', theme.text);
    root.style.setProperty('--text-light', theme.muted);
    root.style.setProperty('--border-light', theme.border);
    root.style.setProperty('--accent', theme.accent);
}
applyTheme();

const projects = [
    {
        title: "Samzin",
        description: "Canal focado em finanças e documentários educativos sobre dinheiro, investimentos e economia.",
        status: "active",
        category: "Mídia",
        link: "https://samzin.samgrowthlabs.com.br"
    },
    {
        title: "Educafinance",
        description: "Projeto em desenvolvimento voltado para educação financeira moderna e acessível.",
        status: "development",
        category: "Educação",
        link: "https://edu.samgrowthlabs.com.br"
    }
];

function getStatusInfo(status) {
    const map = {
        active: { class: 'status-active', label: 'ATIVO' },
        development: { class: 'status-development', label: 'EM DESENVOLVIMENTO' }
    };
    return map[status];
}

function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;
    
    container.innerHTML = projects.map(project => {
        const status = getStatusInfo(project.status);
        return `
            <a href="${project.link}" class="projeto-card" target="_blank" rel="noopener noreferrer">
                <h3 class="projeto-title">${project.title}</h3>
                <div class="projeto-category">${project.category}</div>
                <p class="projeto-description">${project.description}</p>
                <div class="projeto-meta">
                    <span class="status-badge ${status.class}">${status.label}</span>
                </div>
            </a>
        `;
    }).join('');
}

function initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav-links');
    
    if (btn && nav) {
        btn.addEventListener('click', () => {
            nav.classList.toggle('active');
            const spans = btn.querySelectorAll('span');
            if (nav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                const spans = btn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    initMobileMenu();
});