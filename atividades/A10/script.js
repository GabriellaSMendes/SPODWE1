const masks = {
    phone(value) {
        return value.replace(/\D+/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4,5})(\d{4})$/, '$1-$2');
    },
    cpf(value) {
        return value.replace(/\D+/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
};

document.querySelectorAll('input[data-js]').forEach(input => {
    const field = input.dataset.js;
    input.addEventListener('input', e => {
        e.target.value = masks[field](e.target.value);
    }, false);
});


document.getElementById('userForm').addEventListener('submit', function(event) {
    let isValid = true;

    document.querySelectorAll('input[required]').forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('invalid');
            isValid = false;
        } else {
            input.classList.remove('invalid');
        }
    });

    if (!isValid) {
        event.preventDefault();
        alert("Por favor, preencha todos os campos corretamente.");
    }
});
