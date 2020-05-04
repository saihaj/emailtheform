# Email The Form

<img src="https://raw.githubusercontent.com/Azure/azure-functions-cli/master/src/Azure.Functions.Cli/npm/assets/azure-functions-logo-color-raster.png" width="40">

An Azure Function that allows you to power a "Contact Form" or a "Feedback Form" on your website or app. You will get the repsonses in your email and you can just reply-back to the user instantly.

Currently, this I am using SendGrid as an relay for sending emails. Their free-tier [plan](https://sendgrid.com/pricing/?extProvId=5&extPu=49397-gaw&extLi=115523142&sem_adg=8368110342&extCr=8368110342-299384208929&extSi=&extTg=&keyword=%2Bsendgrid&extAP=&extMT=b&utm_medium=cpc&utm_source=google&gclid=Cj0KCQjw17n1BRDEARIsAFDHFezNbYtAb-etnqbUbGuXjC6_nu5MDa_V_3t_r6AZP75wbn_tck6exJgaAq0dEALw_wcB) is really good. But if you want to use your email account, I would suggest using python's [`smtplib`](https://docs.python.org/3/library/email.examples.html), it should be really easy to setup.


I will try to make same thing for AWS Lambda and without SendGrid.