import { h as hexColor, o as onMount, s as setGlobalBackground, c as createComponent, V as View, T as Text } from "./index-DXu43-v3.js";
const TextPage = () => {
  const OverviewContainer = {
    width: 900,
    height: 500,
    y: 350,
    x: 150,
    gap: 25,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flexStart",
    color: hexColor("00000000")
  };
  const SublineContainer = {
    width: 900,
    gap: 6,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flexStart",
    color: 0
  };
  const Title = {
    fontSize: 42,
    fontWeight: "bold"
  };
  const SubTitle = {
    fontSize: 38,
    fontWeight: 500
  };
  const Overview = {
    width: OverviewContainer.width,
    fontSize: 26,
    fontWeight: "normal",
    contain: "width"
  };
  const Subline = {
    fontSize: 26,
    fontWeight: 100
  };
  onMount(() => {
    setGlobalBackground(255);
  });
  return [createComponent(View, {
    autofocus: true,
    style: OverviewContainer,
    get children() {
      return [createComponent(Text, {
        style: Title,
        children: "Title of the Page"
      }), createComponent(Text, {
        style: SubTitle,
        children: "Tag line for the page"
      }), createComponent(Text, {
        style: Overview,
        children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel tempor tellus. Sed eu leo purus. Vestibulum sollicitudin eget tellus a varius. Phasellus est turpis, volutpat sed blandit sit amet, rutrum sit amet mauris. In dignissim elit orci, a sollicitudin ipsum faucibus et. Quisque vel quam rutrum, faucibus augue sed, scelerisque nunc."
      }), createComponent(View, {
        style: SublineContainer,
        get children() {
          return [createComponent(Text, {
            style: Subline,
            children: "Subline Text"
          }), createComponent(View, {
            width: 28,
            height: 28,
            src: "./assets/rt-popcorn.png"
          }), createComponent(Text, {
            style: Subline,
            children: "More Text"
          })];
        }
      })];
    }
  }), createComponent(View, {
    width: 600,
    display: "flex",
    gap: 20,
    height: 42,
    y: 200,
    x: 150,
    get children() {
      return [createComponent(Text, {
        style: Title,
        children: "Flex Grow"
      }), createComponent(View, {
        flexGrow: 1,
        height: 4,
        y: 19,
        color: 4281336063
      }), createComponent(View, {
        flexGrow: 3,
        height: 4,
        y: 19,
        color: 4281401343
      }), createComponent(View, {
        flexGrow: 1,
        height: 4,
        y: 19,
        color: 4005178623
      })];
    }
  })];
};
export {
  TextPage as default
};
