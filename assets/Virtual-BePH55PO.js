import { g as onMount, s as setGlobalBackground, h as createComponent, a2 as LazyColumn, a3 as TitleRow, O as styles } from "./index-BhmSSr2I.js";
const VirtualPage = (props) => {
  onMount(() => setGlobalBackground(858993663));
  const scrolls = ["auto", "edge", "always"];
  return createComponent(LazyColumn, {
    y: 100,
    upCount: 3,
    bufferSize: 0,
    get each() {
      return props.data.rows.filter((item) => item.type !== "Hero");
    },
    id: "BrowseColumn",
    get autofocus() {
      return props.data.rows[0].items();
    },
    gap: 40,
    transition: {
      y: {
        duration: 300,
        easing: "ease-in-out"
      }
    },
    get style() {
      return styles.Column;
    },
    children: (row, index) => createComponent(TitleRow, {
      get row() {
        return row();
      },
      get scroll() {
        return scrolls[index % 3];
      },
      get title() {
        return scrolls[index % 3] + " " + (index >= 3 ? "wrap" : "");
      },
      get height() {
        return row().height;
      },
      get items() {
        return row().items();
      },
      wrap: index >= 3
    })
  });
};
export {
  VirtualPage as default
};
