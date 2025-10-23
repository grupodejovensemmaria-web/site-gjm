from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, validators, DateField
from wtforms.validators import DataRequired, Email, EqualTo
from app import app
from flask import render_template
from config import secret_key

app.secret_key = secret_key

class RegistrationForm(FlaskForm):
    username = StringField('Usuário', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Senha', validators=[DataRequired()])
    confirm = PasswordField('Confirmar Senha', validators=[
        DataRequired(), 
        EqualTo('password', message='Senhas devem ser iguais')
    ])
    nome_completo = StringField('Nome Completo', validators=[DataRequired()])
    telefone = StringField('Telefone', validators=[DataRequired()])
    instagram = StringField('Instagram')
    contato_emergencia = StringField('Contato de Emergência', validators=[DataRequired()])
    data_nascimento = DateField('Data de Nascimento', format='%Y-%m-%d', validators=[DataRequired()])
    endereco = StringField('Endereço')
class RecoveryForm(FlaskForm):
    email_or_username = StringField('Email ou Usuário', [
        validators.DataRequired(message="Preencha este campo"),
        validators.Length(min=4, max=50)
    ])
    motivo = StringField('Motivo de recuperacao')

@app.route('/register', methods=['GET', 'POST'])
def register():

    from utils import criar_usuario, enviar_email

    form = RegistrationForm()
    if form.validate_on_submit():
        new_user = {
            'username': form.username.data,
            'email': form.email.data,
            'password': form.password.data,
            'status': 'pending'
        }
        criar_usuario(
            username=form.username.data,
            email=form.email.data,
            senha=form.password.data,
            nome_completo=form.nome_completo.data,
            telefone=form.telefone.data,
            instagram=form.instagram.data,
            contato_emergencia=form.contato_emergencia.data,
            data_nascimento=form.data_nascimento.data.strftime('%Y-%m-%d'),
            endereco=form.endereco.data
        )
        destino = form.email.data
        assunto = 'Confirmação de Cadastro'
        mensagem = f'''

<p>Olá {form.nome_completo.data},</p>

<p>Estamos entrando em contato para informar que sua conta está disponível na plataforma do GJ:</p>

<p>- Website: https://gj-guadalupe.onrender.com</p>

<p>- Usuário: {form.username.data}</p>

<p>( a senha é a mesma criada no ato do cadastro  )</p>

<p>- Instagram: https://www.instagram.com/gj.nsguadalupe/ </p>

<p>Ou simplesmente responda esse e-mail.</p>

<p>Estamos gratos pela sua atenção e solicitação. Esperamos que nossa jornada juntos seja positiva e adorável!</p>

-----
</br>
<small>Atenciosamente, equipe <strong>TT SOLUÇÕES</strong></small>
</br>
<small>Transformação técnico-digital para empresas que ainda fazem milagre com planilha.</small>
</br>
<img src="https://lh3.googleusercontent.com/d/1W1llr4gNibdJwsGX11dj2jspIt633yWX" width="96" height="96" alt="Logo TT Soluções">
        '''
        enviar_email(destino, assunto, mensagem)
        return render_template('pages/public/conta_criada.html', novos=new_user)
    return render_template('pages/public/criar_conta.html', form=form)

@app.route('/recovery', methods=['GET', 'POST'])
def recovery():
    
    from utils import recuperar_acesso_public

    form = RecoveryForm()
    if form.validate_on_submit():
        new_user = {
            'conta': form.email_or_username.data,
            'password': form.motivo.data,
            'status': 'pending'
        }
        recuperar_acesso_public(form.email_or_username.data, form.motivo.data)
        return render_template('pages/public/conta_recuperada.html', novos=new_user)
    return render_template('pages/public/recuperar_conta.html', form=form)
