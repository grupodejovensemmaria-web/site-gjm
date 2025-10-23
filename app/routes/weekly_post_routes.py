from flask import Blueprint, request, jsonify, redirect, url_for, flash, render_template, session
from werkzeug.utils import secure_filename
import os
from datetime import datetime
from config import executar_sql, path_app_static
from utils import detalhar_usuario
from app import app

# Configurações (ajuste conforme seu projeto)
UPLOAD_FOLDER = os.path.join(path_app_static, 'images', 'weekly_posts')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/weekly-post', methods=['GET'])
def get_weekly_post():
    # Pega o post ativo mais recente
    query = """
        SELECT wp.*, u.username as author_name 
        FROM weekly_posts wp
        LEFT JOIN usuarios u ON wp.author_id = u.id
        WHERE wp.is_active = 1 
        ORDER BY wp.created_at DESC 
        LIMIT 1
    """
    current_post = executar_sql(query)[0]

    if current_post:
        return jsonify({
            'title': current_post[1],
            'subtitle': current_post[2],
            'image_path': current_post[3],
            'content': current_post[4],
            'author': current_post[-1],
            'created_at': current_post[-4]
        })
    return jsonify({'message': 'No active weekly post found'}), 404

@app.route('/manage_weekly_post', methods=['GET', 'POST'])
def manage_weekly_post():
    if 'user' not in session:
        return render_template('pages/public/home.html')
    
    if request.method == 'POST':
        title = request.form.get('title')
        subtitle = request.form.get('subtitle')
        content = request.form.get('content')
        user_logado = session['user']['username']
        author_data = detalhar_usuario(user_logado)
        author_id = author_data['id'] if author_data else None
        
        # Verifica se o arquivo foi enviado
        if 'image' not in request.files:
            flash('Nenhuma imagem foi enviada', 'danger')
            return redirect(request.url)
            
        file = request.files['image']
        
        if file.filename == '':
            flash('Nenhuma imagem selecionada', 'danger')
            return redirect(request.url)
            
        if file and allowed_file(file.filename):
            # Cria diretório se não existir
            os.makedirs(UPLOAD_FOLDER, exist_ok=True)
            
            filename = secure_filename(f"{datetime.now().timestamp()}_{file.filename}")
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            
            # Desativa todos os posts anteriores
            executar_sql('UPDATE weekly_posts SET is_active = 0')
            
            # Insere o novo post
            insert_query = f"""
                INSERT INTO weekly_posts 
                (title, subtitle, image_path, content, author_id) 
                VALUES 
                ('{title}', '{subtitle}', '{filename}', '{content}', {author_id})
            """.format(
                title=title.replace("'", "''"),
                subtitle=subtitle.replace("'", "''"),
                filename=filename,
                content=content.replace("'", "''"),
                author_id=author_id
            )
            
            executar_sql(insert_query)
            
            flash('Post da semana atualizado com sucesso!', 'success')
            return redirect(url_for('manage_weekly_post'))
        else:
            flash('Formato de arquivo não permitido. Use PNG, JPG ou JPEG.', 'danger')
    
    # GET: Mostra o formulário e o post atual
    current_post = executar_sql("""
        SELECT wp.*, u.username as author_name 
        FROM weekly_posts wp
        LEFT JOIN usuarios u ON wp.author_id = u.id
        WHERE wp.is_active = 1 
        ORDER BY wp.created_at DESC 
        LIMIT 1
    """)[0]

    if current_post:
        post = {
            'title': current_post[1],
            'subtitle': current_post[2],
            'image_path': current_post[3],
            'content': current_post[4],
            'author': current_post[-1],
            'created_at': current_post[-4]
        }
    else:
        post = {
            'title': '',
            'subtitle': '',
            'image_path': '',
            'content': '',
            'author': '',
            'created_at': ''
        }


    return render_template('pages/private/weekly_post.html', current_post=post)