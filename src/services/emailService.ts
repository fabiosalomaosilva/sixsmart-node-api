// eslint-disable-next-line @typescript-eslint/no-var-requires
const client = require('@sendgrid/mail');

class EmailService {
  async sendEmailToVerificationEmail(to: string, link: string) {
    const apiKey = process.env.SENDGRID_API_KEY;
    client.setApiKey(apiKey);

    const msg = {
      to: to,
      from: { email: 'megafacil@arquivarnet.com.br', name: 'Mega Fácil' },
      subject: 'Mega Fácil - Confirme seu e-mail',
      html: `
              <html>
              <head>
                <style type="text/css">
                  body, p, div {
                    font-family: Helvetica, Arial, sans-serif;
                    font-size: 14px;
                  }
                  a {
                    text-decoration: none;
                  }
                </style>
                <title></title>
              </head>
              <body>
              <center>
              <br>
              <br>
              <h1>Confirmação do E-mail</h1>
              <p>
                Para confirmar o seu e-mail, clique no link abaixo:
                <a href='${link}'>Verificar e-mail</a>
              </p>
              <br>
              <p>WebTrato</p>
              </center>
              </body>
            </html>
  `,
    };
    (async () => {
      try {
        await client.send(msg);
      } catch (error: any) {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    })();
  }
}

export default new EmailService();
