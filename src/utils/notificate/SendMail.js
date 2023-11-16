import emailjs from '@emailjs/browser';

const SendEmail = (to_name, to_email, message) => {
   let templateParams = {
      to_name,
      to_email,
      message,
   }

   const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
   const templateID = process.env.REACT_APP_EMAILJS_REMINDER_TEMPLATE_ID;
   const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;


   emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then(function (response) {
         console.log('SUCCESS!', response.status, response.text);
      }, function (error) {
         console.log('FAILED...', error);
      });
}

export default SendEmail;