from functools import wraps
from flask import request, session, jsonify
import time
from utils import validar_acesso, ver_usuarios
from app import app
from dotenv import load_dotenv
import os
load_dotenv()
secret_key = os.getenv('SECRET_KEY')
app.secret_key = secret_key

# Definindo tempo de expiração da sessão (ex: 30 minutos)
SESSION_TIMEOUT = 1800

def get_authenticated_user_roles():
    """Recupera as roles do usuário autenticado."""
    if 'user' not in session:
        return None

    # Verifica se o tempo da sessão expirou
    if time.time() - session.get('last_activity', 0) > SESSION_TIMEOUT:
        session.clear()
        return None

    session['last_activity'] = time.time()  # Atualiza a última atividade
    roles = session['user'].get('roles', [])
    return roles

def required_roles(*required_roles):
    """Verifica se o usuário tem as roles necessárias para acessar a rota."""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            user_roles = get_authenticated_user_roles()
            if user_roles is None:
                return jsonify({"error": "Não autenticado ou sessão expirada"}), 401

            # Verifica se o usuário tem pelo menos uma das roles necessárias
            if not any(role in user_roles for role in required_roles):
                return jsonify({"error": "Permissão insuficiente"}), 403

            return f(*args, **kwargs)
        return decorated_function
    return decorator

# Função auxiliar para obter roles de um usuário
def get_user_roles(username: str) -> list:
    """Retorna as roles do usuário."""
    users = ver_usuarios()  # Supondo que `ver_usuarios` retorna uma lista de usuários
    for user in users:
        if user['username'] == username:
            return [user['cargo']]  # Ou qualquer estrutura que defina as roles
    return []

def validar_api_usuario(username, password):
    """Valida usuário para acesso via API."""
    return validar_acesso(username, password)
