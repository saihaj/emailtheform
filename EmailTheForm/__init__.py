import logging
import json
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import azure.functions as func


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    try:
        req_body = req.get_json()
        name = req_body['name']
        to_email = req_body['to_email']
        from_email = req_body['from_email']
        phone = req_body['phone']
        message = req_body['message']
        subject = req_body['subject']
    except KeyError as err:
        logging.error(f'HTTP request is missing param: {err}')
        return func.HttpResponse(f'HTTP request is missing param: {err}', status_code=400)
    except ValueError as err:
        logging.error(f"{err}")
        return func.HttpResponse(f"{err}", status_code=400)


    if '' not in (name, to_email,from_email, phone, message, subject):
        logging.info("Initating SendGrid for email")
        message = Mail(
            from_email=from_email,
            to_emails=to_email,
            subject=subject,
            html_content=f'\
               <p><span style="color: #0000ff;">Message from: {name}</span><br>\
                <span style="color: #0000ff;">Phone: {phone}</span><br>\
                <span style="color: #0000ff;">Begin message:</span>\
                <p>{message}</p>')
        try:
            sg = SendGridAPIClient(os.environ["SENDGRID_API_KEY"])
            response = sg.send(message)
            logging.info(response.status_code)
            logging.info(response.headers)
        except Exception as err:
            logging.error(f"{err}")
            return func.HttpResponse(f"Unable to send your message: {err}", status_code=400)

        return func.HttpResponse("Message sent")
    else:
        return func.HttpResponse("HTTP request was given empty param value", status_code=400)

    



