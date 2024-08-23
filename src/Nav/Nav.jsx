import { useContext, useEffect, useRef, useState } from "react";
import styles from "./Nav.module.css";
import { DotLottieReact as Lot } from "@lottiefiles/dotlottie-react";
import { Player } from "@lottiefiles/react-lottie-player";
import lightLogo from "../assets/logo.png";
import darkLogo from "../assets/logo-dark.png";
import { ThemeContext } from "../App";
import { NavLink } from "react-router-dom";

function Nav() {
  const [lottie, setLottie] = useState(null);
  const [menuOpened, setMenuOpened] = useState(false);
  const [segment, setSegment] = useState([0, 30]);
  const { theme, setTheme } = useContext(ThemeContext);
  const [logo, setLogo] = useState(lightLogo);

  const switchRefCallback = (lottie) => setLottie(lottie);
  const menuRef = useRef(null);

  const playSwitch = () => {
    if (!lottie) return;

    if (theme === "light") {
      setSegment([0, 30]);
      setTheme("dark");
    } else {
      setSegment([30, 60]);
      setTheme("light");
    }
    lottie.play();
  };

  const playMenu = () => {
    if (!menuRef.current) return;
    menuOpened
      ? menuRef.current.setPlayerDirection(-1)
      : menuRef.current.setPlayerDirection(1);
    setMenuOpened((prev) => !prev);
    menuRef.current.setPlayerSpeed(4);
    menuRef.current.play();
  };

  const updateLogo = () =>
    theme === "light" ? setLogo(lightLogo) : setLogo(darkLogo);
  useEffect(updateLogo, [theme]);

  return (
    <section className={styles.nav}>
      <section className={styles.logoBox}>
        <img src={logo} alt="Digiairx logo" />
      </section>
      <section className={styles.right}>
        <section
          className={`${menuOpened ? styles.open : styles.close} ${
            styles.links
          }`}
        >
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <button className={styles.home}>Home</button>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <button className={styles.about}>About</button>
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <button className={styles.services}>Services</button>
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <button className={styles.contact}>Contact</button>
          </NavLink>
        </section>
        <button onClick={playSwitch} className={styles.switch}>
          <Lot
            autoplay={theme === "dark"}
            segment={segment}
            speed={5}
            dotLottieRefCallback={switchRefCallback}
            src="https://raw.githubusercontent.com/asdacosta/digiAirX/main/src/assets/switch.json"
            style={{ width: "50px", height: "41px" }}
          ></Lot>
        </button>
        <button onClick={playMenu} className={styles.menu}>
          <Player
            ref={menuRef}
            keepLastFrame={true}
            src="https://raw.githubusercontent.com/asdacosta/digiAirX/main/src/assets/menu.json"
            style={{ width: "50px", height: "50px" }}
          ></Player>
        </button>
      </section>
    </section>
  );
}

export { Nav };
