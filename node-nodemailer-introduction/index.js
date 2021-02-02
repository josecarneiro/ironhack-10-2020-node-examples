// Programatically send an email

const dotenv = require('dotenv');
dotenv.config();

const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD
  }
});

transport
  .sendMail({
    from: process.env.GMAIL_ADDRESS, // Sender
    to: process.env.GMAIL_ADDRESS, // Receiver
    subject: 'Hello World',
    // text: 'This a sample message.',
    html: `
      <html>
        <head>
          <style>
            a {
              background-color: yellow;
            }
          </style>
        </head>
        <body>
          <h1>Welcome </h1>
          <a href="https://example.com">Confirm your email address</a>
        </body>
      </html>
    `,
    // html: {
    //   path: __dirname + '/static-message.html'
    // },
    attachments: [
      {
        filename: 'message.txt',
        path: __dirname + '/test-attachment.txt'
      }
    ]
  })
  .then(result => {
    console.log('Email was sent.');
    console.log(result);
  })
  .catch(error => {
    console.log('There was an error sending email');
    console.log(error);
  });
