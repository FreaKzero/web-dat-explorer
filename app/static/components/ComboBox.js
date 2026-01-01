import { h } from "https://esm.sh/preact@latest";
import htm from "https://esm.sh/htm@3.1.1";
import { inputClass } from './tw.js';

import {
  useState,
  useEffect,
  useRef,
} from "https://esm.sh/preact@latest/hooks";

const html = htm.bind(h);

export const ComboBox = ({ label, options, value, onChange }) => {
          const [open, setOpen] = useState(false);
          const [inputValue, setInputValue] = useState("");
          const [highlightedIndex, setHighlightedIndex] = useState(-1);
          const inputRef = useRef(null);
          const listRef = useRef(null);

          const filtered = inputValue
            ? options.filter((o) =>
                o.toLowerCase().includes(inputValue.toLowerCase())
              )
            : options;

          const handleKeyDown = (e) => {
            if (!open) return;

            if (e.key === "ArrowDown") {
              e.preventDefault();
              setHighlightedIndex((prev) =>
                Math.min(prev + 1, filtered.length - 1)
              );
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setHighlightedIndex((prev) => Math.max(prev - 1, 0));
            } else if (e.key === "Enter") {
              e.preventDefault();
              if (highlightedIndex >= 0 && highlightedIndex < filtered.length) {
                onChange(filtered[highlightedIndex]);
                setInputValue(filtered[highlightedIndex]);
                setOpen(false);
              }
            } else if (e.key === "Escape") {
              e.preventDefault();
              setOpen(false);
            } else if (e.key === "Backspace") {
              e.preventDefault();
              onChange("");
              setInputValue("");
              setOpen(true);
              setHighlightedIndex(-1);
              inputRef.current.focus();
            }
          };

          useEffect(() => {
            if (highlightedIndex >= 0 && listRef.current) {
              const el = listRef.current.children[highlightedIndex];
              if (el) el.scrollIntoView({ block: "nearest" });
            }
          }, [highlightedIndex]);

          useEffect(() => {
            setInputValue(value || "");
          }, [value]);

          return html`
            <div class="relative w-60 text-left">
              <label class="block text-xs font-semibold text-gray-300 mb-1"
                >${label}</label
              >
              <div class="relative">
                <input
                  ref=${inputRef}
                  type="text"
                  value=${inputValue}
                  onFocus=${() => {
                    setOpen(true);
                    setHighlightedIndex(-1);
                  }}
                  onInput=${(e) => {
                    setInputValue(e.target.value);
                    setOpen(true);
                    setHighlightedIndex(-1);
                  }}
                  onBlur=${() => setTimeout(() => setOpen(false), 120)}
                  onKeyDown=${handleKeyDown}
                  class=${inputClass + " w-full pr-6 cursor-pointer"}
                />
                ${value &&
                html`
                  <button
                    type="button"
                    onMouseDown=${(e) => {
                      e.preventDefault();
                      onChange("");
                      setInputValue("");
                      setOpen(true);
                      setHighlightedIndex(-1);
                      inputRef.current.focus();
                    }}
                    class="absolute right-3 font-bold cursor-pointer top-[6px] text-white hover:text-orange-500 font-bold transition-all duration-300"
                  >
                    ×
                  </button>
                `}
              </div>

              ${open &&
              filtered.length > 0 &&
              html`
                <ul
                  ref=${listRef}
                  class="
          absolute z-50 mt-1 w-full
          max-h-70 overflow-auto
          rounded-md
          bg-black/50
          ring-1 ring-fuchsia-700
          backdrop-blur-md
        "
                >
                  ${filtered.map(
                    (opt, i) => html`
                      <li
                        class="px-3 py-2 text-sm cursor-pointer transition-colors
                     ${i === highlightedIndex
                          ? "bg-orange-500 text-black"
                          : "hover:bg-orange-500 hover:text-black"}"
                        onMouseDown=${() => {
                          onChange(opt);
                          setInputValue(opt);
                          setOpen(false);
                        }}
                        onMouseEnter=${() => setHighlightedIndex(i)}
                      >
                        ${opt}
                      </li>
                    `
                  )}
                </ul>
              `}
            </div>
          `;
        };