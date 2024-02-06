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
    <section className="auth">
      <h2 className="authtitle">Регистрация</h2>
      <form onSubmit={handleSubmit} className="authform" name="register">
        <input
          id="email"
          name="email"
          type="email"
          value={userInfo.email}
          onChange={handleChange}
          className="authinput"
          placeholder="Почта"
          required
        />

        <input
          id="password"
          name="password"
          type="password"
          value={userInfo.password}
          onChange={handleChange}
          className="authinput"
          placeholder="Пароль"
          required
        />

        <button type="submit" className="authsubmit">
          Зарегистрироваться
        </button>

        <Link to="/sign-in" className="authlink">
          Уже зарегестрированны? Войти
        </Link>
      </form>
    </section>
  );
};

export default Register;
