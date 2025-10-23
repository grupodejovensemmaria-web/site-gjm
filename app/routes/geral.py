from flask import request, session, render_template, jsonify
from werkzeug.exceptions import HTTPException
from app import app
from datetime import datetime, date
import requests

def get_liturgia_data(dia: str = None) -> dict:
    """
    Retorna liturgia do dia estruturada em dicionário.
    :param dia: data no formato 'YYYY-MM-DD' (opcional)
    """
    if not dia:
        dia = date.today().strftime("%d-%m-%Y")  # Formato da API

    url = f"https://liturgia.up.railway.app/v2/{dia}"
    response = requests.get(url)
    response.raise_for_status()
    data = response.json()

    leituras = data.get("leituras", {})
    oracoes = data.get("oracoes", {})
    antifonas = data.get("antifonas", {})

    def extrair_leitura(bloco):
        return [{"referencia": l.get("referencia", ""), "texto": l.get("texto", "")} for l in bloco] if bloco else []

    return {
        "data": data.get("data"),
        "liturgia": data.get("liturgia"),
        "cor": data.get("cor"),
        "oracoes": {
            "coleta": oracoes.get("coleta"),
            "oferendas": oracoes.get("oferendas"),
            "comunhao": oracoes.get("comunhao"),
        },
        "leituras": {
            "primeira": extrair_leitura(leituras.get("primeiraLeitura")),
            "salmo": extrair_leitura(leituras.get("salmo")),
            "segunda": extrair_leitura(leituras.get("segundaLeitura")),
            "evangelho": extrair_leitura(leituras.get("evangelho")),
        },
        "antifonas": {
            "entrada": antifonas.get("entrada"),
            "comunhao": antifonas.get("comunhao"),
        }
    }

@app.context_processor
def inject_now():

    if 'user' not in session:
        user = { 'is_authenticated': False }
    else:
        user = { 'is_authenticated': True }

    return {'now': datetime.now(), 'current_user': user}


def obter_titulo_ato(ato_numero):
    titulos = {
        1: "Criação",
        2: "Humanidade caída",
        3: "Reconciliações",
        4: "Maria",
        5: "Pentecostes",
        6: "Nossa Senhora de Guadalupe",
        7: "GJ Guadalupe",
        8: "Venha ser de Deus",
        9: "Tua graça me basta",
        10: "Sou estrangeiro aqui, o céu é meu lar"
    }
    return titulos.get(ato_numero, "")

