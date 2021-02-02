// This is pseudocode
// and a hypothetical example

// You could run this periodically with
// node-cron or with a CRON job in the cloud platform

User.find()
  .then(users => {
    return Promise.all(
      users.map(user => {
        return transporter.sendMail({
          // ...
        });
      })
    );
  })
  .then(() => {
    console.log('All emails have been sent.');
  });
