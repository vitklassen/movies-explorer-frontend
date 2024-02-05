import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import NavTab from "../NavTab/NavTab";
import { useState } from "react";
function Header(props) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuHandler = () => {
    console.log('working');
    setMenuOpen(!isMenuOpen);
  }
const openMenu = () => {
  console.log('open');
    setMenuOpen(true);
}
const closeMenu = () => {
  console.log('close');
    setMenuOpen(false);
}
  return (
    <header className={`header ${props.color ? "header_color_green" : ""}`}>
      <Logo form={false} />
      <Navigation loggedIn={props.loggedIn} color={props.color} handler={openMenu}/>
      <NavTab isOpen={isMenuOpen} handler={closeMenu} />
    </header>
  );
}
export default Header;
