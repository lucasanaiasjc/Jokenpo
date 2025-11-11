// Executa o jogo assim que a página for carregada
window.onload = function () {
    const jogo = new Jogo()
    jogo.iniciar()
}

class Jogo {
    constructor() {
        // Controle do sorteio
        this.sorteando = false

        // Caminhos das imagens de cada opção
        this.imagens = {
            pedra: './images/pedra.png',
            papel: './images/papel.png',
            tesoura: './images/tesoura.png'
        }

        // Elementos do HTML
        this.pontuacaoJogador = document.getElementById('pontuacao-jogador')
        this.pontuacaoComputador = document.getElementById('pontuacao-computador')
        this.imagemJogador = document.getElementById('mao-jogador')
        this.imagemComputador = document.getElementById('mao-computador')
        this.botoesEscolha = document.getElementsByClassName('botao-mao')
        this.textoResultado = document.querySelector('#resultado-rodada > span')

        // Guarda as escolhas atuais
        this.escolhas = {
            jogador: null,
            computador: null
        }

        // Guarda os pontos acumulados
        this.placar = {
            jogador: 0,
            computador: 0
        }
    }

    // Inicia o jogo e adiciona eventos aos botões
    iniciar() {
        [...this.botoesEscolha].forEach(botao => {
            botao.addEventListener('click', () => this.jogar(botao))
        })
    }

    // Executa uma rodada
    jogar(botao) {
        // Verifica se está sorteando
        if (this.sorteando) return

        // Bloquei até que o sorteio seja finalizado
        this.sorteando = true

        // Guarda a escolha do jogador
        this.escolhas.jogador = botao.getAttribute('data-escolha')

        // Sorteia uma escolha aleatória para o computador
        const opcoes = ['pedra', 'papel', 'tesoura']
        this.escolhas.computador = opcoes[Math.floor(Math.random() * opcoes.length)]

        // Mostra o texto "Sorteando..." e inicia a animação
        this.textoResultado.textContent = 'Sorteando...'
        this.imagemJogador.classList.add('mao-aleatoria')
        this.imagemComputador.classList.add('mao-aleatoria')

        // Aguarda 2 segundos antes de mostrar o resultado
        setTimeout(() => {
            // Para a animação
            this.imagemJogador.classList.remove('mao-aleatoria')
            this.imagemComputador.classList.remove('mao-aleatoria')

            // Atualiza as imagens de acordo com as escolhas
            this.imagemJogador.setAttribute('src', this.imagens[this.escolhas.jogador])
            this.imagemComputador.setAttribute('src', this.imagens[this.escolhas.computador])

            // Mostra o resultado e atualiza o placar
            this.mostrarResultado()
            this.atualizarPlacar()
        }, 2000)
    }

    // Atualiza o placar na tela
    atualizarPlacar() {
        this.pontuacaoJogador.textContent = this.placar.jogador
        this.pontuacaoComputador.textContent = this.placar.computador

        // Libera proximo sorteio
        this.sorteando = false
    }

    // Define quem venceu a rodada
    verificarVencedor() {
        const { jogador, computador } = this.escolhas

        if (jogador === computador) return "empate"

        if (
            (jogador === "pedra" && computador === "tesoura") ||
            (jogador === "papel" && computador === "pedra") ||
            (jogador === "tesoura" && computador === "papel")
        ) {
            return "jogador"
        } else {
            return "computador"
        }
    }

    // Mostra o resultado da rodada e soma os pontos
    mostrarResultado() {
        const vencedor = this.verificarVencedor()

        switch (vencedor) {
            case 'empate':
                this.textoResultado.textContent = 'Empate!'
                break
            case 'jogador':
                this.textoResultado.textContent = 'Jogador venceu!'
                this.placar.jogador++
                break
            case 'computador':
                this.textoResultado.textContent = 'Computador venceu!'
                this.placar.computador++
                break
            default:
                this.textoResultado.textContent = 'Erro ao determinar o vencedor.'
        }
    }
}
