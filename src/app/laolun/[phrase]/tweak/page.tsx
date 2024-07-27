"use client";

import "./tweak-page-style.css";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  findPhraseByLabel,
  getSegmentsRarity,
  getSuggested,
  pinyin,
} from "../../phrase-util-sync";
import "../../style.css";
import { getIsChinese } from "../../util";
import { cx } from "../../../utils";
import { updateLabel, writePhrase } from "../../phrase-actions-async";
import { useRouter } from "next/navigation";
import NoSSR from "../../../components/NoSSR";

const no_text = "。";

export default function Chinese({ params }: { params: { phrase: string } }) {
  const router = useRouter();
  const { label, parts, isValidateGrammar, isFocusedLearning } =
    findPhraseByLabel(decodeURI(params.phrase));

  const changeLabel = async (newLabel: string) => {
    const finalLabel = await updateLabel(label, newLabel);
    router.replace(`/laolun/${finalLabel}/edit`);
  };
  return (
    <main id="zhongwen" className="tweak-page">
      <div id="label-edit-box">
        <input
          className="label-edit"
          type="text"
          defaultValue={label}
          onBlur={(e) => {
            if (e.target.value !== label) {
              changeLabel(e.target.value);
            }
          }}
        />
      </div>

      <PhraseEditor label={label} parts={parts} />
    </main>
  );
}

function PhraseEditor({ label, parts }) {
  const setPartInColumnByIdx = (idx, part) => {
    writePhrase({ label, parts: parts.toSpliced(idx, 1, part) });
  };
  const deleteColumnByIdx = (idx) => {
    writePhrase({ label, parts: parts.toSpliced(idx, 1) });
  };
  const addSegmentToColumnByIdx = (idx, segment) => {
    const newParts = [...parts];
    newParts[idx] = [...newParts[idx], segment];
    writePhrase({ label, parts: newParts });
  };
  const dragColumnByIdx = (idx, chunk) => {
    const newParts = [...parts];
    if (chunk % 1 === 0) {
      [newParts[idx], newParts[idx + chunk]] = [
        newParts[idx + chunk],
        newParts[idx],
      ];
    } else {
      const partToMove = newParts.splice(idx, 1)[0];
      newParts.splice(idx + Math.floor(chunk), 0, partToMove);
    }
    writePhrase({ label, parts: newParts });
  };
  return (
    <div className="editor">
      {parts.map((part, i) => (
        <Column
          key={part.join() + i}
          part={part}
          setPart={(n) => setPartInColumnByIdx(i, n)}
          deleteColumn={() => deleteColumnByIdx(i)}
          addSegmentToColumn={(segment) => addSegmentToColumnByIdx(i, segment)}
          dragColumn={(chunkMoved) => dragColumnByIdx(i, chunkMoved)}
        />
      ))}
    </div>
  );
}

const splitPartStringIntoPart = (string) =>
  string
    .split("\n")
    .filter((c) => c)
    .filter(getIsChinese)
    .map((f) => f.trim());

const Column = ({
  part,
  setPart,
  deleteColumn,
  addSegmentToColumn,
  dragColumn,
}) => {
  const isWide = Math.max(...part.map((p) => p.length)) > 3;
  const isEmpty = part.length < 1;
  return (
    <>
      <div className={cx("column-wrapper", { isWide, isEmpty })}>
        <TextArea
          value={part.join("\n")}
          onChange={(e) => setPart(splitPartStringIntoPart(e.target.value))}
          onDragGetChunk={dragColumn}
        />
        <PinyinOverlay part={part} />
        <Suggestions part={part} addSegmentToColumn={addSegmentToColumn} />

        <div className="delete-column-overlay">
          <div>
            <button onClick={deleteColumn}>Delete</button>
          </div>
        </div>
      </div>
    </>
  );
};

const PinyinOverlay = ({ part }) => (
  <div className="overlay">
    {part.map((segment) => (
      <div key={segment} className={cx("line", `offset-${segment.length}`)}>
        <span className="pinyin">{pinyin[segment]}</span>
        <RaritySpan segment={segment} />
      </div>
    ))}
  </div>
);

const RaritySpan = ({ segment }) => {
  const totalCount =
    getSegmentsRarity().find((s) => s.segment === segment)?.totalCount ?? 0;
  let emoji = "🟢";
  if (totalCount < 10) emoji = "🟣";
  if (totalCount < 6) emoji = "🟡";
  if (totalCount < 4) emoji = "🟠";
  if (totalCount < 2) emoji = "🔴";
  return (
    <span className="rarity">
      <span>{totalCount}</span>
      <span>{emoji}</span>
    </span>
  );
};

const Suggestions = ({ part, addSegmentToColumn }) => {
  const suggestions = getSuggested(part);
  if (suggestions.length < 1) {
    return null;
  }
  return (
    <NoSSR>
      <div className="suggestions">
        <p>Quick add</p>
        <div>
          {suggestions.map((s) => (
            <button key={s} onClick={() => addSegmentToColumn(s)}>
              {s}
            </button>
          ))}
        </div>
      </div>
    </NoSSR>
  );
};

const TextArea = ({
  value,
  className = "",
  onChange,
  onPaste = (e: Event) => {},
  onDragGetChunk = (e: number) => {},
}) => {
  // draggable
  const [isDraggable, setIsDraggable] = useState(false);

  // We don't want onChange to trigger while we are in composition mode.
  const preventOnChange = useRef(false);
  // We want to call handlePaste once the value has been updated.
  const justPasted = useRef(false);
  const dragStartX = useRef<number | null>(null);
  const draggableTimer = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e) => {
    if (justPasted.current === true) {
      justPasted.current = false;
      handlePaste(e);
    }
    if (preventOnChange.current === true) {
      return;
    }
    onChange(e);
  };
  const handlePaste = (e) => {
    onPaste(e);
  };
  const handleDoubleClick = () => {
    setIsDraggable(true);
    draggableTimer.current = setTimeout(() => setIsDraggable(false), 1000);
  };
  return (
    <textarea
      draggable={isDraggable}
      className={className}
      defaultValue={value}
      onCompositionStart={() => (preventOnChange.current = true)}
      onCompositionEnd={() => (preventOnChange.current = false)}
      onPaste={() => (justPasted.current = true)}
      onChange={handleChange}
      onDragStart={(c) => {
        dragStartX.current = c.screenX;
        if (draggableTimer.current) {
          clearTimeout(draggableTimer.current);
        }
      }}
      onDragEnd={(c) => {
        const xMovement = c.screenX - dragStartX.current!;
        dragStartX.current = null;
        const xMovementInChunks = Math.round(xMovement / 80) / 2;
        onDragGetChunk(xMovementInChunks);
        setIsDraggable(false);
      }}
      onDoubleClick={handleDoubleClick}
    />
  );
};
