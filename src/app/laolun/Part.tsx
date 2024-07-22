import { breakPinyinIntoSylables, getRandomElement, getTones } from "./util";
import { useRef, useState } from "react";
import { pinyin as pinyinJson, getPinyin } from "./phrase-util-sync";
import { Accent, Accents } from "./Accents";
import PersonaModal from "./PersonaModal";
import { writePhrase } from "./phrase-actions-async";
import { cx } from "../utils";

function Part({ label, part, isFocusedLearning, isValidateGrammar }) {
  const [isSelected, setIsSelected] = useState(false);
  const style = useRef({
    color: `hsl(${230 + Math.random() * 50}, 60%, 60%)`,
  });
  const kanji = useRef(getRandomElement(part));
  const p = getPinyin(kanji.current) || "";
  const pinyin = breakPinyinIntoSylables(p);
  const tones = getTones(p);
  const chars = kanji.current
    .split("")
    .map((char, i) => [char, pinyin[i], tones[i]]);
  const alternativeKanji = part.filter((c) => c !== kanji);

  const toggleFocus = () =>
    writePhrase({ label, isFocusedLearning: !isFocusedLearning });
  const toggleGrammar = () =>
    writePhrase({ label, isValidateGrammar: !isValidateGrammar });

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
        >
          <p className="alternative">
            {alternativeKanji.map((a) => (
              <span key={a}>{a}</span>
            ))}
          </p>
          <Accents pinyin={pinyinJson[kanji.current]} />
          <h2>{kanji.current}</h2>
          <p>{pinyinJson[kanji.current]?.replace(/-/g, " ")}</p>
          <div className="buttons">
            <button
              className={cx({ on: isFocusedLearning })}
              onClick={toggleFocus}
            >
              <span>📌</span> focus
            </button>
            <button
              className={cx({ on: isValidateGrammar })}
              onClick={toggleGrammar}
            >
              <span>🧙‍♀️</span> grammar
            </button>
            <a href={`/laolun/${label}/edit`}>
              <span>✏️</span>Go to edit page
            </a>
          </div>
        </PersonaModal>
      )}
    </>
  );
}

export default Part;
