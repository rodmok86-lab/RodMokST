// RODMOK STORE - JavaScript Principal
console.log('🎯 RodMok Store JavaScript carregado!');

// ========== VARIÁVEIS GLOBAIS ==========
let carrinho = [];
let totalCarrinho = 0;

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM totalmente carregado');
    
    // 1. Atualizar ano atual no rodapé
    atualizarAno();
    
    // 2. Configurar menu ativo
    configurarMenu();
    
    // 3. Configurar formulário
    configurarFormulario();
    
    // 4. Inicializar carrinho (agora com modal)
    inicializarCarrinho();
    
    // 5. Animações de entrada
    animarEntrada();
    
    // 6. Testar funcionalidades
    testarFuncionalidades();
    
    // 7. Configurar newsletter
    configurarNewsletter();
});

// ========== FUNÇÕES PRINCIPAIS ==========

// 1. ATUALIZAR ANO NO RODAPÉ
function atualizarAno() {
    try {
        const anoAtual = new Date().getFullYear();
        const elementoAno = document.getElementById('ano-atual');
        
        if (elementoAno) {
            elementoAno.textContent = anoAtual;
        } else {
            // fallback
            const footers = document.getElementsByTagName('footer');
            if (footers.length > 0) {
                const ps = footers[0].getElementsByTagName('p');
                for (let p of ps) {
                    if (p.textContent.includes('2024') || p.textContent.includes('2025')) {
                        p.textContent = p.textContent.replace(/\d{4}/, anoAtual);
                        break;
                    }
                }
            }
        }
    } catch (e) {
        console.warn('Ano não atualizado:', e);
    }
}

// 2. CONFIGURAR MENU ATIVO + rolagem suave
function configurarMenu() {
    const links = document.querySelectorAll('.menu a');
    const urlAtual = window.location.hash || '#inicio';

    links.forEach(link => {
        link.classList.remove('ativo');
        if (link.getAttribute('href') === urlAtual) {
            link.classList.add('ativo');
        }

        link.addEventListener('click', function(e) {
            e.preventDefault();
            const destino = this.getAttribute('href');

            // Atualiza ativo
            links.forEach(l => l.classList.remove('ativo'));
            this.classList.add('ativo');

            // Rolagem suave
            if (destino.startsWith('#')) {
                const el = document.querySelector(destino);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

// 3. CONFIGURAR FORMULÁRIO DE CONTATO
function configurarFormulario() {
    const form = document.querySelector('.form-contato');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = form.querySelector('input[type="text"]')?.value.trim();
        const email = form.querySelector('input[type="email"]')?.value.trim();
        const msg = form.querySelector('textarea')?.value.trim();

        if (!nome || !email || !msg) {
            mostrarMensagemTemporaria('❌ Preencha todos os campos!', 'erro');
            return;
        }

        const botao = form.querySelector('button[type="submit"]');
        const textoOriginal = botao.innerHTML;
        botao.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        botao.disabled = true;

        setTimeout(() => {
            mostrarMensagemTemporaria(`✅ Obrigado, ${nome}! Responderemos em breve.`, 'sucesso');
            form.reset();
            botao.innerHTML = textoOriginal;
            botao.disabled = false;
        }, 1800);
    });
}

// Função auxiliar para mensagens temporárias (substitui alert)
function mostrarMensagemTemporaria(texto, tipo = 'info') {
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = '20px';
    div.style.right = '20px';
    div.style.padding = '16px 24px';
    div.style.borderRadius = '12px';
    div.style.color = '#fff';
    div.style.background = tipo === 'sucesso' ? '#1dd1a1' : tipo === 'erro' ? '#ff4757' : '#d4af37';
    div.style.zIndex = '3000';
    div.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
    div.textContent = texto;
    document.body.appendChild(div);

    setTimeout(() => {
        div.style.opacity = '0';
        setTimeout(() => div.remove(), 500);
    }, 4000);
}

// 4. CARRINHO DE COMPRAS (modal + remoção + localStorage)
function inicializarCarrinho() {
    // Carregar do localStorage
    const salvo = localStorage.getItem('rodmokCarrinho');
    if (salvo) {
        carrinho = JSON.parse(salvo);
        totalCarrinho = carrinho.reduce((sum, item) => sum + item.preco, 0);
    }

    atualizarContadorCarrinho();

    // Ícone do carrinho abre modal
    const icone = document.querySelector('.carrinho');
    if (icone) {
        icone.addEventListener('click', abrirModalCarrinho);
    }

    // Vincular botões de adicionar (use class="btn-adicionar" e data-id no HTML)
    document.querySelectorAll('.btn-adicionar').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const id = this.getAttribute('data-id');
            if (id) adicionarAoCarrinho(id);
        });
    });
}

