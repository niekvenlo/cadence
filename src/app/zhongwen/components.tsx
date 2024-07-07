import type { ReactNode } from "react";
import type { Role, W } from "./dMan";
import { Children, useState, useRef } from "react";
import { getWordsByRole, getWordByChar } from "./dMan";

export const pickRandomIdx = (array) =>
  Math.floor(Math.random() * array.length);

const FullStop = ({ onDoubleClick }) => (
  <span className="full-stop one">
    <button onDoubleClick={onDoubleClick} aria-label="Refresh segment.">
      。
    </button>
  </span>
);

export const Paragraph = ({ children }: { children: ReactNode }) => (
  <>{children}</>
);

export const Sentence = ({ children }: { children: ReactNode }) => {
  const { reload, key } = useReload();
  const numChildren = Children.count(children);
  const newChildren = Children.map(children, (child, idx) => {
    const isLastChild = idx === numChildren - 1;
    if (!isLastChild) {
      return child;
    }
    return (
      <span className="fullstop-wrapper" key={key}>
        {child}
        <FullStop onDoubleClick={reload} />
      </span>
    );
  });
  return <span key={key}>{newChildren}</span>;
};

const Foncept = ({
  kanji,
  pinyin,
  onClick,
  unique,
  style,
}: {
  kanji: string;
  pinyin: string;
  onClick?: () => void;
  unique?: boolean;
  style: { color: string };
}) => {
  return (
    <div className="one">
      <span
        className={unique ? "unique chars" : "chars"}
        style={style}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
      >
        {kanji || "*"}
      </span>
      <span className="pinyin">{pinyin || "*"}</span>
    </div>
  );
};

const Concept = ({
  word,
  onClick,
  unique,
  children,
}: {
  word: W;
  onClick?: () => void;
  unique?: boolean;
  children?: ReactNode;
}) => {
  const style = useRef({
    color: `hsl(${200 + Math.floor(Math.random() * 100)}, 50%, 50%)`,
  });
  if (word?.split) {
    const [firstKanji, secondKanji] = word.split;
    const [firstPinyin, secondPinyin] = word.pinyin;
    return (
      <>
        <Foncept
          kanji={firstKanji}
          pinyin={firstPinyin}
          style={style.current}
          onClick={onClick}
          unique={unique}
        />
        {children}
        <Foncept
          kanji={secondKanji}
          pinyin={secondPinyin}
          style={style.current}
          onClick={onClick}
          unique={unique}
        />
      </>
    );
  }
  return (
    <>
      <Foncept
        kanji={word?.kanji.toString()}
        pinyin={word?.pinyin.toString()}
        style={style.current}
        onClick={onClick}
        unique={unique}
      />
      {children}
    </>
  );
};

export const C = (
  props: { [key: string]: boolean } | { children?: ReactNode }
) => {
  // get prop names, but not 'children'
  let char = Object.keys(props).toString().replace(",children", "");
  if (char == "" || char === "comma") {
    char = "，";
  }

  return (
    <Concept unique word={getWordByChar(char)}>
      {props.children}
    </Concept>
  );
};

export const X = ({
  children,
  number,
  role,
}: {
  children?: ReactNode;
  number?: boolean;
  role: Role;
}) => {
  const wordsList = getWordsByRole(role);
  const [idx, increment] = useRandomIdx();
  const safeIdx = idx % wordsList.length;
  const word = wordsList[safeIdx];
  const isSplit = role.startsWith("Split");
  const isSplitVerb = role === "SplitVerb";
  const isAdjective = ["Adjective", "LongColour", "Colour"].includes(
    role || ""
  );
  const isMultiCharKanji = word.kanji.length > 1;
  const put的Before = children && !isSplit;
  const put的After =
    (children && isSplitVerb) || (isAdjective && isMultiCharKanji);
  return (
    <>
      {number && (
        <>
          <$.Number />
          {word.measure ? <C {...{ [word.measure]: true }} /> : <C 个 />}
        </>
      )}
      <Concept unique={wordsList.length === 1} word={word} onClick={increment}>
        {put的Before && <C 的 />}
        {children}
        {put的After && <C 的 />}
      </Concept>
    </>
  );
};

const useRandomIdx = () => {
  const r = Math.floor(Math.random() * 100);
  const [idx, setIdx] = useState(r);
  const increment = () => setIdx((idx) => idx + 1);
  return [idx, increment] as [number, () => void];
};

export const $: {
  [key: string]: (props: {
    number?: boolean;
    children?: ReactNode;
  }) => JSX.Element;
} = new Proxy(
  {},
  {
    get(target, prop: Role, receiver) {
      return (props) => <X role={prop} {...props} />;
    },
  }
);

export const useReload = () => {
  const [key, setter] = useState(0);
  const reload = () => setter((v) => v + 1);
  return { reload, key };
};
