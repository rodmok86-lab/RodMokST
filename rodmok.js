// RODMOK STORE - JavaScript Principal
console.log('🎯 RodMok Store JavaScript carregado!');

let carrinho = [];
let totalCarrinho = 0;
const rodmokCarregado = true;

document.addEventListener('DOMContentLoaded', () => {
    atualizarAno();
    configurarMenu();
    inicializarCarrinho();
    configurarFormulario();
    configurarNewsletter();
});

// Atualizar ano
function atualizarAno() {
    document.getElementById('ano-atual').textContent = new Date().getFullYear();
}

// Menu + rolagem suave
function configurarMenu() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            // Atualiza ativo no menu
            if (link.closest('.menu')) {
                document.querySelectorAll('.menu a').forEach(a => a.classList.remove('ativo'));
                link.classList.add('ativo');
            }
        });
    });
}

// Carrinho
function inicializarCarrinho() {
    const salvo = localStorage.getItem('rodmokCarrinho');
    if (salvo) {
        carrinho = JSON.parse(salvo);
        totalCarrinho = carrinho.reduce((acc, item) => acc + item.preco, 0);
    }
    atualizarContador();

    document.querySelector('.carrinho').addEventListener('click', abrirModal);
    document.querySelectorAll('.btn-adicionar').forEach(btn => {
        btn.addEventListener('click', () => adicionarAoCarrinho(btn.dataset.id));
    });
    document.getElementById('fechar-carrinho').addEventListener('click', fecharModal);
    document.getElementById('modal-carrinho').addEventListener('click', e => {
        if (e.target === e.currentTarget) fecharModal();
    });
}

function adicionarAoCarrinho(id) {
    const produtos = {
        '1': { nome: 'Camiseta "Urban Legends"', preco: 89.90 },
        '2': { nome: 'Jaqueta "Night Rider"', preco: 159.90 },
        '3': { nome: 'Calça "Street Comfort"', preco: 129.90 }
    };

    const prod = produtos[id];
    if (!prod) return;

    carrinho.push(prod);
    totalCarrinho += prod.preco;
    localStorage.setItem('rodmokCarrinho', JSON.stringify(carrinho));
    atualizarContador();

    const btn = event.target.closest('button');
    const txt = btn.innerHTML;
    btn.innerHTML = 'Adicionado ✓';
    setTimeout(() => btn.innerHTML = txt, 1500);
}

function removerDoCarrinho(index) {
    totalCarrinho -= carrinho[index].preco;
    carrinho.splice(index, 1);
    localStorage.setItem('rodmokCarrinho', JSON.stringify(carrinho));
    atualizarContador();
    renderizarCarrinho();
}

function atualizarContador() {
    document.querySelector('.contador').textContent = carrinho.length;
}

function abrirModal() {
    renderizarCarrinho();
    document.getElementById('modal-carrinho').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modal-carrinho').style.display = 'none';
}

function renderizarCarrinho() {
    const lista = document.getElementById('itens-carrinho');
    const totalEl = document.getElementById('total-carrinho');

    lista.innerHTML = carrinho.length === 0 
        ? '<p style="text-align:center; color:#aaa;">Carrinho vazio</p>'
        : carrinho.map((item, i) => `
            <div class="item-carrinho">
                <div>\( {item.nome} — R \) ${item.preco.toFixed(2)}</div>
                <button class="btn-remover" onclick="removerDoCarrinho(${i})">Remover</button>
            </div>
        `).join('');

    totalEl.textContent = `Total: R$ ${totalCarrinho.toFixed(2)}`;
}

// Formulário (simples)
function configurarFormulario() {
    document.querySelector('.form-contato')?.addEventListener('submit', e => {
        e.preventDefault();
        alert('Mensagem enviada! (simulado)');
    });
}

// Newsletter (simples)
function configurarNewsletter() {
    document.querySelector('.newsletter button')?.addEventListener('click', () => {
        alert('Inscrito! (simulado)');
    });
}

console.log('🚀 Site pronto!');
