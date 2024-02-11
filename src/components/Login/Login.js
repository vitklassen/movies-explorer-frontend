import Form from "../Form/Form";
function Login(props) {
  return (
      <Form
        title="Рады видеть!"
        buttonText="Войти"
        path="/signup"
        text="Ещё не зарегистрированы? "
        link="Регистрация"
        login={true}
        onSubmit={props.handleLogin}
        error={props.loginError}
        stateError={props.stateLoginErrorButton}
      />
  );
}
export default Login;
