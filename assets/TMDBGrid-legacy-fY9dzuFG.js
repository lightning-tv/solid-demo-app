;
(function () {
  function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
  function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
  System.register(['./index-legacy-56GW5w4H.js'], function (exports, module) {
    'use strict';

    var createSignal, createMemo, createComponent, View, mergeProps, For, Dynamic, isFunction, debounce, createEffect, on, setGlobalBackground, activeElement, Text, ContentBlock, Poster;
    return {
      setters: [function (module) {
        createSignal = module.c;
        createMemo = module.j;
        createComponent = module.h;
        View = module.V;
        mergeProps = module.m;
        For = module.F;
        Dynamic = module.D;
        isFunction = module.n;
        debounce = module.p;
        createEffect = module.f;
        on = module.o;
        setGlobalBackground = module.s;
        activeElement = module.q;
        Text = module.T;
        ContentBlock = module.r;
        Poster = module.P;
      }],
      execute: function execute() {
        var Grid = function Grid(props) {
          var _createSignal = createSignal(0),
            _createSignal2 = _slicedToArray(_createSignal, 2),
            focusedIndex = _createSignal2[0],
            setFocusedIndex = _createSignal2[1];
          var baseColumns = 4;
          var columns = createMemo(function () {
            return props.columns || baseColumns;
          });
          var totalWidth = createMemo(function () {
            var _props$itemWidth, _props$itemOffset;
            return ((_props$itemWidth = props.itemWidth) !== null && _props$itemWidth !== void 0 ? _props$itemWidth : 300) + ((_props$itemOffset = props.itemOffset) !== null && _props$itemOffset !== void 0 ? _props$itemOffset : 0);
          });
          var totalHeight = createMemo(function () {
            var _props$itemHeight, _props$itemOffset2;
            return ((_props$itemHeight = props.itemHeight) !== null && _props$itemHeight !== void 0 ? _props$itemHeight : 300) + ((_props$itemOffset2 = props.itemOffset) !== null && _props$itemOffset2 !== void 0 ? _props$itemOffset2 : 0);
          });
          var moveFocus = function moveFocus(delta, elm) {
            if (!props.items || props.items.length === 0) return false;
            var newIndex = focusedIndex() + delta;
            if (newIndex >= 0 && newIndex < props.items.length) {
              setFocusedIndex(newIndex);
            } else if (props.looping) {
              var totalItems = props.items.length;
              if (delta < 0) {
                var lastRowStart = totalItems - totalItems % columns() || totalItems - columns();
                var target = lastRowStart + focusedIndex() % columns();
                setFocusedIndex(target < totalItems ? target : target - columns());
              } else {
                setFocusedIndex(focusedIndex() % columns());
              }
            } else {
              return false;
            }
            var focusedElm = elm.children[focusedIndex()];
            focusedElm.setFocus();
            isFunction(props.onSelectedChanged) && props.onSelectedChanged.call(elm, focusedIndex(), elm, focusedElm);
            return true;
          };
          var handleHorizontalFocus = function handleHorizontalFocus(delta, elm) {
            if (!props.items || props.items.length === 0) return false;
            var newIndex = focusedIndex() + delta;
            var isWithinRow = Math.floor(newIndex / columns()) === Math.floor(focusedIndex() / columns());
            if (newIndex >= 0 && newIndex < props.items.length && isWithinRow) {
              setFocusedIndex(newIndex);
            } else if (props.looping) {
              var rowStart = Math.floor(focusedIndex() / columns()) * columns();
              var rowEnd = Math.min(rowStart + columns() - 1, props.items.length - 1);
              setFocusedIndex(delta > 0 ? newIndex > rowEnd ? rowStart : newIndex : newIndex < rowStart ? rowEnd : newIndex);
            } else {
              return false;
            }
            var focusedElm = elm.children[focusedIndex()];
            focusedElm.setFocus();
            isFunction(props.onSelectedChanged) && props.onSelectedChanged.call(elm, focusedIndex(), elm, focusedElm);
            return true;
          };
          function onFocus() {
            handleHorizontalFocus(0, this);
          }
          var scrollY = createMemo(function () {
            var _props$y;
            return props.scroll === "none" ? (_props$y = props.y) !== null && _props$y !== void 0 ? _props$y : 0 : -Math.floor(focusedIndex() / columns()) * totalHeight() + (props.y || 0);
          });
          return createComponent(View, mergeProps({
            transition: {
              y: true
            }
          }, props, {
            onUp: function onUp(_e, elm) {
              return moveFocus(-columns(), elm);
            },
            onDown: function onDown(_e, elm) {
              return moveFocus(columns(), elm);
            },
            onLeft: function onLeft(_e, elm) {
              return handleHorizontalFocus(-1, elm);
            },
            onRight: function onRight(_e, elm) {
              return handleHorizontalFocus(1, elm);
            },
            onFocus: onFocus,
            strictBounds: false,
            get y() {
              return scrollY();
            },
            get children() {
              return createComponent(For, {
                get each() {
                  return props.items;
                },
                children: function children(item, index) {
                  return createComponent(Dynamic, mergeProps(item, {
                    get component() {
                      return props.item;
                    },
                    get width() {
                      return props.itemWidth;
                    },
                    get height() {
                      return props.itemHeight;
                    },
                    get x() {
                      return index() % columns() * totalWidth();
                    },
                    get y() {
                      return Math.floor(index() / columns()) * totalHeight();
                    }
                  }));
                }
              });
            }
          }));
        };
        var TMDB = exports("default", function (props) {
          var _createSignal3 = createSignal({}),
            _createSignal4 = _slicedToArray(_createSignal3, 2),
            heroContent = _createSignal4[0],
            setHeroContent = _createSignal4[1];
          var contentBlock,
            solidLogo,
            firstRun = true;
          var delayedBackgrounds = debounce(setGlobalBackground, 800);
          var delayedHero = debounce(function (content) {
            return setHeroContent(content || {});
          }, 600);
          createEffect(on(activeElement, function (elm) {
            if (!elm) return;
            if (firstRun) {
              elm.backdrop && setGlobalBackground(elm.backdrop);
              elm.heroContent && setHeroContent(elm.heroContent);
              firstRun = false;
            } else {
              elm.backdrop && delayedBackgrounds(elm.backdrop);
              elm.heroContent && delayedHero(elm.heroContent);
            }
          }, {
            defer: true
          }));
          var items = createMemo(function () {
            return props.data.rows.map(function (row) {
              return row.items();
            }).flat();
          });
          return [createComponent(View, {
            ref: function ref(r$) {
              var _ref$ = solidLogo;
              typeof _ref$ === "function" ? _ref$(r$) : solidLogo = r$;
            },
            width: 300,
            height: 150,
            x: 162,
            y: 80,
            zIndex: 105,
            get children() {
              return [createComponent(Text, {
                x: 80,
                fontSize: 28,
                color: 4143380121,
                children: "Built with"
              }), createComponent(View, {
                y: 32,
                src: "./assets/solidWord.png",
                width: 280,
                height: 52
              }), createComponent(View, {
                x: 0,
                y: 110,
                src: "./assets/tmdb.png",
                width: 80,
                height: 41
              }), createComponent(Text, {
                x: 90,
                y: 110,
                contain: "width",
                width: 160,
                fontSize: 12,
                color: 4143380121,
                children: "This product uses the TMDB API but is not endorsed or certified by TMDB."
              })];
            }
          }), createComponent(ContentBlock, {
            ref: function ref(r$) {
              var _ref$2 = contentBlock;
              typeof _ref$2 === "function" ? _ref$2(r$) : contentBlock = r$;
            },
            y: 300,
            x: 162,
            get content() {
              return heroContent();
            }
          }), createComponent(View, {
            x: 165,
            y: 540,
            clipping: true,
            get children() {
              return createComponent(Grid, {
                x: 12,
                y: 12,
                get autofocus() {
                  return items();
                },
                item: Poster,
                itemWidth: 200,
                get items() {
                  return items();
                },
                columns: 6,
                itemOffset: 36
              });
            }
          })];
        });
      }
    };
  });
})();
