import { ElementNode } from "@lightningtv/solid";
import { LazyColumn, VirtualRow } from "@lightningtv/solid/primitives";
import { onMount } from "solid-js";
import { setGlobalBackground } from "../state";
import { TitleRow } from "../components";
import styles from "../styles";

const VirtualPage = (props) => {
  onMount(() => setGlobalBackground("#333"));
  const scrolls = ['auto', 'edge', 'always'];

  return (
      <LazyColumn
        y={50}
        upCount={3}
        bufferSize={0}
        each={props.data.rows.filter((item) => item.type !== 'Hero')}
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
              title={scrolls[index % 3] + ' ' + (index >= 3 ? 'wrap' : '')}
              height={330}
              items={row().items()}
              wrap={index >= 3}
            />
        }
      </LazyColumn>
  );
};

export default VirtualPage;
