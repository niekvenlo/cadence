import { getPinyin } from "./phrase-util-sync";
import { breakPinyinIntoSylables, getTones } from "./util";

class PopupInfo extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "closed" });
    const kanji = this.getAttribute("is") || "";
    const p = getPinyin(kanji);
    const pinyin = breakPinyinIntoSylables(p);
    const tones = getTones(p);
    const chars = kanji.split("").map(
      (c, i) => `
        <span class="char">
          <span class="pinyin">
            ${pinyin[i]}
          </span>
          <span class="tone ${tones[i]}"></span>
          <span class="kanji">
            ${c}
          </span>
        </span>`
    );

    const template = document.createElement("template");

    template.innerHTML = `
      <style>
        :host {
          position: relative;
          display: contents;
          color: ${`hsl(${230 + Math.random() * 50}, 60%, 60%)`};
          .char {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            .pinyin {
              font-size: 0.4em;
              user-select: none;
              pointer-events: none;
            }
            .tone {
              height: 0.5lh;
              width: 0.5lh;
              background-size: cover;
              user-select: none;
              pointer-events: none;
              &.ask {
                background-image: url("../../../ask.png");
              }
              &.wiggle {
                background-image: url("../../../wiggle.png");
              }
              &.state {
                background-image: url("../../../state.png");
              }
              &.sing {
                background-image: url("../../../sing.png");
              }
              &.none {
                background-image: url("../../../none.png");
              }
            }
            .kanji {
              font-size: 1em
            }
          }
        }
      </style>
      ${chars.join("")}
    `;
    shadow.appendChild(template.content.cloneNode(true));
  }
  attributeChangedCallback() {}
}

try {
  customElements.define("chinese-phrase", PopupInfo);
} catch {}
