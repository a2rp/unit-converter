import { useState } from "react";
import { FiCheck, FiClock, FiCopy, FiDroplet, FiHardDrive, FiMap, FiMaximize2, FiPackage, FiRepeat, FiThermometer } from "react-icons/fi";
import { convertUnits, unitCategories } from "../../utils/conversions.js";
import styles from "./styles.module.css";

const categoryIcons = { length: FiMaximize2, mass: FiPackage, temperature: FiThermometer, area: FiMap, volume: FiDroplet, time: FiClock, data: FiHardDrive };
const numberFormat = new Intl.NumberFormat("en-US", { maximumSignificantDigits: 11 });
const formatNumber = (value) => (Object.is(value, -0) || value === 0 ? "0" : numberFormat.format(value));

const ConversionStudio = () => {
  const [categoryId, setCategoryId] = useState("length");
  const [amount, setAmount] = useState("1");
  const [sourceId, setSourceId] = useState("km");
  const [targetId, setTargetId] = useState("mi");
  const [copyMessage, setCopyMessage] = useState("");
  const category = unitCategories[categoryId];
  const source = category.units.find((unit) => unit.id === sourceId);
  const target = category.units.find((unit) => unit.id === targetId);
  const value = amount.trim() === "" ? null : Number(amount);
  const converted = value !== null && Number.isFinite(value) ? convertUnits(value, categoryId, sourceId, targetId) : null;

  const changeCategory = (nextCategoryId) => {
    const nextUnits = unitCategories[nextCategoryId].units;
    setCategoryId(nextCategoryId);
    setSourceId(nextUnits[0].id);
    setTargetId(nextUnits[1].id);
    setCopyMessage("");
  };

  const reverseUnits = () => {
    if (converted) setAmount(String(converted.value));
    setSourceId(targetId);
    setTargetId(sourceId);
    setCopyMessage("");
  };

  const copyValue = async () => {
    if (!converted) return;
    try {
      await navigator.clipboard.writeText(formatNumber(converted.value));
      setCopyMessage("Result copied to clipboard.");
    } catch {
      setCopyMessage("Clipboard access is unavailable. Select the result to copy it.");
    }
  };

  return (
    <section className={styles.studio} id="studio" aria-labelledby="studio-title">
      <div className={styles.studioHeader}><div><p>THE CONVERSION DESK / LIVE RESULT</p><h2 id="studio-title">One number, another scale.</h2><span>Choose what you are measuring, then adjust either side.</span></div><span className={styles.liveBadge}><i /> LIVE CONVERSION</span></div>
      <div className={styles.categoryTabs} role="group" aria-label="Measurement category">
        {Object.entries(unitCategories).map(([id, item]) => { const Icon = categoryIcons[id]; return <button className={categoryId === id ? styles.activeCategory : ""} key={id} type="button" aria-pressed={categoryId === id} onClick={() => changeCategory(id)}><Icon aria-hidden="true" /><span>{item.label}</span></button>; })}
      </div>
      <div className={styles.converter}>
        <div className={styles.inputSide}>
          <label htmlFor="source-amount">From</label>
          <input id="source-amount" type="number" step="any" inputMode="decimal" value={amount} onChange={(event) => { setAmount(event.target.value); setCopyMessage(""); }} aria-label="Value to convert" />
          <label className={styles.selectLabel} htmlFor="source-unit">Starting unit</label>
          <select id="source-unit" value={sourceId} onChange={(event) => { setSourceId(event.target.value); setCopyMessage(""); }}>
            {category.units.map((unit) => <option key={unit.id} value={unit.id}>{unit.label} ({unit.symbol})</option>)}
          </select>
        </div>
        <button className={styles.swapButton} type="button" onClick={reverseUnits} aria-label="Swap units"><FiRepeat aria-hidden="true" /><span>SWAP</span></button>
        <div className={styles.outputSide}>
          <div className={styles.outputLabel}><label htmlFor="target-unit">To</label><span><FiCheck aria-hidden="true" /> PRECISE CONVERSION</span></div>
          <output className={styles.result} htmlFor="source-amount target-unit" aria-live="polite">{converted ? formatNumber(converted.value) : "-"}</output>
          <label className={styles.selectLabel} htmlFor="target-unit">Result unit</label>
          <select id="target-unit" value={targetId} onChange={(event) => { setTargetId(event.target.value); setCopyMessage(""); }}>
            {category.units.map((unit) => <option key={unit.id} value={unit.id}>{unit.label} ({unit.symbol})</option>)}
          </select>
        </div>
      </div>
      <div className={styles.resultBar}>
        <div className={styles.equation}>{converted ? <><span>{formatNumber(value)} {source.symbol}</span><FiRepeat aria-hidden="true" /><strong>{formatNumber(converted.value)} {target.symbol}</strong></> : <span>Enter a finite number to see the conversion.</span>}</div>
        <button type="button" onClick={copyValue} disabled={!converted}><FiCopy aria-hidden="true" /> {copyMessage.startsWith("Result copied") ? "Copied" : "Copy result"}</button>
      </div>
      {copyMessage && <p className={styles.copyMessage} role="status">{copyMessage}</p>}
      <p className={styles.methodNote}><FiCheck aria-hidden="true" /> {categoryId === "data" ? "Decimal (KB, MB, GB) and binary (KiB, MiB, GiB) storage units are labeled separately." : categoryId === "temperature" ? "Temperature conversion accounts for each scale's zero point as well as its step size." : "Live conversion using standard unit relationships. Results display up to 11 significant digits."}</p>
    </section>
  );
};

export default ConversionStudio;
