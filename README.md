# Email The Form

[![CodeFactor](https://www.codefactor.io/repository/github/saihaj/emailtheform/badge)](https://www.codefactor.io/repository/github/saihaj/emailtheform) &nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://raw.githubusercontent.com/Azure/azure-functions-cli/master/src/Azure.Functions.Cli/npm/assets/azure-functions-logo-color-raster.png" width="30">


An Azure Function that allows you to power a "Contact Form" or a "Feedback Form" on your website or app. You will get the repsonses in your email and you can just reply-back to the user instantly.

Currently, this I am using SendGrid as an relay for sending emails. Their free-tier [plan](https://sendgrid.com/pricing/?extProvId=5&extPu=49397-gaw&extLi=115523142&sem_adg=8368110342&extCr=8368110342-299384208929&extSi=&extTg=&keyword=%2Bsendgrid&extAP=&extMT=b&utm_medium=cpc&utm_source=google&gclid=Cj0KCQjw17n1BRDEARIsAFDHFezNbYtAb-etnqbUbGuXjC6_nu5MDa_V_3t_r6AZP75wbn_tck6exJgaAq0dEALw_wcB) is really good. But if you want to use your email account, I would suggest using python's [`smtplib`](https://docs.python.org/3/library/email.examples.html), it should be really easy to setup.


I will try to make same thing for AWS Lambda and without SendGrid.

## Required Values

* `name` User inputted name from your contact form
* `from_email` User inputted email from your contact form
* `to_email` Email you want to deliver the responses to
* `phone` User inputted phone number from your contact form
* `subject` Subject you want to set for your responses email

You can check a sample request [`request.http`](request.http) 


## Development 

* Install the recommended extensions from [`extensions.json`](.vscode/extensions.json). You can also use [microsoft docs](https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-function-vs-code?pivots=programming-language-python) and install all the prequisites.
* VS Code should tell you to create a virtual env. You can also run this `python3 -m venv .venv` to create `.venv` in root directory of this project
* Create a `local.settings.json` file in root directory of this project and add your Sendgrid API key. Fill in required fields the [`local.settings.json.example`](local.settings.json.example)
* Start debugging or F5 and you should have this running on http://localhost:7071/api/EmailTheForm
* To test use the [`request.http`](request.http) and modify the values or check [Demo](#demo) section
  
## Demo

Once you have the development environnement running. You can test a contact form running locally with a provided create-react-app in `example` directory made using react-bootstrap. Checkout [react app template](https://github.com/saihaj/saihaj-create-react-app) for more commands.

* Open a new terminal window
  ```
  cd example
  ```
* Install all the dependencies
  ```
  npm install
  ```
* Need to change `to_email` field in [`ContactForm.js`](example/src/ContactForm.js#L52) and use your email to try this out.
* Run the app
  ```
  npm start
  ```
* You should have this running on http://localhost:3000

NOTE: Make sure that the function is running on http://localhost:7071/api/EmailTheForm


## Production Deployment

* Follow the steps given in [Azure Docs](https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-function-vs-code?pivots=programming-language-python#sign-in-to-azure) to deploy your function from VS Code.
* Now you need to give your Sendgrid API key to deployed Azure Function to run. Go to `Configuration` of azure function (use [Azure Docs](https://docs.microsoft.com/en-us/azure/azure-functions/functions-how-to-use-azure-function-app-settings) to find this) and add a new application setting:
  *  name: `SENDGRID_API_KEY`
  *  value: `YOUR_SENDGRID_API_KEY`
* Check out Azure Docs to enable [CORS](https://docs.microsoft.com/en-us/azure/azure-functions/functions-how-to-use-azure-function-app-settings#cors) and allow your application to use this service.
  