def obter_descricao_ato(ato_numero):
    descricoes = {
        1: """<p><blockquote>“No princípio, Deus criou o céu e a terra.” (Gn 1,1)</blockquote></p>
<p>E tudo começou do absoluto nada. A criação era boa, profundamente boa. Tudo o que existe brotou do amor transbordante de Deus. A natureza, os rios, os céus estrelados e o sopro da vida humana manifestam uma ordem que não é apenas física, mas espiritual.</p>
<p>Nesta contemplação do Éden, reconhecemos a beleza do Criador e a vocação original da humanidade: viver em comunhão com Deus e com toda a criação.</p>""",
        2: """<p><blockquote>“Comerás do suor do teu rosto, até que tornes à terra.” (Gn 3,19)</blockquote></p>
<p>O dom da liberdade exigia responsabilidade. Mas o ser humano, seduzido pela ilusão de autonomia absoluta, afastou-se do Criador. A queda não foi apenas moral, mas existencial: inaugurou-se uma ferida no coração humano e no mundo.</p>
<p>Violência, egoísmo, medo, caos urbano, pressa. A humanidade caminha, mas muitas vezes perdida. O paraíso se distancia – não por castigo divino, mas pela escolha humana de viver longe do amor.</p>""",
        3: """<p><blockquote>“O Senhor, teu Deus, é misericordioso: não te abandonará.” (Dt 4,31)</blockquote></p>
<p>Mesmo após a queda, Deus nunca desistiu da humanidade. Com ternura e firmeza, iniciou uma longa jornada de reconciliação. Escolheu patriarcas, levantou profetas, inspirou reis e cultivou esperanças.</p>
<p>Toda a história de Israel aponta para um Messias que redimiria não apenas um povo, mas toda a criação. É o Deus que educa, acompanha, resgata e promete um novo céu e nova terra.</p>""",
        4: """<p><blockquote>“Eis aqui a serva do Senhor. Faça-se em mim segundo a tua palavra.” (Lc 1,38)</blockquote></p>
<p>Na plenitude dos tempos, Deus encontra em Maria um coração totalmente disponível. O “fiat” (em latim, "faça-se") da jovem de Nazaré resume a resposta da humanidade redimida: acolher com liberdade e confiança o projeto divino.</p>
<p>Em Maria, vemos o cumprimento das promessas, a maternidade espiritual da Igreja e a presença da mulher forte que está aos pés da cruz e no nascimento da comunidade cristã. Maria é ponte entre o antigo e o novo, entre o céu e a terra.</p>""",
        5: """<p><blockquote>“Recebereis a força do Espírito Santo e sereis minhas testemunhas.” (At 1,8)</blockquote></p>
<p>A ressurreição de Jesus inaugura uma nova etapa: o tempo da missão. O Espírito Santo desce sobre os apóstolos e, desde então, sobre toda a Igreja.</p>
<p>Este é o tempo da ação evangelizadora, da ousadia dos jovens em anunciar, da criatividade da fé encarnada. É também o tempo das lutas, dos desafios modernos e da esperança que não decepciona. Aqui, somos chamados a sair, ir ao encontro, construir comunidade.</p>""",
        6: """<p><blockquote>“Não estou eu aqui, que sou tua Mãe?” (Nossa Senhora a Juan Diego)</blockquote></p>
<p>Entre os séculos e continentes, a Mãe de Deus continua a visitar seus filhos. Em 1531, em Guadalupe, ela se manifesta como mulher do povo, com rosto indígena, vestida de céu.</p>
<p>No Brasil, ela se faz presente nas comunidades simples, nas igrejas vivas, nas festas populares e no carinho materno do povo. Aqui em Vila Velha, a presença de Nossa Senhora de Guadalupe renova a fé, a pertença e a missão. Ela caminha conosco.</p>""",
        7: """<p><blockquote>“Jovens, não tenham medo! Aceitem o convite da Igreja e de Cristo Senhor!” (Papa Leão XIV)</blockquote></p>
<p>Inspirados por Maria e movidos pelo Espírito, jovens se organizam, se unem e constroem comunidade. A família GJ nasce da necessidade de escutar da Palavra e servir a Deus com criatividade, alegria e coragem.</p>
<p>Não somos espectadores da fé, mas protagonistas de um novo tempo.</p>""",
        8: """<p><blockquote>“Vinde a mim todos vós que estais cansados e sobrecarregados.” (Mt 11,28)</blockquote></p>
<p>A fé cristã não é imposição, mas convite. Um chamado suave, constante e insistente à conversão, à comunhão, à vida em plenitude. Aqui, os jovens de 18 a 29 anos são convidados a dar um passo a mais.</p>
<p>Não é uma campanha, mas um apelo pessoal: tua graça me basta. Jesus estende a mão. A família GJ estende o coração. Você é esperado(a), como está.</p>""",
        9: """<p><blockquote>“Basta-te a minha graça, pois é na fraqueza que se revela a minha força.” (2Cor 12,9)</blockquote></p>
<p>Esse versículo não é um lema decorativo – é uma experiência espiritual profunda. Em meio às fragilidades, doenças, limitações e quedas, a graça de Deus se mostra suficiente.</p>
<p>O verdadeiro milagre é permanecer firme, mesmo fraco. É essa graça que sustenta a caminhada, reacende a fé, renova o ânimo. Aqui, há espaço para a oração pessoal, o silêncio fecundo e o encontro íntimo com o Senhor.</p>""",
        10: """<p><blockquote>“Lutai para entrar pela porta estreita...” (Lc 13,24)</blockquote></p>
<p>A história não termina na terra. A vocação última da humanidade é a eternidade. Rumo ao céu, caminhamos com os olhos fixos em Cristo.</p>
<p>A fé cristã não é alienação, mas esperança viva. A juventude que evangeliza também é aquela que sonha com o céu – não como fuga, mas como destino. Juntos queremos celebrar a promessa final: um novo tempo, onde Deus será tudo em todos.</p><p>A família GJ lhe espera para caminharmos juntos nessa jornada.</p>"""
    }
    return descricoes.get(ato_numero, "")

@app.route('/index')
@app.route('/')
def home():

    try:
        liturgia = get_liturgia_data()
    except Exception as e:
        app.logger.error(f"Erro ao obter liturgia diária: {str(e)}")
        liturgia = None

    return render_template('pages/public/home.html',
                         obter_titulo_ato=obter_titulo_ato,
                         obter_descricao_ato=obter_descricao_ato,
                         liturgia=liturgia)

@app.route('/liturgia-diaria')
def liturgia_diaria():
    try:
        data = get_liturgia_data()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.errorhandler(400)
@app.errorhandler(401)
@app.errorhandler(403)
@app.errorhandler(404)
@app.errorhandler(500)
@app.route('/error')
def handle_error(e=None):
    error_info = {
        'code': e.code if isinstance(e, HTTPException) else 500,
        'name': e.name if isinstance(e, HTTPException) else "Erro Interno",
        'description': e.description if isinstance(e, HTTPException) else "Ocorreu um erro inesperado",
        'path': request.path,
        'method': request.method
    }
    return render_template('pages/public/error.html', error=error_info), error_info['code']
