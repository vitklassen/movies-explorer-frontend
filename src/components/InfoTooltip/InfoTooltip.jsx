import imagePath from '../../images/InfoTooltip/popup__succes.svg'
const InfoTooltip = ({isOpen, onClose}) => {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__container popup__container_type_info`}>
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="popup__image"
          src={imagePath}
          alt="Изображение"
        />
        <h2 className={`popup__title popup__title_type_info`}>
          Вы успешно изменили данные!
        </h2>
      </div>
    </div>
  );
};
export default InfoTooltip;
