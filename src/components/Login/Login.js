import Form from "../Form/Form";
function Login() {
  return (
      <Form
        title="Рады видеть!"
        buttonText="Войти"
        path="/signup"
        text="Ещё не зарегистрированы? "
        link="Регистрация"
        login={true}
      />
  );
}
export default Login;
