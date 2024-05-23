import {
  createEffect,
  on,
  createSignal,
  createSelector,
  Index,
  onMount,
} from "solid-js";
import { type ElementNode, View, Text } from "@lightningjs/solid";
import { Column, Row } from "@lightningjs/solid-ui";
import styles from "./gridStyles";
import { setGlobalBackground } from "../state";
import { createInfiniteItems } from "@lightningjs/solid-primitives";

interface ProductsResponse {
  limit: number;
  products: any[]; // You can replace 'any' with the actual type of your products
  skip: number;
  total: number;
}

interface Product {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

function ProductRow(props) {
  return (
    <View
      y={props.y}
      autofocus={props.autofocus}
      style={styles.ProductRow}
      forwardStates
    >
      <Text style={styles.ProductText}>{props.item.id}</Text>
      <Text style={styles.ProductText}>{props.item.title}</Text>
      <Text style={styles.ProductText}>{props.item.price}</Text>
    </View>
  );
}

const Grid = () => {
  let totalProducts = 100;
  const [columnY, setcolumnY] = createSignal(0);
  const isFirst = createSelector(() => 0);
  const [rowIndex, setRowIndex] = createSignal(0);
  const [items, setItems] = createSignal<Product[]>([]);
  const [products, { setPage }] = createInfiniteItems<Product>((page) => {
    return fetch(`https://dummyjson.com/products?limit=20&skip=${20 * page}`)
      .then((res) => res.json())
      .then((data: ProductsResponse) => {
        totalProducts = data.total;
        return data.products;
      });
  });

  const EXTRA = 8;
  // When rowIndex changes we create a sub array for the UI
  createEffect(
    on(
      [products, rowIndex],
      ([products, index]) => {
        if (items().length - EXTRA > index) return;

        setItems(products.slice(0, index + EXTRA));
        if (index > products.length - 5) {
          // Load more products
          setPage((p) => p + 1);
        }
      },
      { defer: true },
    ),
  );

  onMount(() => {
    setGlobalBackground("#000000");
  });

  function changeRow(elm, active, selectedIndex, lastSelectedIndex) {
    setcolumnY((active.y || 0) * -1 + 50);
    setRowIndex(selectedIndex);
  }

  return (
    <View clipping style={styles.itemsContainer}>
      <Column plinko y={columnY()} scroll="none" onSelectedChanged={changeRow}>
        <Index each={items()}>
          {(item, i) => (
            <ProductRow y={i * 50} item={item()} autofocus={isFirst(i)} />
          )}
        </Index>
      </Column>
    </View>
  );
};

export default Grid;
