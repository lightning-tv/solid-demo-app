;
(function () {
  function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
  function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
  function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  System.register(['./index-legacy-BpNZAEdy.js'], function (exports, module) {
    'use strict';

    var api, convertItemsToTiles, getImageUrl, useParams, useNavigate, createResource, onMount, createComponent, Show, View, styles, Text, theme, Column, TileRow, assertTruthy, setGlobalBackground;
    return {
      setters: [function (module) {
        api = module.K;
        convertItemsToTiles = module.L;
        getImageUrl = module.N;
        useParams = module.O;
        useNavigate = module.v;
        createResource = module.a;
        onMount = module.g;
        createComponent = module.h;
        Show = module.S;
        View = module.V;
        styles = module.G;
        Text = module.T;
        theme = module.t;
        Column = module.C;
        TileRow = module.J;
        assertTruthy = module.w;
        setGlobalBackground = module.s;
      }],
      execute: function execute() {
        function getCredits(_ref) {
          var id = _ref.id;
          return api.get("/person/".concat(id, "/combined_credits")).then(function (_ref2) {
            var cast = _ref2.cast;
            return convertItemsToTiles(cast.slice(0, 7));
          });
        }
        function getInfo(_ref3) {
          var id = _ref3.id;
          return api.get("/person/".concat(id)).then(function (data) {
            return _objectSpread({
              backgroundImage: getImageUrl(data.profile_path, "original"),
              heroContent: {
                title: data.title || data.name,
                description: data.biography
              }
            }, data);
          });
        }
        var People = exports("default", function () {
          var params = useParams();
          var navigate = useNavigate();
          var _createResource = createResource(function () {
              return _objectSpread({}, params);
            }, getInfo),
            _createResource2 = _slicedToArray(_createResource, 1),
            data = _createResource2[0];
          var _createResource3 = createResource(function () {
              return _objectSpread({}, params);
            }, getCredits),
            _createResource4 = _slicedToArray(_createResource3, 1),
            credits = _createResource4[0];
          var Backdrop = {
            color: 0x000000FF,
            alpha: 0.8,
            width: 800,
            height: 440,
            x: 130,
            y: 180,
            borderRadius: 30
          };
          function onEnter() {
            var entity = this.children[this.selected || 0];
            assertTruthy(entity && entity.href);
            navigate(entity.href);
          }
          onMount(function () {
            setGlobalBackground(0x333333FF);
          });
          return createComponent(Show, {
            get when() {
              return data();
            },
            keyed: true,
            get children() {
              return [createComponent(View, {
                get src() {
                  return data().backgroundImage;
                },
                width: 400,
                autosize: true,
                y: 0,
                x: 1800,
                mountX: 1
              }), createComponent(View, {
                x: 150,
                y: 200,
                width: 800,
                gap: 24,
                get style() {
                  return styles.Column;
                },
                zIndex: 3,
                get children() {
                  return [createComponent(Text, {
                    contain: "width",
                    fontFamily: "Roboto",
                    get style() {
                      return theme.typography.display2;
                    },
                    get children() {
                      return data().name;
                    }
                  }), createComponent(Text, {
                    contain: "both",
                    get style() {
                      return styles.peopleBio;
                    },
                    get children() {
                      return data().biography;
                    }
                  })];
                }
              }), createComponent(View, {
                style: Backdrop
              }), createComponent(Column, {
                y: 670,
                x: 140,
                get style() {
                  return styles.Column;
                },
                scroll: "none",
                get children() {
                  return createComponent(Show, {
                    get when() {
                      return credits();
                    },
                    get children() {
                      return [createComponent(Text, {
                        skipFocus: true,
                        get style() {
                          return styles.RowTitle;
                        },
                        children: "Credits"
                      }), createComponent(TileRow, {
                        autofocus: true,
                        onEnter: onEnter,
                        get items() {
                          return credits();
                        }
                      })];
                    }
                  });
                }
              })];
            }
          });
        });
      }
    };
  });
})();
