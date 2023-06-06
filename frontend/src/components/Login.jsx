import Header from "./Header";

const Login = (props) => {

  return (
    <>
      <Header path="/sign-up" text="Регистрация" />

      <section className="sign">
        <h2 className="sign__title">Вход</h2>
        <form name="sign" onSubmit={props.onLogin} className="sign__form">
          <input
            type="email"
            id="email"
            name="email"
            onChange={props.onChange}
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
            onChange={props.onChange}
            className="sign__input"
            placeholder="Пароль"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="sign-error sign__error"></span>
          <button type="submit" className="sign__form-submit">
            {props.isLoading
              ? "Вход.."
              : props.btnText
              ? props.btnText
              : "Войти"}
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;
