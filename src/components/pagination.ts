import { createSignal, createComputed, batch, createResource } from "solid-js";

export function createInfiniteScroll(fetcher: (page: number) => Promise<any>) {
  const [pages, setPages] = createSignal<any[]>([]);
  const [page, setPage] = createSignal(1);
  const [end, setEnd] = createSignal(false);

  const [contents] = createResource(page, fetcher);

  createComputed(() => {
    const content = contents();
    if (!content) return;
    batch(() => {
      if (content.length === 0) setEnd(true);
      setPages((p) => [...p, ...content]);
    });
  });

  return {
    pages,
    page,
    setPage,
    setPages,
    end,
    setEnd,
  };
}
