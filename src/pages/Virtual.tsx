import { LazyColumn } from "@lightningtv/solid/primitives";
import { onMount } from "solid-js";
import { setGlobalBackground } from "../state";
import { TitleRow } from "../components";
import styles from "../styles";

const VirtualPage = (props) => {
  onMount(() => setGlobalBackground("#333"));
  const scrolls = ['auto', 'edge', 'always'] as const;

  const rows = [...props.data.rows.filter((item) => item.type !== 'Hero')];
  rows.push({
    type: rows[0]?.type || 'Poster',
    items: () => (rows[0]?.items() || []).slice(0, 3),
    selected: 3
  });

  return (
      <LazyColumn
        y={50}
        upCount={3}
        bufferSize={0}
        each={rows}
        id="BrowseColumn"
        autofocus={props.data.rows[0].items()}
        gap={30}
        transition={{ y: { duration: 300, easing: "ease-in-out" } }}
        style={styles.Column}
      >
        {(row, index) =>
            <TitleRow
              row={row()}
              scroll={scrolls[index % 3]}
              title={scrolls[index % 3] + ' ' + (index >= 3 ? 'wrap' : '') + (row().selected !== undefined ? ` (selected = ${row().selected})` : '')}
              height={330}
              items={row().items()}
              wrap={index >= 3}
              selected={row().selected}
            />
        }
      </LazyColumn>
  );
};

export default VirtualPage;
