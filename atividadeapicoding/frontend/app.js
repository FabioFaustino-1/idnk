const API_URL = 'http://localhost:3000/subjects';

// carregar matérias
async function loadSubjects() {
  const res = await fetch(API_URL);
  const data = await res.json();

  const list = document.getElementById('subjectList');
  list.innerHTML = '';

  data.forEach(subject => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${subject.name}
      <button onclick="deleteSubject('${subject._id}')">Excluir</button>
    `;
    list.appendChild(li);
  });
}

// adicionar matéria
async function addSubject() {
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;

  await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, description })
  });

  loadSubjects();
}

// deletar
async function deleteSubject(id) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  loadSubjects();
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker registrado'));
}
// iniciar
loadSubjects();

