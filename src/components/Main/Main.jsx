import AboutMe from "../AboutMe/AboutMe";
import AboutProject from "../AboutProject/AboutProject";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";

function Main(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn} color={true}/>
      <main className="content">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Footer />
      </main>
    </>
  );
}
export default Main;
