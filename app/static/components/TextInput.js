import { h } from "https://esm.sh/preact@latest";
import htm from "https://esm.sh/htm@3.1.1";
import { inputClass } from './tw.js';

import {
  useState,
  useEffect,
  useRef,
} from "https://esm.sh/preact@latest/hooks";

const html = htm.bind(h);

export const TextInput = ({
  label,
  value,
  onInput,
  placeholder,
  type = "text",
  className = "",
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const inputRef = useRef(null);

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleClear = (e) => {
    e.preventDefault();
    setInputValue("");
    if (onInput) onInput({ target: { value: "" } }); // wie echtes input event
    inputRef.current.focus();
  };

  return html`
    <div class="relative w-64 text-left">
      ${label &&
      html`<label class="block text-xs font-semibold text-gray-300 mb-1"
        >${label}</label
      >`}
      <div class="relative">
        <input
          ref=${inputRef}
          type=${type}
          value=${inputValue}
          placeholder=${placeholder || ""}
          onInput=${(e) => {
            setInputValue(e.target.value);
            if (onInput) onInput(e);
          }}
          class=${inputClass + " w-full pr-6 " + className}
        />
        ${inputValue &&
        html`
          <button
            type="button"
            onMouseDown=${handleClear}
            class="absolute right-3 top-[6px] text-white hover:text-orange-500 font-bold transition-all duration-300 cursor-pointer"
          >
            ×
          </button>
        `}
      </div>
    </div>
  `;
};
