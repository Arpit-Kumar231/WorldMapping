import { Link, NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";

const PageNav = () => {
  return (
    <div className={styles.nav}>
      <Link to="/">
        <h1 className="navLogo">World Mapper</h1>
      </Link>
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/Product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default PageNav;