function adicionarAoCarrinho(id) {
    const produtos = {
        '1': { nome: 'Camiseta "Urban Legends"', preco: 89.90 },
        '2': { nome: 'Jaqueta "Night Rider"', preco: 159.90 },
        '3': { nome: 'Calça "Street Comfort"', preco: 129.90 }
        // adicione mais produtos aqui conforme necessário
    };

    const produto = produtos[id];
    if (!produto) return;

    carrinho.push(produto);
    totalCarrinho += produto.preco;

    localStorage.setItem('rodmokCarrinho', JSON.stringify(carrinho));
    atualizarContadorCarrinho();

    // Feedback no botão
    const textoOriginal = event.target.innerHTML;
    event.target.innerHTML = 'Adicionado ✓';
    event.target.style.background = '#ffd700';
    event.target.style.color = '#0a0a0a';

    setTimeout(() => {
        event.target.innerHTML = textoOriginal;
        event.target.style.background = '';
        event.target.style.color = '';
    }, 1800);
}

function removerDoCarrinho(index) {
    if (index >= 0 && index < carrinho.length) {
        totalCarrinho -= carrinho[index].preco;
        carrinho.splice(index, 1);
        localStorage.setItem('rodmokCarrinho', JSON.stringify(carrinho));
        atualizarContadorCarrinho();
        renderizarModalCarrinho(); // atualiza o modal aberto
    }
}

function atualizarContadorCarrinho() {
    const contador = document.querySelector('.contador');
    if (contador) {
        contador.textContent = carrinho.length;
        contador.style.display = carrinho.length > 0 ? 'flex' : 'none';
    }
}

function abrirModalCarrinho() {
    const modal = document.getElementById('modal-carrinho');
    if (!modal) return;

    renderizarModalCarrinho();
    modal.style.display = 'flex';
}

function renderizarModalCarrinho() {
    const container = document.getElementById('itens-carrinho');
    const totalEl = document.getElementById('total-carrinho');

    if (!container) return;

    container.innerHTML = '';

    if (carrinho.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#aaa; padding:30px 0;">Seu carrinho está vazio.</p>';
    } else {
        carrinho.forEach((item, i) => {
            const div = document.createElement('div');
            div.className = 'item-carrinho';
            div.innerHTML = `
                <div>
                    <strong>${item.nome}</strong><br>
                    <span style="color:#ffd700;">R$ ${item.preco.toFixed(2)}</span>
                </div>
                <button class="btn-remover" onclick="removerDoCarrinho(${i})">Remover</button>
            `;
            container.appendChild(div);
        });
    }

    if (totalEl) {
        totalEl.textContent = `Total: R$ ${totalCarrinho.toFixed(2)}`;
    }
}

// 5. ANIMAÇÕES DE ENTRADA
function animarEntrada() {
    const titulo = document.querySelector('.logo h1');
    if (titulo) {
        titulo.style.opacity = 0;
        titulo.style.transform = 'translateY(-30px)';
        setTimeout(() => {
            titulo.style.transition = 'all 0.8s ease-out';
            titulo.style.opacity = 1;
            titulo.style.transform = 'translateY(0)';
        }, 200);
    }

    document.querySelectorAll('.produto').forEach((el, i) => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(40px)';
        setTimeout(() => {
            el.style.transition = 'all 0.7s ease-out';
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
        }, 400 + i * 150);
    });
}

// 6. NEWSLETTER
function configurarNewsletter() {
    const btn = document.querySelector('.newsletter button');
    const input = document.querySelector('.newsletter input');

    if (btn && input) {
        btn.addEventListener('click', inscreverNewsletter);
        input.addEventListener('keypress', e => {
            if (e.key === 'Enter') inscreverNewsletter();
        });
    }
}

function inscreverNewsletter() {
    const input = document.querySelector('.newsletter input');
    if (!input) return;

    const email = input.value.trim();
    if (email && email.includes('@')) {
        mostrarMensagemTemporaria(`✅ Inscrito com sucesso! ${email}`, 'sucesso');
        input.value = '';
    } else {
        mostrarMensagemTemporaria('❌ Digite um e-mail válido!', 'erro');
    }
}

// 7. TESTES E BOAS-VINDAS
function testarFuncionalidades() {
    console.log('🧪 Testes básicos:');
    console.table({
        JS: typeof window !== 'undefined',
        localStorage: !!localStorage,
        DOM: !!document
    });

    const hora = new Date().getHours();
    const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite';
    console.log(`👋 ${saudacao}! Bem-vindo à RodMok Store!`);
}

// ========== FECHAR MODAL ==========
document.addEventListener('click', function(e) {
    if (e.target.id === 'modal-carrinho') {
        document.getElementById('modal-carrinho').style.display = 'none';
    }
});

// ========== EXPORTAÇÕES ==========
window.RodMokStore = {
    adicionarAoCarrinho,
    atualizarContadorCarrinho
};

console.log('🚀 RodMok Store inicializado com sucesso!');
