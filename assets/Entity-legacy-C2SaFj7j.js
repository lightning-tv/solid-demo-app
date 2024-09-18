;
(function () {
  function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
  function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  System.register(['./index-legacy-DjJ4MW3q.js', './Button-legacy-BsgTkszi.js'], function (exports, module) {
    'use strict';

    var api, convertItemsToTiles, getImageUrl, useParams, useNavigate, createResource, createSignal, createEffect, on, setGlobalBackground, createComponent, Show, View, ContentBlock, Row, Column, styles, memo, Text, TileRow, assertTruthy, closeVideo, playVideo, setActiveElement, Button;
    return {
      setters: [function (module) {
        api = module.v;
        convertItemsToTiles = module.w;
        getImageUrl = module.x;
        useParams = module.y;
        useNavigate = module.u;
        createResource = module.a;
        createSignal = module.c;
        createEffect = module.f;
        on = module.o;
        setGlobalBackground = module.s;
        createComponent = module.h;
        Show = module.S;
        View = module.V;
        ContentBlock = module.z;
        Row = module.R;
        Column = module.C;
        styles = module.i;
        memo = module.l;
        Text = module.T;
        TileRow = module.A;
        assertTruthy = module.j;
        closeVideo = module.B;
        playVideo = module.D;
        setActiveElement = module.E;
      }, function (module) {
        Button = module.B;
      }],
      execute: function execute() {
        function minutesToHMM(minutes) {
          var hours = Math.floor(minutes / 60);
          var remainingMinutes = minutes % 60;
          return hours + "h " + (remainingMinutes < 10 ? "0" : "") + remainingMinutes + "min";
        }
        function formatDate(dateString) {
          var parts = dateString.split("-");
          return parts[1] + "/" + parts[2] + "/" + parts[0];
        }
        function justYear(dateString) {
          var parts = dateString.split("-");
          return parts[0];
        }
        function getRecommendations(_ref) {
          var type = _ref.type,
            id = _ref.id;
          return api.get("/".concat(type, "/").concat(id, "/recommendations")).then(function (_ref2) {
            var results = _ref2.results;
            if (results.length) {
              return convertItemsToTiles(results.slice(0, 7));
            }
            return api.get("/trending/".concat(type, "/week?page=1")).then(function (_ref3) {
              var results = _ref3.results;
              return convertItemsToTiles(results.slice(0, 7));
            });
          });
        }
        function getCredits(_ref4) {
          var type = _ref4.type,
            id = _ref4.id;
          return api.get("/".concat(type, "/").concat(id, "/credits")).then(function (_ref5) {
            var cast = _ref5.cast;
            return convertItemsToTiles(cast.slice(0, 7));
          });
        }
        function getInfo(_ref6) {
          var type = _ref6.type,
            id = _ref6.id;
          var rt = type === "movie" ? {
            rtCrit: 86,
            rtFan: 92
          } : {};
          return api.get("/".concat(type, "/").concat(id)).then(function (data) {
            return _objectSpread({
              backgroundImage: getImageUrl(data.backdrop_path, "w1280"),
              heroContent: {
                title: data.title || data.name,
                description: data.overview,
                badges: ["HD", "CC"],
                voteAverage: data.vote_average,
                voteCount: data.vote_count,
                metaText: type === "movie" ? minutesToHMM(data.runtime) + "   " + formatDate(data.release_date) : "".concat(justYear(data.first_air_date), " - ").concat(justYear(data.last_air_date)),
                reviews: rt
              }
            }, data);
          });
        }
        var Entity = exports("default", function () {
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
          var _createResource5 = createResource(function () {
              return _objectSpread({}, params);
            }, getRecommendations),
            _createResource6 = _slicedToArray(_createResource5, 1),
            recommendations = _createResource6[0];
          var _createSignal = createSignal(0),
            _createSignal2 = _slicedToArray(_createSignal, 2),
            backdropAlpha = _createSignal2[0],
            setBackdropAlpha = _createSignal2[1];
          createEffect(on(data, function (data2) {
            setGlobalBackground(data2.backgroundImage);
          }, {
            defer: true
          }));
          var columnY = 640;
          var Backdrop = {
            color: 0x000000FF,
            alpha: 0,
            width: 1900,
            height: 890,
            x: -160,
            y: columnY,
            borderRadius: 30
          };
          function onRowFocus() {
            this.children[this.selected || 0].setFocus();
            columnRef.y = columnY;
            backdropRef.y = columnY;
            backdropRef.alpha = 0;
          }
          function onRowFocusAnimate() {
            this.children[this.selected || 0].setFocus();
            columnRef.y = 200;
            backdropRef.y = 160;
            backdropRef.alpha = 0.9;
          }
          function onEnter() {
            var entity = this.children.find(function (c) {
              return c.states.has("focus");
            });
            assertTruthy(entity && entity.href);
            navigate(entity.href);
          }
          function onEscape() {
            closeVideo();
            document.getElementsByTagName("canvas")[0].focus();
            entityActions.setFocus();
            setBackdropAlpha(0);
          }
          function onEnterTrailer() {
            var video = playVideo();
            setActiveElement(video);
            setBackdropAlpha(0.9);
          }
          var columnRef, backdropRef, entityActions;
          return createComponent(Show, {
            get when() {
              return data();
            },
            get children() {
              return [createComponent(View, {
                x: 170,
                onUp: function onUp() {
                  return entityActions.setFocus();
                },
                onEscape: onEscape,
                get children() {
                  return [createComponent(ContentBlock, {
                    y: 260,
                    get content() {
                      return data().heroContent;
                    }
                  }), createComponent(Row, {
                    ref: function ref(r$) {
                      var _ref$ = entityActions;
                      typeof _ref$ === "function" ? _ref$(r$) : entityActions = r$;
                    },
                    y: 500,
                    scroll: "none",
                    height: 90,
                    width: 640,
                    gap: 40,
                    onDown: function onDown() {
                      return columnRef.setFocus();
                    },
                    onEnter: onEnterTrailer,
                    get children() {
                      return [createComponent(Button, {
                        width: 300,
                        get autofocus() {
                          return data();
                        },
                        children: "Play"
                      }), createComponent(Button, {
                        width: 300,
                        children: "Resume"
                      })];
                    }
                  }), createComponent(Column, {
                    ref: function ref(r$) {
                      var _ref$2 = columnRef;
                      typeof _ref$2 === "function" ? _ref$2(r$) : columnRef = r$;
                    },
                    x: 0,
                    y: columnY,
                    get style() {
                      return styles.Column;
                    },
                    height: 880,
                    scroll: "none",
                    zIndex: 5,
                    get children() {
                      return createComponent(Show, {
                        get when() {
                          return memo(function () {
                            return !!recommendations();
                          })() && credits();
                        },
                        get children() {
                          return [createComponent(Text, {
                            skipFocus: true,
                            get style() {
                              return styles.RowTitle;
                            },
                            children: "Recommendations"
                          }), createComponent(TileRow, {
                            onFocus: onRowFocus,
                            onEnter: onEnter,
                            get items() {
                              return recommendations();
                            },
                            width: 1620
                          }), createComponent(Text, {
                            skipFocus: true,
                            get style() {
                              return styles.RowTitle;
                            },
                            children: "Cast and Crew"
                          }), createComponent(TileRow, {
                            onFocus: onRowFocusAnimate,
                            onEnter: onEnter,
                            get items() {
                              return credits();
                            },
                            width: 1620
                          })];
                        }
                      });
                    }
                  }), createComponent(View, {
                    ref: function ref(r$) {
                      var _ref$3 = backdropRef;
                      typeof _ref$3 === "function" ? _ref$3(r$) : backdropRef = r$;
                    },
                    style: Backdrop,
                    transition: {
                      alpha: true,
                      y: true
                    }
                  })];
                }
              }), createComponent(View, {
                get alpha() {
                  return backdropAlpha();
                },
                color: 0x000000FF,
                skipFocus: true,
                zIndex: 200,
                transition: {
                  alpha: true
                }
              })];
            }
          });
        });
      }
    };
  });
})();
