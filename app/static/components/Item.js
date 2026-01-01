import { h } from "https://esm.sh/preact@latest";
import htm from "https://esm.sh/htm@3.1.1";

const html = htm.bind(h);

export const Item = ({
  description,
  name,
  manufacturer,
  year,
  cloneof,
  onClickSearch,
}) => {
  return html`
    <li
      class="group bg-[url('/static/noimage.png')] bg-top bg-no-repeat bg-cover relative w-80 overflow-hidden rounded-xl ring-1 ring-fuchsia-700 hover:ring-5 hover:ring-orange-500 transition-all duration-300 transform transition-all duration-300 hover:scale-105"
    >
      <img
        src="image?name=${name}"
        class="h-56 w-full object-contain transition-all duration-1000 group-hover:brightness-25 group-hover:scale-105"
      />

      <div
        class="pointer-events-none absolute top-0 left-0 w-full
                       bg-gradient-to-b from-black/90 to-transparent
                       px-4 py-3 text-center"
      >
        <p
          class="text-lg font-bold text-white group-hover:text-orange-400 transition-colors duration-300 cursor-default"
        >
          ${description}
        </p>
      </div>

      <div
        class="pointer-events-none absolute bottom-0 left-0 w-full
                       flex items-center justify-between
                       bg-gradient-to-t from-black/90 to-transparent
                       px-3 py-2 text-xs text-white"
      >
        <div class="flex items-center gap-1 font-bold cursor-default">
          <span>📅</span>
          <span>${year}</span>
        </div>

        <div class="flex items-center gap-1 font-extrabold">
          <span>👾 ${manufacturer}</span>
        </div>
      </div>

      <div
        class="absolute inset-0 flex flex-col items-center justify-center gap-2
         opacity-0 -translate-y-10 mt-15
         transition-all duration-300
         group-hover:opacity-100 group-hover:translate-y-0"
      >
        <div class="text-center text-xs text-white">
          <p class="font-bold text-xl cursor-default">${name}</p>
          <p
            class="font-bold hover:text-orange-400 text-white transition-all duration-500 cursor-pointer"
            onClick=${() => onClickSearch(cloneof)}
          >
            ${cloneof && `Clone of ${cloneof}`}
          </p>
        </div>

        <div class="flex gap-3 mt-1">
          <a
            target="_blank"
            href="/redirect?name=${name}&type=dl"
            class="hover:stroke-orange-400 stroke-white transition-all duration-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40px"
              height="40px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 7L12 14M12 14L15 11M12 14L9 11"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path d="M16 17H12H8" stroke-width="1.5" stroke-linecap="round" />
              <path
                d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </a>

          <a
            target="_blank"
            href="/redirect?name=${name}&type=wiki"
            class="hover:stroke-orange-400 stroke-white transition-all duration-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40px"
              height="40px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M10.125 8.875C10.125 7.83947 10.9645 7 12 7C13.0355 7 13.875 7.83947 13.875 8.875C13.875 9.56245 13.505 10.1635 12.9534 10.4899C12.478 10.7711 12 11.1977 12 11.75V13"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <circle cx="12" cy="16" r="1" fill="#1C274C" />
              <path
                d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </a>

          <a
            target="_blank"
            href="/redirect?name=${name}&type=wiki"
            class="hover:stroke-orange-400 stroke-white transition-all duration-500"
          >
            <svg
              width="40px"
              height="40px"
              viewBox="0 0 800 800"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M733.333 400C733.333 557.133 733.333 635.703 684.517 684.517C635.703 733.333 557.133 733.333 400 733.333C242.865 733.333 164.298 733.333 115.482 684.517C66.6667 635.703 66.6667 557.133 66.6667 400C66.6667 242.865 66.6667 164.298 115.482 115.482C164.298 66.6667 242.865 66.6667 400 66.6667C557.133 66.6667 635.703 66.6667 684.517 115.482C716.977 147.94 727.853 193.552 731.497 266.667"
                stroke-width="50"
                stroke-linecap="round"
              />
              <path
                d="M290.924 306.628C245.911 316.813 223.405 321.905 218.051 339.124C212.696 356.342 228.039 374.285 258.726 410.167L266.665 419.451C275.385 429.648 279.745 434.746 281.706 441.054C283.668 447.362 283.009 454.164 281.69 467.77L280.49 480.156C275.851 528.032 273.531 551.971 287.549 562.612C301.568 573.254 322.64 563.551 364.785 544.147L375.688 539.126C387.664 533.612 393.652 530.854 400 530.854C406.348 530.854 412.336 533.612 424.311 539.126L435.214 544.147C477.359 563.551 498.432 573.254 512.451 562.612C526.469 551.971 524.149 528.032 519.51 480.156M541.274 410.167C571.961 374.285 587.304 356.342 581.949 339.124C576.595 321.905 554.087 316.813 509.077 306.628L497.431 303.993C484.639 301.099 478.245 299.652 473.11 295.754C467.973 291.856 464.681 285.947 458.093 274.131L452.096 263.373C428.917 221.791 417.328 201 400 201C382.672 201 371.082 221.791 347.903 263.373"
                stroke-width="45"
                stroke-linecap="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </li>
  `;
};
