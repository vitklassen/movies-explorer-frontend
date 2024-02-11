import Form from "../Form/Form";
function Register(props) {
  return (
      <Form
        title="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        path="/signin"
        text="Уже зарегистрированы? "
        link="Войти"
        register={true}
        onSubmit={props.handleRegister}
        error={props.registerError}
        stateError={props.stateRegisterErrorButton}
      />
  );
}
export default Register;
