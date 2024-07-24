"use client";

export default function SpecialCheckbox() {
  const updateFont = ({ largeFont = false, serifFont = false }) => {
    const wrapper = document.getElementById("zhongwen");
    if (serifFont) {
      wrapper?.classList.toggle("chinese-serif-font");
    }
    if (largeFont) {
      wrapper?.classList.toggle("large-font");
    }
  };
  return (
    <>
      <label>
        <input
          type="checkbox"
          id="font-size"
          onChange={() => updateFont({ largeFont: true })}
        />
        Font size
      </label>
      <label>
        <input
          type="checkbox"
          onChange={() => updateFont({ serifFont: true })}
        />
        Serif font
      </label>
    </>
  );
}
