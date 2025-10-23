from flask import Flask

app = Flask(__name__)

from .routes import geral
from .routes import contas
from .routes import acessos
from .routes import perfil
from .routes import gerenciar
from .routes import eventos
from .routes import weekly_post_routes
from api.routes.principal import api_conexao_bp

app.register_blueprint(api_conexao_bp, url_prefix='/api')


__all__ = [
    'geral',
    'contas',
    'acessos',
    'perfil',
    'gerenciar',
    'eventos',
    'weekly_post_routes'
]