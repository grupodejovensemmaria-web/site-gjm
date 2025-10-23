import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

EMAIL_ADDRESS = "techttracksolucoes@gmail.com"
APP_PASSWORD = "nhuh pctp kijc pjew"

def enviar_email(destinatario = "", assunto = "Assunto Padrão", corpo = "<p>Corpo do e-mail padrão</p>"):
    destinatario = destinatario
    assunto = assunto
    corpo = corpo

    msg = MIMEMultipart()
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = destinatario
    msg['Subject'] = assunto

    msg.attach(MIMEText(corpo, "html"))

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(EMAIL_ADDRESS, APP_PASSWORD)
            smtp.send_message(msg)
        return "Email enviado com sucesso!"
    except Exception as e:
        return f"Erro ao enviar e-mail: {str(e)}"

