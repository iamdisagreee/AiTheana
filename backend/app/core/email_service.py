import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from app.config import get_settings

settings = get_settings()


def send_email(
    to_email: str,
    header: str,
    body: str,
):
    """
    Отправка письма по электронной почте с использованием SMTP-сервера
    :param to_email: почта адресата
    :param header: заголовок письма
    :param body: текст письма
    :return:
    """

    msg = MIMEMultipart()
    msg["From"] = settings.mail_user
    msg["To"] = to_email
    msg["Subject"] = header
    msg.attach(MIMEText(body, "plain"))

    with smtplib.SMTP(
        settings.smtp_server, settings.smtp_port, timeout=10
    ) as server:
        server.starttls()
        server.login(settings.mail_user, settings.mail_password)
        server.sendmail(
            settings.mail_user, to_email, msg.as_string()
        )  # Отправляем письмо
