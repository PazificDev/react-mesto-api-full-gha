import ok from "../../src/images/Ok.svg";
import reject from "../../src/images/Reject.svg";

const InfoToolTip = (props) => {
  return (
    <section className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        />
        <img
          src={props.isSuccess ? ok : reject}
          alt={props.isSuccess ? "ok" : "reject"}
          className="popup__info-image"
        />
        <p className="popup__info-text">
          {props.isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </section>
  );
};

export default InfoToolTip;
