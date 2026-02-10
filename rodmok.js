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
    
    // 4. Inicializar carrinho
    inicializarCarrinho();
    
    // 5. Animações de entrada
    animarEntrada();
    
    // 6. Testar funcionalidades
    testarFuncionalidades();
});

// ========== FUNÇÕES PRINCIPAIS ==========

// 1. ATUALIZAR ANO NO RODAPÉ
function atualizarAno() {
    try {
        const anoAtual = new Date().getFullYear();
        const elementoAno = document.getElementById('ano-atual');
        
        if (elementoAno) {
            elementoAno.textContent = anoAtual;
            console.log(`📅 Ano atualizado para: ${anoAtual}`);
        } else {
            console.log('⚠️ Elemento do ano não encontrado');
            // Tenta alternativa
            const footers = document.getElementsByTagName('footer');
            if (footers.length > 0) {
                const paragrafos = footers[0].getElementsByTagName('p');
                for (let p of paragrafos) {
                    if (p.textContent.includes('2024')) {
                        p.textContent = p.textContent.replace('2024', anoAtual);
                        console.log('✅ Ano corrigido via texto');
                        break;
                    }
                }
            }
        }
    } catch (erro) {
        console.log('❌ Erro ao atualizar ano:', erro.message);
    }
}

// 2. CONFIGURAR MENU ATIVO
function configurarMenu() {
    try {
        const links = document.querySelectorAll('.menu a');
        const urlAtual = window.location.hash || '#inicio';
        
        links.forEach(link => {
            link.classList.remove('ativo');
            if (link.getAttribute('href') === urlAtual) {
                link.classList.add('ativo');
            }
            
            // Adicionar evento de clique
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const destino = this.getAttribute('href');
                
                // Atualizar classe ativa
                links.forEach(l => l.classList.remove('ativo'));
                this.classList.add('ativo');
                
                // Rolagem suave
                if (destono.startsWith('#')) {
                    const elemento = document.querySelector(destino);
                    if (elemento) {
                        elemento.scrollIntoView({ behavior: 'smooth' });
                        console.log(`📍 Navegando para: ${destono}`);
                    }
                }
            });
        });
        
        console.log('✅ Menu configurado');
    } catch (erro) {
        console.log('⚠️ Menu não configurado:', erro.message);
    }
}

// 3. CONFIGURAR FORMULÁRIO
function configurarFormulario() {
    try {
        const formulario = document.querySelector('.form-contato');
        
        if (formulario) {
            formulario.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Pegar valores
                const nome = this.querySelector('input[type="text"]').value;
                const email = this.querySelector('input[type="email"]').value;
                const mensagem = this.querySelector('textarea').value;
                
                // Validação simples
                if (!nome || !email || !mensagem) {
                    alert('❌ Por favor, preencha todos os campos!');
                    return;
                }
                
                // Simular envio
                console.log('📧 Enviando mensagem:', { nome, email, mensagem });
                
                // Feedback visual
                const botao = this.querySelector('.btn-grande');
                const textoOriginal = botao.innerHTML;
                botao.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO...';
                botao.disabled = true;
                
                setTimeout(() => {
                    alert(`✅ Obrigado, ${nome}! Sua mensagem foi enviada com sucesso!\n\nResponderemos em até 48 horas.`);
                    formulario.reset();
                    botao.innerHTML = textoOriginal;
                    botao.disabled = false;
                    console.log('✅ Mensagem simulada enviada');
                }, 1500);
            });
            
            console.log('✅ Formulário configurado');
        }
    } catch (erro) {
        console.log('⚠️ Formulário não configurado:', erro.message);
    }
}

// 4. CARRINHO DE COMPRAS
function inicializarCarrinho() {
    try {
        // Recuperar carrinho do localStorage
        const carrinhoSalvo = localStorage.getItem('rodmokCarrinho');
        if (carrinhoSalvo) {
            carrinho = JSON.parse(carrinhoSalvo);
            atualizarContadorCarrinho();
            console.log('🛒 Carrinho recuperado:', carrinho);
        }
        
        // Configurar botão do carrinho
        const botaoCarrinho = document.querySelector('.carrinho');
        if (botaoCarrinho) {
            botaoCarrinho.addEventListener('click', function() {
                alert(`🛍️ Você tem ${carrinho.length} item(s) no carrinho!\n\nTotal: R$ ${totalCarrinho.toFixed(2)}`);
            });
        }
        
        console.log('✅ Carrinho inicializado');
    } catch (erro) {
        console.log('⚠️ Carrinho não inicializado:', erro.message);
    }
}

