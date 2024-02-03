import React from "react";
import { Link } from "react-router-dom";

const Register = ({ onRegister }) => {
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
    onRegister(email, password);
  };

  return (
    <section className="auth" onSubmit={handleSubmit}>
      <h2 className="auth__title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="auth__form" name="register">
        <input
          id="email"
          name="email"
          type="email"
          value={userInfo.email}
          onChange={handleChange}
          className="auth__input"
          placeholder="Почта"
          required
        />

        <input
          id="password"
          name="password"
          type="password"
          value={userInfo.password}
          onChange={handleChange}
          className="auth__input"
          placeholder="Пароль"
          required
        />

        <button type="submit" className="auth__submit">
          Зарегистрироваться
        </button>

        <Link to="/sign-in" className="auth__link">
          Уже зарегестрированны? Войти
        </Link>
      </form>
    </section>
  );
};

export default Register;
