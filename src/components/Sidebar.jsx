import { Link, Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Link to="/">
        <h1 className="navLogo">World Mapper</h1>
      </Link>
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by Arpit Inc.
        </p>
      </footer>
    </div>
  );
};

export default Sidebar;
