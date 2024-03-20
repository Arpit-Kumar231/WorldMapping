import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          Travel the world.
          <br />
          Add the cities to the World Mapper
        </h1>
        <h2>
          A World Mapper to visit all the cities you want with just a single
          click and enjoy it with anyone that you want
        </h2>
        <Link to="/app" className="cta">
          Navigation Starts Here
        </Link>
      </section>
    </main>
  );
}
