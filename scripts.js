/**
 * Função para o contador regressivo da promoção.
 * Esta função agora atualiza TODOS os elementos de contagem da página.
 */
function atualizarContadoresPromocao() {
    // Define a data final da promoção (ano, mês-1, dia, hora, minuto, segundo).
    // Usamos o dia 30 do mês atual.
    const hoje = new Date();
    const dataFinal = new Date(hoje.getFullYear(), hoje.getMonth(), 30, 23, 59, 59);
    
    // Pega a data e hora atual.
    const dataAtual = new Date();

    // Calcula a diferença em milissegundos.
    const diferenca = dataFinal - dataAtual;

    // Encontra TODOS os elementos que devem exibir o contador.
    const elementosContador = document.querySelectorAll('.contador-produto, #contador-promocao');
    
    // Prepara a mensagem a ser exibida.
    let mensagem;
    if (diferenca < 0) {
        mensagem = "PROMOÇÃO ENCERRADA!";
        clearInterval(intervalo); // Para o contador se o tempo acabou.
    } else {
        // Converte a diferença para dias, horas e minutos.
        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
        
        // Mensagem formatada SEM os segundos.
        mensagem = `A oferta termina em: ${dias}d ${horas}h ${minutos}m`;
    }

    // Usa um loop 'forEach' para atualizar cada elemento encontrado.
    elementosContador.forEach(elemento => {
        elemento.innerHTML = mensagem;
    });
}

/**
 * A função setInterval executa 'atualizarContadoresPromocao' a cada 1 segundo.
 */
const intervalo = setInterval(atualizarContadoresPromocao, 1000);

/**
 * Esta função é executada assim que o conteúdo da página HTML é carregado.
 * Ela verifica se há um parâmetro 'servico' na URL e seleciona o radio button
 * correspondente no formulário de cadastro.
 */
document.addEventListener('DOMContentLoaded', function() {
    // Pega os parâmetros da URL da página atual.
    const parametros = new URLSearchParams(window.location.search);
    
    // Procura pelo parâmetro específico 'servico'.
    const servicoSelecionado = parametros.get('servico');

    // Se o parâmetro 'servico' existir na URL...
    if (servicoSelecionado) {
        // ...verifica se o valor é 'retirada'.
        if (servicoSelecionado === 'retirada') {
            // Procura o radio button de retirada e o marca.
            document.getElementById('servico_retirada').checked = true;
        } 
        // ...ou verifica se o valor é 'entrega'.
        else if (servicoSelecionado === 'entrega') {
            // Procura o radio button de entrega e o marca.
            document.getElementById('servico_entrega').checked = true;
        }
    }
});