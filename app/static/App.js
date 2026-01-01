import { h } from "https://esm.sh/preact@latest";
import {
  useState,
  useEffect,
  useRef,
} from "https://esm.sh/preact@latest/hooks";
import htm from "https://esm.sh/htm@3.1.1";
import { Item } from "./components/Item.js";
import { TextInput } from "./components/TextInput.js";
import { ComboBox } from "./components/ComboBox.js";

const html = htm.bind(h);

export const App = () => {
  const [textSearch, setTextSearch] = useState("");
  const [manufacturers, setManufacturers] = useState([]);
  const [list, setList] = useState([]);
  const [manuSearch, setManuSearch] = useState("");
  const [datasetSearch, setDatasetSearch] = useState("");
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/dropdowns");
      const json = await data.json();
      setManufacturers(json.manufacturers);
      setDatasets(json.datasets);
    };
    fetchData("/companies").catch(console.error);
  }, []);

  const handleClickSearch = async (cl) => {
    setManuSearch("");
    setDatasetSearch("");
    setTextSearch(cl);
    const x = `q=${encodeURI(cl)}`;
    const res = await fetch(`/search?${x}`);
    const list = await res.json();
    setList(list);
  };

  const handleFetch = async (e) => {
    e.preventDefault();
    const search = `${manuSearch} ${datasetSearch} ${textSearch}`.trim();
    if (search.length > 0) {
      const x = `q=${encodeURI(search)}`;
      const res = await fetch(`/search?${x}`);
      const list = await res.json();
      setList(list);
    }
  };

  return html`
    <div class="font-sans text-center">
      <div
        class="sticky top-0 z-50 w-full bg-black/80 px-4 py-3 flex justify-center shadow-md pb-8"
      >
        <form
          onSubmit=${handleFetch}
          class="flex flex-wrap items-end justify-center gap-3 w-full max-w-4xl"
        >
          <${TextInput}
            label="Fulltext"
            value=${textSearch}
            onInput=${(e) => setTextSearch(e.target.value)}
          />

          <${ComboBox}
            label="Company"
            options=${manufacturers}
            value=${manuSearch}
            onChange=${(v) => setManuSearch(v)}
          />
          <${ComboBox}
            label="Dataset"
            options=${datasets}
            value=${datasetSearch}
            onChange=${(v) => setDatasetSearch(v)}
          />

          <button type="submit" class="px-3 py-1 bg-orange-500 rounded-md">
            Search
          </button>
        </form>
      </div>

      <div class="mx-auto w-3/4 mt-10">
        <ul class="flex flex-wrap justify-center gap-6">
          ${list.map(
            (item) => html`
              <${Item}
                description=${item.description}
                name=${item.name}
                manufacturer=${item.manufacturer}
                year=${item.year}
                cloneof=${item.clone_of}
                onClickSearch=${handleClickSearch}
              />
            `
          )}
        </ul>
      </div>
    </div>
  `;
};
