import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import NavTab from "../NavTab/NavTab";
import { useState } from "react";
function Header({ color, loggedIn }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const openMenu = () => {
    console.log("open");
    setMenuOpen(true);
  };
  const closeMenu = () => {
    console.log("close");
    setMenuOpen(false);
  };
  return (
    <header className={`header ${color ? "header_color_green" : ""}`}>
      <Logo form={false} />
      <Navigation loggedIn={loggedIn} color={color} handler={openMenu} />
      <NavTab isOpen={isMenuOpen} handler={closeMenu} />
    </header>
  );
}
export default Header;
