const API_URL = 'http://localhost:3000/subjects';

// Função para carregar e exibir todas as matérias
async function fetchSubjects() {
    const res = await fetch(API_URL, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    const subjects = await res.json();
    const grid = document.getElementById('subjects-grid');
    grid.innerHTML = '';

    subjects.forEach(s => {
        grid.innerHTML += `
            <div class="subject-card" style="border-left-color: ${s.color || '#8b5cf6'}">
                <h3>${s.name}</h3>
                <p>${s.description || 'Sem descrição.'}</p>
                <div class="actions">
                    <button class="btn-edit" onclick="editSubject('${s._id}', '${s.name}', '${s.description}')">Editar</button>
                    <button class="btn-delete" onclick="deleteSubject('${s._id}')">Excluir</button>
                </div>
            </div>
        `;
    });
}

// Função para salvar (criar ou atualizar) uma matéria
async function saveSubject() {
    const id = document.getElementById('subject-id').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;

    if (!name) return alert("O título é obrigatório");

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name, description })
    });

    resetForm();
    fetchSubjects();
}

// Função para deletar uma matéria
async function deleteSubject(id) {
    if (confirm("Deseja realmente excluir esta matéria?")) {
        await fetch(`${API_URL}/${id}`, { 
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        fetchSubjects();
    }
}

// Função para preencher o formulário para edição
function editSubject(id, name, description) {
    document.getElementById('subject-id').value = id;
    document.getElementById('name').value = name;
    document.getElementById('description').value = description;
    
    document.getElementById('form-title').innerText = "Editar Matéria";
    document.getElementById('btn-save').innerText = "Atualizar Alterações";
    document.getElementById('btn-cancel').style.display = "inline-block";
    
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o topo para o formulário ficar visível
}

// Função para resetar o formulário
function resetForm() {
    document.getElementById('subject-id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('description').value = '';
    document.getElementById('form-title').innerText = "Nova Matéria";
    document.getElementById('btn-save').innerText = "Salvar Matéria";
    document.getElementById('btn-cancel').style.display = "none";
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker registrado'));
}

// Carregar as matérias ao iniciar a página
fetchSubjects();
