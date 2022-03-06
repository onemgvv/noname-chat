const mailBody = (email: string, password: string) => {
  return {
    to: email,
    from: 'noreply@magomedgasanov.ru',
    envelope: {
      from: 'Noname.fun <noreply@magomedgasanov.ru>',
      to: email,
    },
    subject: 'Успешная регистрация! || noname.fun',
    html: `
          <h3>Welcome to noname.fun, ${email}!</h3>
          <p>Your password is <b>${password}</b>.
          Change it in your account settings!</p>
          <p>Good luck!</p>
        `,
  };
};

export default mailBody;
