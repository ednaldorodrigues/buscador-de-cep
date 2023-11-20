interface dadosCep {
    localidade: string;
    uf: string;
    bairro: string;
    logradouro: string;
    complemento: string;
}

const infos = document.querySelector('#infos');
const erro = document.querySelector('#erro');

async function buscaCep(cep: string): Promise<dadosCep> {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    return data;
}


async function handleSubmit(event: MouseEvent) {
    event.preventDefault();
    try {
        if(erro) {
            erro.innerHTML = ''
        }
        const inputCep = document.querySelector<HTMLInputElement>('#cep');
        const cep = inputCep?.value;
        if(!cep) {
            return alert('Campo vazio, preencha um valor.');
        }

        if(infos) {
            infos.innerHTML = '';
        }

        if(cep && infos) {
            const data = await buscaCep(cep);
            
            const {localidade, uf, bairro, logradouro, complemento} = data;

            if(localidade !== '') {
                infos.innerHTML += `<p>Cidade: ${localidade.toLocaleUpperCase()}</p>`
            }

            if(uf !== '') {
                infos.innerHTML += `<p>Estado:  ${uf.toLocaleUpperCase()}</p>`
            }
            
            if(bairro !== '') {
                infos.innerHTML += `<p>Bairro: ${bairro.toLocaleUpperCase()}</p>`
            }

            if(logradouro !== '') {
                infos.innerHTML += `<p>Rua: ${logradouro.toLocaleUpperCase()}</p>`
            }

            if(complemento !== '') {
                infos.innerHTML += `<p>Complemento: ${complemento.toLocaleUpperCase()}</p>`
            }

            inputCep.value = '';
        }
    
    } catch (error){
        console.error('Erro ao buscar dados', error);
        if(erro) {
            if(infos) {
                infos.innerHTML = ''
            }
            inputCep?.classList.add('active');
            erro.innerHTML = `
            <p>O cep buscado pode estar incorreto ou é inexistente.</p>
            `
        }
    }
}

const inputCep = document.querySelector<HTMLInputElement>('#cep');
inputCep?.addEventListener('input', () => {
    inputCep.value = inputCep.value.replace(/[^0-9-]/g, '');
});

inputCep?.addEventListener('keydown', () => {
    if(erro) erro.innerHTML = '';
    inputCep?.classList.remove('active');
});

const button = document.querySelector<HTMLButtonElement>('#btn');
button?.addEventListener('click', handleSubmit);