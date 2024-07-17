import Image from "next/image";

import ask from "../../../public/ask.png";
import state from "../../../public/state.png";
import sing from "../../../public/sing.png";
import wiggle from "../../../public/wiggle.png";
import none from "../../../public/none.png";
import { getTones } from "./util";
import { ReactElement } from "react";

const toneImages = {
  ask: <Image className="ask" height={20} src={ask} alt="ask-accent" />,
  state: <Image className="state" height={20} src={state} alt="state-accent" />,
  sing: <Image className="sing" height={20} src={sing} alt="sing-accent" />,
  wiggle: (
    <Image className="wiggle" height={20} src={wiggle} alt="wiggle-accent" />
  ),
  none: <Image className="none" height={20} src={none} alt="no-accent" />,
};

type AccentProps = {
  type?: "ask" | "none" | "sing" | "state" | "wiggle";
};
export const Accent = ({ type = "none" }: AccentProps): ReactElement =>
  toneImages[type] || toneImages["none"];

export const Accents = ({ pinyin = "" }) => {
  const tones = getTones(pinyin);
  return (
    <span className="tone">
      {tones.map((tone, i) => (
        <Accent key={tone + i} type={tone} />
      ))}
    </span>
  );
};
