import Logo from "../Logo/Logo";
import SelectUser from "../SelectUser/SelectUser";
import "./Header.css";
const logos = ["/logo.svg"];
const Header = () => {
  return (
    <>
      <Logo image={logos[0]}></Logo>
      <SelectUser></SelectUser>
    </>
  );
};

export default Header;
