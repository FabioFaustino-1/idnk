const BASE_URL = 'http://localhost:3000/auth';
let isLoginMode = true;

function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    document.getElementById('auth-title').innerText = isLoginMode ? 'Autenticação' : 'Criar Conta';
    document.getElementById('auth-subtitle').innerText = isLoginMode ? 'Acesse sua conta para continuar' : 'Crie sua conta gratuita';
    document.getElementById('auth-btn').innerText = isLoginMode ? 'Entrar' : 'Cadastrar';
    document.getElementById('register-fields').style.display = isLoginMode ? 'none' : 'block';
    document.getElementById('toggle-auth').innerHTML = isLoginMode ? 'Não tem uma conta? <b>Cadastre-se</b>' : 'Já tem conta? <b>Faça Login</b>';
}

async function handleAuth() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (isLoginMode) {
        const res = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        
        if (res.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userName', data.user.name);
            window.location.href = 'index.html';
        } else {
            alert(data.error);
        }
    } else {
        const name = document.getElementById('reg-name').value;
        const res = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        
        if (res.ok) {
            alert("Cadastro realizado! Agora faça login.");
            toggleAuthMode();
        } else {
            const data = await res.json();
            alert(data.error);
        }
    }
}

if (localStorage.getItem('token')) window.location.href = 'index.html';