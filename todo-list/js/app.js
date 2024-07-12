const alerta = document.querySelector('.alerta');
let listaTarefas = {};

// Ação do button Cadastrar
const btnCadastrar = document.querySelector('#btnCadastrar');
btnCadastrar.addEventListener('click', function(evento) {
    // Previne o comportamento padrão (do formulário)
    evento.preventDefault();

    // Se os campoes estiverem em branco
    if (!receberDados()) {
        return;
    }

    cadastrarTarefa();

    // Remove a mensagem de alerta
    removerAlerta(alerta, 2500);
});

// Ação do button Limpar
const btnLimpar = document.querySelector('#btnLimpar');
btnLimpar.style.display = 'none';

function receberDados() {
    const titulo = document.querySelector('#titulo');
    const descricao = document.querySelector('#descricao');
    alerta.classList.remove('sucesso');

    // Verifica se foi preenchido o titulo
    if (!validarDados(titulo.value)) {
        titulo.focus();
        alerta.innerHTML = 'Preencha o campo título';
        return false;
        // Early return (retorno antecipado)
    }

    // Verifica se foi preenchido a descricao
    if (!validarDados(descricao.value)) {
        descricao.focus();
        alerta.innerHTML = 'Preencha o campo descrição';
        return false;
    }

    // Adiciona o objeto no array
    listaTarefas = {
        titulo: titulo.value,
        descricao: descricao.value,
    };

    return true;
}

function validarDados(campo) {
    // Se o campo for diferente de '', retorna true, senão retorna false
    return campo != '' ? true : false;

    // É o mesma validação
    // if (campo != '') {
    //     return true;
    // } else {
    //     return false;
    // }
}

function cadastrarTarefa() {
    const id = gerenciarID();
    const titulo = listaTarefas.titulo;
    const descricao = listaTarefas.descricao;

    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    tarefas.push({ id, titulo, descricao });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    alerta.classList.add('sucesso');
    alerta.innerHTML = 'Tarefa cadastrada';
    listarTarefas();

    // Limpa os campos do form
    btnLimpar.click();
}

function listarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    const tarefasCadastradas = document.querySelector('#tarefas');
    tarefasCadastradas.innerHTML = '';

    tarefas.map(tarefa => {
        // Encapsula os valores informados
        const id = tarefa.id;
        const titulo = tarefa.titulo;
        const descricao = tarefa.descricao;

        const cardTarefa = document.createElement('div');
            cardTarefa.classList.add('card-tarefa');
            tarefasCadastradas.appendChild(cardTarefa);

        const cardTitulo = document.createElement('div');
            cardTitulo.innerHTML = titulo;

        const cardDescricao = document.createElement('div');
            cardDescricao.innerHTML = descricao;
        
        const btnEditar = document.createElement('button');
        btnEditar.setAttribute('id', id);
        btnEditar.innerHTML = 'Editar';
        btnEditar.addEventListener('click', () => {
            editarTarefa(id);
        });

        const btnExcluir    = document.createElement('button');
        btnExcluir.setAttribute('id', id);
        btnExcluir.innerHTML = 'Excluir';
        btnExcluir.addEventListener('click', function() {
            excluirTarefa(id);
        });
        
        cardTarefa.appendChild(cardTitulo);
        cardTarefa.appendChild(cardDescricao);
        cardTarefa.appendChild(btnEditar);
        cardTarefa.appendChild(btnExcluir);
        
        // const cardTarefa = document.createElement('div');
        // cardTarefa.classList.add('card-tarefa');
        // cardTarefa.innerHTML = `
        //     <div>${tarefa.titulo}</div>
        //     <div>${tarefa.descricao}</div>
        //     <div>
        //         <button id='${tarefa.id}' onclick='editarTarefa(id)'>
        //             Editar
        //         </button>
        //     </div>

        //     <div>
        //         <button id='${tarefa.id}' onclick='excluirTarefa(id)'>
        //             Excluir
        //         </button>
        //     </div>`;
    });
}

function gerenciarID() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    if (tarefas.length < 1) {
        return 1;

    } else {
        const maiorID = tarefas.reduce((max, obj) => obj.id > max.id ? obj : max, tarefas[0]);
        return maiorID.id +1;
    }
}

listarTarefas();

function excluirTarefa(_id) {
    // Busca a lista de tarefas em LocalStorage
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    // Procurar o id
    tarefas.map(objTarefa => {
        if (objTarefa.id == _id) {
            // Exclui o objeto na posição indicada
            tarefas.splice((objTarefa -1), 1);

            // Atualiza a lista de tarefas em LocalStorage
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
            listarTarefas();
        }
    });
}

function editarTarefa(id) {
    console.log(id);
}

function removerAlerta(elemento, tempo) {
    setTimeout(() => {
        elemento.innerHTML = '';
    }, tempo);   // 1 segundo == 1000 mili
}