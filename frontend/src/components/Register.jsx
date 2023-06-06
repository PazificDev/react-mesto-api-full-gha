import Header from "./Header";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = (props) => {
  const [formValue, setFormValue] = useState({
    password: '',
    email: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = formValue;
    props.onRegister(password, email);
  }

  return (
    <>
      <Header path="/sign-in" text="Войти" />

      <section className="sign">
        <h2 className="sign__title">Регистрация</h2>
        <form name="sign" onSubmit={handleSubmit} className="sign__form">
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            className="sign__input"
            placeholder="Email"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="sign-error sign__error"></span>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            className="sign__input"
            placeholder="Пароль"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="sign-error sign__error"></span>
          <button type="submit" className="sign__form-submit sign__form-submit_register">
            {props.isLoading
              ? "Регистрация.."
              : props.btnText
              ? props.btnText
              : "Зарегистрироваться"}
          </button>
        </form>
        <p className="sign__already-registered">
          Уже зарегистрированы? {<Link className="sign__link" to='/sign-in'>Войти</Link>}
        </p>
      </section>
    </>
  );
};

export default Register;
