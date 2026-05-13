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

document.addEventListener('DOMContentLoaded', initMobileMenu);