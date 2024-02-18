import Logo from "../Logo/Logo";
const FormContainer = ({ title, children, profileType }) => {
  return(
    <div className={`form-container ${profileType ? 'form-container_type_profile' : ''}`}>
      {!profileType && <Logo />}
      <h2 className={`form-container__title ${profileType ? 'form-container__title_type_profile' : ''}`}>{title}</h2>
      {children}
    </div>
  );
}
export default FormContainer;