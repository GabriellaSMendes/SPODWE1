'use strict';

const cepInput = document.getElementById('cep');
const cepError = document.getElementById('cepError');

cepInput.addEventListener('blur', buscaCEP);

function apresentarDados(data) {
    if (data.erro) {
        cepError.textContent = 'CEP não encontrado.';
        limparCampos();
        return;
    }

    document.getElementById('logradouro').value = data.logradouro;
    document.getElementById('bairro').value = data.bairro;
    document.getElementById('localidade').value = data.localidade;
    document.getElementById('uf').value = data.uf;
    cepError.textContent = '';
}

function limparCampos() {
    document.getElementById('logradouro').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('localidade').value = '';
    document.getElementById('uf').value = '';
}

function buscaCEP(e) {
    const cep = cepInput.value.replace(/\D+/g, '');

    if (cep.length !== 8) {
        cepError.textContent = 'CEP inválido. Digite 8 números.';
        limparCampos();
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => apresentarDados(data))
        .catch(error => {
            console.log('Erro:', error.message);
            cepError.textContent = 'Erro ao buscar CEP. Tente novamente.';
            limparCampos();
        });
}