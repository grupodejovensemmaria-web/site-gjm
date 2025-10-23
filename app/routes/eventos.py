from app import app
from config import secret_key, required_roles
from flask import render_template, request, redirect, session, jsonify

app.secret_key = secret_key

def ver_eventos_com_presencas():
    from config import executar_sql
    from datetime import datetime

    query = """
    SELECT 
        e.id,
        e.nome,
        e.data_evento,
        e.local_evento,
        e.descricao,
        e.publico_alvo,
        e.observacoes,
        p.usuario_nome
    FROM eventos e
    LEFT JOIN eventos_presencas p ON e.id = p.evento_id
    ORDER BY e.data_evento DESC
    """

    resultados = executar_sql(query)

    eventos_dict = {}
    for row in resultados:
        evento_id = row[0]
        if evento_id not in eventos_dict:
            eventos_dict[evento_id] = {
                'id': row[0],
                'nome': row[1],
                'data_evento': datetime.fromisoformat(row[2]) if row[2] else None,
                'local_evento': row[3],
                'descricao': row[4],
                'publico_alvo': row[5],
                'observacoes': row[6],
                'presencas': []
            }
        if row[7]:  # p.usuario_nome
            eventos_dict[evento_id]['presencas'].append({'nome': row[7]})

    return list(eventos_dict.values())

@app.route('/eventos')
@required_roles('admin', 'user')
def eventos():
    eventos = ver_eventos_com_presencas()
    return render_template('pages/private/eventos.html', eventos=eventos)

@app.route('/confirmar-presenca', methods=['POST'])
@required_roles('admin', 'user')
def confirmar_presenca():
    from config import executar_sql
    from utils import detalhar_usuario
    import json
    from flask import request, session

    dados = request.get_json()
    evento_id = dados['evento_id']
    usuarioname = session['user']['username']

    if not usuarioname or not evento_id:
        return jsonify({'status': 'erro', 'message': 'Dados incompletos'})

    detalhes_usuario = detalhar_usuario(usuarioname)
    nome_usuario = detalhes_usuario['nome_completo']
    usuario_id = detalhes_usuario['id']

    try:

        query = f"SELECT id FROM eventos_presencas WHERE evento_id = {evento_id} AND usuario_id = {usuario_id}"
        resultado = executar_sql(query)
        if resultado:
            return jsonify({
                'status': 'erro',
                'message': f'Presença já confirmada para o evento {evento_id} por {nome_usuario}'
            })

        executar_sql(f"""
INSERT INTO eventos_presencas (evento_id, usuario_id, usuario_nome)
VALUES ({evento_id}, {usuario_id}, '{nome_usuario}')
        """)

        return jsonify({
            'status': 'ok',
            'message': f'Presença confirmada para o evento {evento_id} por {nome_usuario}',
            'usuario': {'id': usuario_id, 'nome': nome_usuario}
        })

    except Exception as e:
        return jsonify({'status': 'erro', 'message': str(e)})

@app.route('/remover-presenca', methods=['POST'])
@required_roles('admin', 'user')
def remover_presenca():
    from config import executar_sql
    from utils import detalhar_usuario
    import json
    from flask import request, session

    dados = request.get_json()
    evento_id = dados['evento_id']
    usuarioname = session['user']['username']

    if not usuarioname or not evento_id:
        return jsonify({'status': 'erro', 'message': 'Dados incompletos'})

    detalhes_usuario = detalhar_usuario(usuarioname)
    nome_usuario = detalhes_usuario['nome_completo']
    usuario_id = detalhes_usuario['id']

    try:
        executar_sql(f"""
DELETE FROM eventos_presencas
WHERE evento_id = {evento_id} AND usuario_id = {usuario_id}
        """)
        return jsonify({
            'status': 'ok',
            'message': f'Presença removida para o evento {evento_id} por {nome_usuario}',
            'usuario': {'id': usuario_id, 'nome': nome_usuario}
        })
    except Exception as e:
        return jsonify({'status': 'erro', 'message': str(e)})

@app.route('/eventos_alterar', methods=['POST'])
def eventos_alterar():
    from config import executar_sql
    from utils import inserir_log

    tipo_acao = request.form.get('tipo_acao')
    username = session['user']['username']
    
    if tipo_acao == 'criar':
        # Processar criação
        nome = request.form.get('nome')
        data = request.form.get('data')
        local = request.form.get('local')
        recorrencia = request.form.get('recorrencia')
        descricao = request.form.get('descricao')
        publico_alvo = request.form.get('publico_alvo')
        observacoes = request.form.get('observacoes')
        
        query = f"""
        INSERT INTO eventos 
            (nome, data_evento, local_evento, recorrencia, descricao, publico_alvo, observacoes, criado_por) 
        VALUES 
            ('{nome}', '{data}', '{local}', '{recorrencia}', '{descricao}', '{publico_alvo}', '{observacoes}', '{username}')
        """
        
        res = executar_sql(query)
        
        if 'SUCESSO' in str(res).upper():
            inserir_log(username, 'Evento criado', f'Sucesso ao criar evento: Nome: {nome}, Data: {data}, Local: {local}')

    elif tipo_acao == 'atualizar':
        # Processar atualização
        evento_id = request.form.get('evento_id')
        novo_nome = request.form.get('novo_nome')
        nova_data = request.form.get('nova_data')
        novo_local = request.form.get('novo_local')
        descricao = request.form.get('nova_descricao')
        publico_alvo = request.form.get('novo_publico_alvo')
        observacoes = request.form.get('novas_observacoes')
        
        query = f"""
        UPDATE eventos 
        SET 
            nome = '{novo_nome}', 
            data_evento = '{nova_data}', 
            local_evento = '{novo_local}',
            descricao = '{descricao}',
            publico_alvo = '{publico_alvo}',
            observacoes = '{observacoes}',
            atualizado_em = CURRENT_TIMESTAMP
        WHERE 
            id = {evento_id}
        """
        
        res = executar_sql(query)
        
        if 'SUCESSO' in str(res).upper():
            inserir_log(username, 'Evento atualizado', f'Sucesso ao atualizar evento: ID: {evento_id}, Novo Nome: {novo_nome}, Nova Data: {nova_data}, Novo Local: {novo_local}')

    elif tipo_acao == 'remover':
        # Processar remoção
        evento_id = request.form.get('evento_id_remover')
        
        query = f"DELETE FROM eventos WHERE id = {evento_id}"
        
        res = executar_sql(query)
        
        if 'SUCESSO' in str(res).upper():
            inserir_log(username, 'Evento removido', f'Sucesso ao remover evento: ID: {evento_id}')

    return redirect('/eventos')
