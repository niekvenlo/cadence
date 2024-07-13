import { getPinyinSylables, getRandomElement, getTones } from "./util";
import { useRef, useState } from "react";
import { pinyin as pinyinJson } from "./phrase-util-sync";
import { Accent, Accents } from "./Accents";
import PersonaModal from "./PersonaModal";

function Part({ part }) {
  const [isSelected, setIsSelected] = useState(false);
  const style = useRef({
    color: `hsl(${230 + Math.random() * 50}, 60%, 60%)`,
  });
  const kanji = useRef(getRandomElement(part));
  const pinyin = getPinyinSylables(pinyinJson[kanji.current] || "");
  const tones = getTones(pinyinJson[kanji.current] || "");
  const chars = kanji.current
    .split("")
    .map((char, i) => [char, pinyin[i], tones[i]]);
  const alternativeKanji = part.filter((c) => c !== kanji);

  return (
    <>
      <button
        className="part"
        style={style.current}
        onDoubleClick={() => setIsSelected((t) => !t)}
      >
        {chars.map(([char, pinyin, tone], i) => (
          <span className="char" tabIndex={1} key={char + i}>
            <span className="pinyin">{pinyin}</span>
            <span className="tone">{<Accent type={tone} />}</span>
            <span className="kanji">{char}</span>
          </span>
        ))}
      </button>
      {isSelected && (
        <PersonaModal
          isOpen
          closeOnBackdropClick
          className="selected"
          requestClose={() => setIsSelected(false)}
          onClick={() => setIsSelected(false)}
        >
          <p className="alternative">
            {alternativeKanji.map((a) => (
              <span key={a}>{a}</span>
            ))}
          </p>
          <Accents pinyin={pinyinJson[kanji.current]} />
          <h2>{kanji.current}</h2>
          <p>{pinyinJson[kanji.current]?.replace(/-/g, " ")}</p>
        </PersonaModal>
      )}
    </>
  );
}

export default Part;
