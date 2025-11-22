import { a as createSignal, l as createElement, a4 as setProp, a5 as rootNode, r as insert, q as spread, m as mergeProps, s as setGlobalBackground, c as createComponent, V as View, T as Text, J as onCleanup } from "./index-B9nqAPUy.js";
function createTag(children) {
  const [texture, setTexture] = createSignal(null);
  const Tag = (() => {
    var _el$ = createElement("view");
    setProp(_el$, "display", "flex");
    setProp(_el$, "onLayout", (n) => {
      if (n.preFlexwidth && n.width !== n.preFlexwidth) {
        n.rtt = true;
        setTimeout(() => setTexture(n.texture), 1);
      }
    });
    setProp(_el$, "parent", rootNode);
    setProp(_el$, "textureOptions", {
      preventCleanup: true
    });
    insert(_el$, children);
    return _el$;
  })();
  Tag.render(false);
  const TagComponent = (props) => {
    return (() => {
      var _el$2 = createElement("view");
      setProp(_el$2, "color", 4294967295);
      setProp(_el$2, "autosize", true);
      spread(_el$2, mergeProps(props, {
        get texture() {
          return texture();
        }
      }), false);
      return _el$2;
    })();
  };
  TagComponent.destroy = () => Tag.destroy();
  return TagComponent;
}
const TagsPage = () => {
  setGlobalBackground(286331391);
  const watchIconTextStyle = {
    fontWeight: 600,
    fontSize: 22,
    lineHeight: 40,
    y: 1
  };
  const ActionTag = createTag(createComponent(View, {
    color: 293806847,
    borderRadius: 8,
    display: "flex",
    padding: 8,
    get children() {
      return createComponent(Text, {
        style: watchIconTextStyle,
        children: "Action"
      });
    }
  }));
  const ComedyTag = createTag(createComponent(View, {
    color: 621793023,
    borderRadius: 8,
    display: "flex",
    padding: 8,
    get children() {
      return createComponent(Text, {
        style: watchIconTextStyle,
        children: "Comedy"
      });
    }
  }));
  const DramaTag = createTag(createComponent(View, {
    color: 4278190335,
    borderRadius: 8,
    display: "flex",
    padding: 8,
    get children() {
      return createComponent(Text, {
        style: watchIconTextStyle,
        children: "Drama"
      });
    }
  }));
  const NewEpisodeTag = createTag(createComponent(View, {
    color: 4294967295,
    borderRadius: 8,
    display: "flex",
    padding: 8,
    effects: {
      rounded: {
        radius: [10, 0, 10, 0]
      }
    },
    get children() {
      return createComponent(Text, {
        style: watchIconTextStyle,
        color: 255,
        fontWeight: 400,
        children: "New Episode"
      });
    }
  }));
  onCleanup(() => {
    ActionTag.destroy();
    ComedyTag.destroy();
    DramaTag.destroy();
    NewEpisodeTag.destroy();
  });
  return [createComponent(Text, {
    x: 100,
    y: 100,
    fontSize: 50,
    color: 4294967295,
    children: "Tags Page"
  }), createComponent(View, {
    x: 150,
    y: 200,
    display: "flex",
    flexDirection: "row",
    gap: 16,
    flexWrap: "wrap",
    autofocus: true,
    get children() {
      return [createComponent(ComedyTag, {}), createComponent(DramaTag, {}), createComponent(ActionTag, {}), createComponent(NewEpisodeTag, {}), createComponent(ComedyTag, {}), createComponent(DramaTag, {}), createComponent(ActionTag, {}), createComponent(NewEpisodeTag, {}), createComponent(ComedyTag, {}), createComponent(DramaTag, {}), createComponent(ActionTag, {}), createComponent(NewEpisodeTag, {}), createComponent(ComedyTag, {}), createComponent(DramaTag, {}), createComponent(ActionTag, {}), createComponent(NewEpisodeTag, {}), createComponent(ComedyTag, {}), createComponent(DramaTag, {}), createComponent(ActionTag, {}), createComponent(NewEpisodeTag, {}), createComponent(ComedyTag, {}), createComponent(DramaTag, {}), createComponent(ActionTag, {}), createComponent(NewEpisodeTag, {}), createComponent(ComedyTag, {}), createComponent(DramaTag, {}), createComponent(ActionTag, {}), createComponent(NewEpisodeTag, {}), createComponent(ComedyTag, {}), createComponent(DramaTag, {}), createComponent(ActionTag, {}), createComponent(NewEpisodeTag, {}), createComponent(ComedyTag, {}), createComponent(DramaTag, {}), createComponent(ActionTag, {})];
    }
  })];
};
export {
  TagsPage as default
};
