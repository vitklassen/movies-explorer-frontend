import Form from "../Form/Form";
function Register(props) {
  return (
    <Form
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      path="/signin"
      text="Уже зарегистрированы? "
      link="Войти"
      children={
        <label className="formcontainer__label">
          <span className="formcontainer__span">Имя</span>
          <input
            className="formcontainer__input"
            name="name"
            required
            id="name"
            value={props.name}
            onChange={props.onChange}
          ></input>
        </label>
      }
    />
  );
}
export default Register;
