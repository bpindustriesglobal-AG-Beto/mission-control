// --- Configuración de Conexión ---
let API_BASE = localStorage.getItem('ag_nucleus_url') || ''; 

if (!API_BASE) {
    // Si es la primera vez, intentar deducir si estamos en local o remoto
    API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '';
}

function setNucleusURL(url) {
    if (url && !url.startsWith('http')) url = 'http://' + url;
    localStorage.setItem('ag_nucleus_url', url);
    API_BASE = url;
    alert("URL del Núcleo establecida: " + url);
    location.reload();
}

function changeNucleusURL() {
    const url = prompt("Indica la IP o Dominio de tu VPS (ej: http://150.136.78.94:3000)", API_BASE);
    if (url) setNucleusURL(url);
}

let currentToken = localStorage.getItem('ag_token');
let agents = [];
let currentView = 'dashboard';

// --- Auth ---
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!API_BASE) {
        const url = prompt("Configuración Inicial: Indica la IP o Dominio de tu VPS (ej: http://150.136.78.94:3000)");
        if (url) {
            setNucleusURL(url);
            return;
        }
    }

    const submitBtn = document.getElementById('login-submit-btn');
    const originalBtnText = submitBtn.innerText;

    try {
        submitBtn.disabled = true;
        submitBtn.innerText = "VERIFICANDO...";
        
        console.log("Intentando login en:", `${API_BASE}/api/auth/login`);
        
        const res = await fetch(`${API_BASE}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Error del servidor (${res.status}): ${errorText || 'Sin respuesta'}`);
        }

        const data = await res.json();
        if (data.status === 'setup_2fa') {
            document.getElementById('qr-container').classList.remove('hidden');
            document.getElementById('qr-code').src = data.qr;
            showScreen('2fa-screen');
        } else if (data.status === 'pending_2fa') {
            showScreen('2fa-screen');
        } else { 
            alert(data.error || "Acceso denegado"); 
        }
    } catch (err) { 
        console.error("DEBUG LOGIN ERROR:", err);
        let msg = "Error de conexión con el núcleo.";
        if (err.message.includes('Failed to fetch')) {
            msg += "\n\nDETECCIÓN: El navegador bloqueó la conexión (Mixed Content).\n\nSOLUCIÓN: En la configuración del sitio, busca 'Contenido no seguro' y cámbialo a 'PERMITIR'.";
        } else {
            msg += "\nDetalle: " + err.message;
        }
        alert(msg);
        
        const newUrl = prompt("¿Deseas corregir la IP del VPS?", API_BASE);
        if (newUrl) setNucleusURL(newUrl);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
    }
});

document.getElementById('verify-2fa-btn').addEventListener('click', async () => {
    const token = document.getElementById('2fa-token').value;
    try {
        const res = await fetch(`${API_BASE}/api/auth/verify-2fa`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        });
        const data = await res.json();
        if (data.token) {
            currentToken = data.token;
            localStorage.setItem('ag_token', currentToken);
            showScreen('main-screen');
            loadAgents();
        } else { 
            alert(data.error || "Token de seguridad inválido"); 
        }
    } catch (e) { 
        alert("Error en la verificación. Asegúrate de que el núcleo sea accesible.");
    }
});

// --- Navigation ---
document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
        currentView = btn.dataset.view;
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.view-container').forEach(v => v.classList.add('hidden'));
        document.getElementById(`${currentView}-view`).classList.remove('hidden');
        document.getElementById('view-title').innerText = currentView.toUpperCase() + '_CENTER';
    });
});

// --- Agents ---
async function loadAgents() {
    try {
        const res = await fetch(`${API_BASE}/api/agents`, {
            headers: { 'Authorization': `Bearer ${currentToken}` }
        });
        if (res.ok) {
            agents = await res.json();
            renderDashboard();
        } else if (res.status === 403) {
            logout();
        }
    } catch (e) { console.error("Error cargando agentes"); }
}

const AVATAR_MAP = {
    'orchestrator': '👑',
    'agent1': '🤖',
    'agent2': '👾',
    'agent3': '🛡️'
};

