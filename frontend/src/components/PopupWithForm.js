function PopupWithForm(props) {
  
  return (
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form name={props.name} onSubmit={props.onSubmit} className="popup__form">
          <button
            type="button"
            className="popup__close"
            onClick={props.onClose}
          />
          {props.children}
          <button type="submit" className="popup__button">
            {props.isLoading ? "Сохранение.." : props.btnText ? props.btnText : "Сохранить"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