function adicionarCarrinho(idProduto) {
    try {
        // Produtos simulados
        const produtos = {
            1: { nome: 'Camiseta "Urban Legends"', preco: 89.90 },
            2: { nome: 'Jaqueta "Night Rider"', preco: 159.90 },
            3: { nome: 'Calça "Street Comfort"', preco: 129.90 }
        };
        
        const produto = produtos[idProduto];
        if (!produto) return;
        
        // Adicionar ao carrinho
        carrinho.push(produto);
        totalCarrinho += produto.preco;
        
        // Salvar no localStorage
        localStorage.setItem('rodmokCarrinho', JSON.stringify(carrinho));
        
        // Atualizar contador
        atualizarContadorCarrinho();
        
        // Feedback visual
        const botao = event.target;
        const textoOriginal = botao.innerHTML;
        botao.innerHTML = '<i class="fas fa-check"></i> ADICIONADO!';
        botao.style.background = '#1dd1a1';
        botao.style.borderColor = '#1dd1a1';
        botao.style.color = '#000';
        
        console.log(`✅ Produto adicionado: ${produto.nome}`);
        
        // Restaurar botão após 2 segundos
        setTimeout(() => {
            botao.innerHTML = textoOriginal;
            botao.style.background = '';
            botao.style.borderColor = '';
            botao.style.color = '';
        }, 2000);
        
    } catch (erro) {
        console.log('❌ Erro ao adicionar ao carrinho:', erro.message);
        alert('⚠️ Não foi possível adicionar o produto. Tente novamente.');
    }
}

function atualizarContadorCarrinho() {
    try {
        const contador = document.querySelector('.contador');
        if (contador) {
            contador.textContent = carrinho.length;
            contador.style.display = carrinho.length > 0 ? 'flex' : 'none';
        }
    } catch (erro) {
        console.log('⚠️ Contador não atualizado:', erro.message);
    }
}

// 5. ANIMAÇÕES
function animarEntrada() {
    try {
        // Animação no título principal
        const titulo = document.querySelector('.logo h1');
        if (titulo) {
            titulo.style.opacity = '0';
            titulo.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                titulo.style.transition = 'all 0.8s ease';
                titulo.style.opacity = '1';
                titulo.style.transform = 'translateY(0)';
            }, 300);
        }
        
        // Animação nos produtos
        const produtos = document.querySelectorAll('.produto');
        produtos.forEach((prod, index) => {
            prod.style.opacity = '0';
            prod.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                prod.style.transition = 'all 0.6s ease';
                prod.style.opacity = '1';
                prod.style.transform = 'translateY(0)';
            }, 500 + (index * 200));
        });
        
        console.log('✅ Animações configuradas');
    } catch (erro) {
        console.log('⚠️ Animações não funcionaram:', erro.message);
    }
}

// 6. TESTES
function testarFuncionalidades() {
    console.log('🧪 Testando funcionalidades...');
    
    // Teste básico
    const testes = {
        'JavaScript': typeof window !== 'undefined',
        'LocalStorage': typeof localStorage !== 'undefined',
        'Console': typeof console !== 'undefined',
        'DOM': typeof document !== 'undefined'
    };
    
    console.table(testes);
    
    // Mensagem de boas-vindas
    const hora = new Date().getHours();
    let saudacao;
    if (hora < 12) saudacao = 'Bom dia';
    else if (hora < 18) saudacao = 'Boa tarde';
    else saudacao = 'Boa noite';
    
    console.log(`👋 ${saudacao}! Bem-vindo(a) à RodMok Store!`);
}

// ========== FUNÇÕES ADICIONAIS ==========

// Newsletter
function inscreverNewsletter() {
    const input = document.querySelector('.newsletter input');
    if (input && input.value.includes('@')) {
        alert(`✅ Obrigado por se inscrever! Em breve você receberá nossas novidades no e-mail: ${input.value}`);
        input.value = '';
    } else {
        alert('❌ Por favor, insira um e-mail válido!');
        input.focus();
    }
}

// Configurar botão da newsletter
document.addEventListener('DOMContentLoaded', function() {
    const btnNewsletter = document.querySelector('.newsletter button');
    if (btnNewsletter) {
        btnNewsletter.addEventListener('click', inscreverNewsletter);
        
        const inputNewsletter = document.querySelector('.newsletter input');
        if (inputNewsletter) {
            inputNewsletter.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    inscreverNewsletter();
                }
            });
        }
    }
});

// ========== EXPORTAÇÃO PARA USO EXTERNO ==========
window.rodmokCarregado = true;
window.RodMokStore = {
    adicionarCarrinho,
    atualizarContadorCarrinho,
    testarFuncionalidades
};

console.log('🚀 RodMok Store JavaScript inicializado com sucesso!');