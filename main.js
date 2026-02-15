
// App State
let allGames = [];
let currentCategory = 'All';
let currentSearch = '';

// DOM Elements
const gameGrid = document.getElementById('gameGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilters = document.getElementById('categoryFilters');
const gameCount = document.getElementById('gameCount');
const gridTitle = document.getElementById('gridTitle');
const gameModal = document.getElementById('gameModal');
const gameIframe = document.getElementById('gameIframe');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const heroBanner = document.getElementById('heroBanner');

// Constants
const CATEGORIES = ['All', 'Action', 'Puzzle', 'Arcade', 'Classic', 'Sports'];

// Initialize App
async function init() {
    try {
        const response = await fetch('games.json');
        allGames = await response.json();
        
        setupCategories();
        renderGames();
        initParticles();
        
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            renderGames();
        });
    } catch (error) {
        console.error("Failed to load games data:", error);
    }
}

function setupCategories() {
    categoryFilters.innerHTML = CATEGORIES.map(cat => `
        <button 
            onclick="setCategory('${cat}')"
            class="category-btn px-4 py-2 rounded-lg whitespace-nowrap transition-all text-sm font-medium ${cat === currentCategory ? 'bg-rose-600 text-white shadow-lg' : 'bg-slate-900/50 text-slate-400 hover:bg-slate-800 border border-slate-800'}"
            data-category="${cat}"
        >
            ${cat}
        </button>
    `).join('');
}

function setCategory(cat) {
    currentCategory = cat;
    
    // Update UI
    document.querySelectorAll('.category-btn').forEach(btn => {
        if (btn.dataset.category === cat) {
            btn.classList.add('bg-rose-600', 'text-white', 'shadow-lg');
            btn.classList.remove('bg-slate-900/50', 'text-slate-400');
        } else {
            btn.classList.remove('bg-rose-600', 'text-white', 'shadow-lg');
            btn.classList.add('bg-slate-900/50', 'text-slate-400');
        }
    });

    // Hide hero if not on home
    heroBanner.style.display = (cat === 'All' && !currentSearch) ? 'block' : 'none';
    
    renderGames();
}

function renderGames() {
    const filtered = allGames.filter(game => {
        const matchesSearch = game.title.toLowerCase().includes(currentSearch.toLowerCase());
        const matchesCategory = currentCategory === 'All' || game.category === currentCategory;
        return matchesSearch && matchesCategory;
    });

    gameCount.innerText = `${filtered.length} games found`;
    gridTitle.innerHTML = currentSearch 
        ? `<i class="fas fa-search text-amber-500"></i> Search Results` 
        : `<i class="fas fa-bolt text-amber-500"></i> ${currentCategory === 'All' ? 'Popular' : currentCategory} Games`;

    if (filtered.length === 0) {
        gameGrid.innerHTML = `
            <div class="col-span-full py-20 flex flex-col items-center justify-center bg-black/40 rounded-2xl border border-dashed border-slate-700">
                <i class="fas fa-search text-3xl text-slate-600 mb-4"></i>
                <p class="text-slate-400">No games found matching your criteria.</p>
            </div>
        `;
        return;
    }

    gameGrid.innerHTML = filtered.map((game, index) => `
        <div class="game-card group relative bg-black/40 rounded-xl overflow-hidden border border-slate-800/50 cursor-pointer animate-fade-in" 
             style="animation-delay: ${index * 0.05}s"
             onclick="playGame('${game.id}')">
            <div class="aspect-video relative overflow-hidden">
                <img src="${game.thumbnail}" alt="${game.title}" class="w-full h-full object-cover transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                ${game.isHot ? '<div class="absolute top-2 left-2 bg-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg"><i class="fas fa-fire"></i> Hot</div>' : ''}
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <div class="bg-rose-600 w-12 h-12 rounded-full flex items-center justify-center play-btn-glow transform scale-0 group-hover:scale-100 transition-transform duration-300">
                        <i class="fas fa-play text-white ml-1"></i>
                    </div>
                </div>
            </div>
            <div class="p-4">
                <div class="flex justify-between items-start mb-1">
                    <h3 class="font-semibold text-slate-100 group-hover:text-rose-400 transition-colors">${game.title}</h3>
                    <span class="text-[10px] text-slate-500 uppercase tracking-widest font-bold">${game.category}</span>
                </div>
                <p class="text-xs text-slate-400 line-clamp-2">${game.description}</p>
            </div>
        </div>
    `).join('');
}

// Player Logic
function playGame(id) {
    const game = allGames.find(g => g.id === id);
    if (!game) return;

    modalTitle.innerText = game.title;
    modalCategory.innerText = game.category;
    gameIframe.src = game.url;
    gameModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function playFeatured() {
    playGame(allGames[0].id);
}

function closeGame() {
    gameModal.classList.add('hidden');
    gameIframe.src = '';
    document.body.style.overflow = 'auto';
}

function toggleFullscreen() {
    if (gameIframe.requestFullscreen) {
        gameIframe.requestFullscreen();
    }
}

// Particle Background
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    const colors = ['#ff1493', '#ff4d4d', '#ffffff'];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = Math.random() * 0.4 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
        }
        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < 60; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

init();
