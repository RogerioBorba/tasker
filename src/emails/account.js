const sgMail = require('@sendgrid/mail')
const key = process.env.SEND_GRID_API_KEY
sgMail.setApiKey(key)
const sendEmailWelcome = (name, anEmail) => {
    const email = {
      to: anEmail,
      from: 'rogerio.borba17@gmail.com',
      subject: 'Thanks to join us.',
      text: `Welcome to the app ${name}`
      //html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail.send(email)    
}
const sendEmailCancelation = (name, anEmail) => {
    const email = {
      to: anEmail,
      from: 'rogerio.borba17@gmail.com',
      subject: 'We are sorry to you leave us.',
      text: `We hope to see ${name} in the near future`
      //html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail.send(email)    
}
module.exports = {sendEmailWelcome, sendEmailCancelation}


