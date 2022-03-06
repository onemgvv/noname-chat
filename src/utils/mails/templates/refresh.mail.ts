const mailBody = (email: string, refreshCode: number) => {
  return {
    to: email,
    from: 'noreply@magomedgasanov.ru',
    envelope: {
      from: 'Noname.fun <noreply@magomedgasanov.ru>',
      to: email,
    },
    subject: 'Восстановление пароля! || noname.chat',
    html: `
    <h3>Восстановление пароля</h3>
    <p>Вы недавно запросили восстановление пароля</p>
    <p>Ваш код восстановления: <b>${refreshCode}</b></p>

    <p>Если это были не вы проигнорируйте сообщение.</p>
  `,
  };
};

export default mailBody;
