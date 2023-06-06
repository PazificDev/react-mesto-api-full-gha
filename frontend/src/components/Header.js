import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__info">
        {props.loggedIn && <p className="header__email">{props.email}</p>}
        {props.loggedIn ? (
          <button className="header__link" onClick={props.onSignOut}>
            Выйти
          </button>
        ) : (
          <Link to={props.path} className="header__link">
            {props.text}
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
