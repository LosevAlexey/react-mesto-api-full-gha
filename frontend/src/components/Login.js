import React from "react";

const Login = ({ onLogin }) => {
  const [userInfo, setUserInfo] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // здесь обработчик регистрации
    const { email, password } = userInfo;
    onLogin(email, password);
  };

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <form onSubmit={handleSubmit} className="auth__form" name="login">
        <input
          id="email"
          name="email"
          type="email"
          value={userInfo.email || ""}
          onChange={handleChange}
          className="auth__input"
          placeholder="Почта"
          required
        />

        <input
          id="password"
          name="password"
          type="password"
          value={userInfo.password || ""}
          onChange={handleChange}
          className="auth__input"
          placeholder="Пароль"
          required
        />

        <button type="submit" className="auth__submit">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
