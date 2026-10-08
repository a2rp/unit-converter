import { FiArrowDown, FiArrowUpRight, FiCheck, FiCompass } from "react-icons/fi";
import BackToTop from "./components/backToTop/index.jsx";
import ConversionStudio from "./components/conversionStudio/index.jsx";
import SiteFooter from "./components/siteFooter/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import styles from "./App.module.css";

const App = () => (
  <div className={styles.appShell} id="top">
    <SiteHeader />
    <main>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <p className={styles.contextLabel}><span /> Make every measurement make sense</p>
          <h1 id="hero-title">Same distance.<br /><em>Different language.</em></h1>
          <p className={styles.intro}>Move a value between the units you know and the ones you need. Clear results for everyday measurements, all in one simple workspace.</p>
          <div className={styles.heroActions}><a className={styles.primaryLink} href="#studio">Convert a value <FiArrowDown aria-hidden="true" /></a><span><FiCompass aria-hidden="true" /> Seven ways to measure</span></div>
          <div className={styles.heroFacts}><span><b>01</b> Choose a category</span><i /><span><b>02</b> Get the equivalent</span></div>
        </div>
        <div className={styles.heroArt} aria-label="Illustration of one kilometer converted into miles on a measurement ruler" role="img">
          <div className={styles.artHeader}><span>MEASURE / 001</span><span><FiCheck aria-hidden="true" /> CONVERSION READY</span></div>
          <div className={styles.measureCard}><div><span>STARTING VALUE</span><b>1 <i>km</i></b></div><div className={styles.ruler}><div className={styles.rulerTicks}>{Array.from({ length: 25 }, (_, index) => <i key={index} />)}</div><span className={styles.rulerPin} /></div><div className={styles.measureResult}><span>IN MILES</span><strong>0.621371</strong><small>mi</small></div></div>
          <div className={styles.artFooter}><span>ONE DISTANCE</span><i /><span>ANOTHER SCALE</span></div>
          <span className={styles.artStamp}>STANDARD UNITS</span>
        </div>
        <a className={styles.scrollCue} href="#studio"><span>OPEN THE CONVERTER</span><FiArrowDown aria-hidden="true" /></a>
      </section>
      <ConversionStudio />
      <section className={styles.guide} id="guide" aria-labelledby="guide-title">
        <div className={styles.guideIntro}><p className={styles.contextLabel}>A NOTE ON UNITS</p><h2 id="guide-title">Seven categories, one clear answer.</h2><p>Pick a measurement family to see the units that belong together. The converter handles scale factors and, for temperature, the offset between scales.</p></div>
        <div className={styles.guideCards}>
          <article><span>01 / PHYSICAL</span><h3>Length, mass, area, volume</h3><p>Convert everyday metric and imperial measures using standard unit relationships.</p></article>
          <article><span>02 / TEMPERATURE</span><h3>Each scale has its own zero</h3><p>Celsius, Fahrenheit, and Kelvin require both a scale adjustment and an offset.</p></article>
          <article><span>03 / DIGITAL</span><h3>Decimal and binary stay distinct</h3><p>KB, MB, and GB use powers of 1,000. KiB, MiB, and GiB use powers of 1,024.</p></article>
        </div>
        <p className={styles.privacyNote}>Values are converted in the current page; the tool does not upload or save them.</p>
        <div className={styles.guideFoot}><span>EVERY UNIT HAS ITS OWN CONTEXT</span><a href="#studio">Return to the measurement desk <FiArrowUpRight aria-hidden="true" /></a></div>
      </section>
    </main>
    <SiteFooter />
    <BackToTop />
  </div>
);

export default App;
