import Image from "next/image";

import ask from "../../../public/ask.png";
import state from "../../../public/state.png";
import sing from "../../../public/sing.png";
import wiggle from "../../../public/wiggle.png";
import none from "../../../public/none.png";
import { getTones } from "./util";

const toneImages = {
  ask: <Image className="ask" height={20} src={ask} alt="ask-accent" />,
  state: <Image className="state" height={20} src={state} alt="state-accent" />,
  sing: <Image className="sing" height={20} src={sing} alt="sing-accent" />,
  wiggle: (
    <Image className="wiggle" height={20} src={wiggle} alt="wiggle-accent" />
  ),
  none: <Image className="none" height={20} src={none} alt="no-accent" />,
};

export const Accent = ({ type = "none" }) => toneImages[type];

export const Accents = ({ pinyin = "" }) => {
  const tones = getTones(pinyin);
  return (
    <span className="tone">
      {tones.map((tone) => (
        <Accent type={tone} />
      ))}
    </span>
  );
};