function renderDashboard() {
    const grid = document.getElementById('agents-grid');
    if (!grid) return;
    grid.innerHTML = agents.map(a => `
        <div class="glass-card agent-card animate-fade-in" style="${a.llm_provider === 'claude' ? 'border: 1px solid gold' : ''}">
            <div class="agent-header">
                <span class="avatar-display">${AVATAR_MAP[a.avatar] || '🤖'}</span>
                <span class="agent-badge" style="${a.llm_provider === 'claude' ? 'background: gold; color: black' : ''}">
                    ${a.llm_provider.toUpperCase()}
                </span>
            </div>
            <h3>${a.name}</h3>
            <p class="mono-font" style="font-size: 0.7rem; color: var(--text-dim)">${a.model_name || 'AUTO'}</p>
            <div class="progress-bar-bg"><div class="progress-fill" style="width: ${a.progress}%"></div></div>
            <div style="display:flex; justify-content: space-between; font-size: 0.7rem">
                <span>${a.status.toUpperCase()}</span>
                <span>${a.progress}%</span>
            </div>
        </div>
    `).join('');
    document.getElementById('stat-active').innerText = agents.length;
}

// Modal CRUD
document.getElementById('create-agent-btn').addEventListener('click', () => {
    document.getElementById('modal-title').innerText = 'CONFIGURAR NUEVO AGENTE';
    document.getElementById('edit-agent-id').value = '';
    document.getElementById('agent-form').reset();
    document.getElementById('agent-modal').classList.remove('hidden');
});

document.getElementById('agent-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const avatar = document.querySelector('input[name="agent-avatar"]:checked').value;
    const agentData = {
        id: document.getElementById('edit-agent-id').value || Math.random().toString(36).substring(7),
        name: document.getElementById('agent-name').value,
        llm_provider: document.getElementById('agent-llm').value,
        model_name: document.getElementById('agent-model').value || 'default',
        avatar: avatar,
        status: 'online',
        progress: 0,
        tasks: []
    };

    const res = await fetch(`${API_BASE}/api/agents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${currentToken}` },
        body: JSON.stringify(agentData)
    });

    if (res.ok) {
        document.getElementById('agent-modal').classList.add('hidden');
        loadAgents();
    }
});

document.getElementById('close-modal').addEventListener('click', () => document.getElementById('agent-modal').classList.add('hidden'));

// --- Chat ---
document.getElementById('send-btn').addEventListener('click', sendMessage);
async function sendMessage() {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (!msg) return;

    appendMsg(msg, 'user');
    input.value = '';

    const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${currentToken}` },
        body: JSON.stringify({ message: msg, agentId: 'orchestrator' })
    });
    const data = await res.json();
    appendMsg(data.response, 'agent');
}

function appendMsg(text, side) {
    const container = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = `message ${side} animate-fade-in`;
    div.innerHTML = `<div class="msg-bubble">${text}</div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function showScreen(id) {
    ['login-screen', '2fa-screen', 'main-screen'].forEach(s => document.getElementById(s).classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

function logout() {
    localStorage.removeItem('ag_token');
    showScreen('login-screen');
}

document.getElementById('logout-btn')?.addEventListener('click', logout);


// Reloj
setInterval(() => {
    const clock = document.getElementById('clock');
    if (clock) clock.innerText = new Date().toLocaleTimeString();
}, 1000);

// --- Model Selector ---
async function loadModels() {
    if (!currentToken) return;
    try {
        const res = await fetch(`${API_BASE}/api/models`, {
            headers: { 'Authorization': `Bearer ${currentToken}` }
        });
        if (!res.ok) return;
        const models = await res.json();
        const select = document.getElementById('model-selector');
        if (!select) return;

        select.innerHTML = '';
        models.forEach(m => {
            const opt = document.createElement('option');
            opt.value = JSON.stringify({ provider: m.provider, model: m.model });
            opt.textContent = m.label;
            select.appendChild(opt);
        });

        // Cargar el activo actual
        const settingsRes = await fetch(`${API_BASE}/api/settings`, {
            headers: { 'Authorization': `Bearer ${currentToken}` }
        });
        if (settingsRes.ok) {
            const { provider, model } = await settingsRes.json();
            const matchingOpt = [...select.options].find(o => {
                const v = JSON.parse(o.value);
                return v.provider === provider && v.model === model;
            });
            if (matchingOpt) select.value = matchingOpt.value;
        }
    } catch (e) {
        console.warn('No se pudo cargar la lista de modelos:', e);
    }
}

async function switchModel() {
    const select = document.getElementById('model-selector');
    if (!select || !currentToken) return;
    const { provider, model } = JSON.parse(select.value);
    try {
        const res = await fetch(`${API_BASE}/api/settings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${currentToken}` },
            body: JSON.stringify({ provider, model })
        });
        if (res.ok) {
            const status = document.getElementById('model-status');
            if (status) {
                status.textContent = `✅ Activo: ${model}`;
                setTimeout(() => { status.textContent = ''; }, 3000);
            }
        }
    } catch (e) {
        console.error('Error al cambiar modelo:', e);
    }
}

if (currentToken) { showScreen('main-screen'); loadAgents(); loadModels(); }
