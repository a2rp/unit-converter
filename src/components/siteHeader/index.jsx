import { FiGithub, FiMaximize2 } from "react-icons/fi";
import styles from "./styles.module.css";

const SiteHeader = () => (
  <header className={styles.header}>
    <div className={styles.bar}>
      <a className={styles.brand} href="#top" aria-label="Unit Converter home">
        <span className={styles.brandMark}><FiMaximize2 aria-hidden="true" /></span>
        <span>Measure <b>Lab</b></span>
      </a>
      <nav className={styles.navigation} aria-label="Main navigation">
        <a href="#studio">Convert</a>
        <a href="#guide">How it works</a>
      </nav>
      <a className={styles.repository} href="https://github.com/a2rp/unit-converter" target="_blank" rel="noreferrer">
        <FiGithub aria-hidden="true" /> <span>Repository</span>
      </a>
    </div>
  </header>
);

export default SiteHeader;


