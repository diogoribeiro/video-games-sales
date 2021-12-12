import React from "react";
import ReactSlider from "react-slider";
import { Period } from "../../types";

import styles from "./Slider.module.css";

type Props = {
  onChange: (newPeriod: number[]) => void;
  period: Period;
  selectedPeriod: Period;
};

const Slider: React.FC<Props> = ({ period, onChange, selectedPeriod }) => (
  <ReactSlider
    className={styles["horizontal-slider"]}
    defaultValue={[period.begin, period.end]}
    min={period.begin}
    max={period.end}
    markClassName={styles["mark"]}
    step={5}
    onChange={onChange}
    value={[selectedPeriod.begin, selectedPeriod.end]}
    thumbClassName={styles["thumb"]}
    trackClassName={styles["track"]}
    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
  />
);

export default Slider;
