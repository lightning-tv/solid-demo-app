import { a as createSignal, o as onMount, s as setGlobalBackground, J as onCleanup, c as createComponent, V as View, T as Text } from "./index-CekWesQ9.js";

const Viewport = () => {
    let ball, invervalTimer;
    const [ballStatus, setBallStatus] = createSignal([]);
    const styleBall = {
        width: 100,
        height: 100,
        x: -400,
        y: -400,
        rotation: 0,
        borderRadius: 50,
        color: 1116206591,
        transition: {
            x: {
                duration: 1250,
                easing: "linear"
            },
            y: {
                duration: 1250,
                easing: "linear"
            },
            rotation: {
                duration: 1400,
                easing: "ease-in-out"
            }
        }
    };
    const Title = {
        fontSize: 32,
        x: 960,
        y: 540,
        mount: .5,
        lineheight: 52
    };
    const randomIntBetween = (from, to) => Math.floor(Math.random() * (to - from + 1) + from);
    onMount(() => {
        setGlobalBackground(255);
        ball.x = (1920 - 100) / 2;
        ball.y = (1080 - 100) / 2;
        invervalTimer = setInterval(() => {
            ball.rotation = randomIntBetween(-90, 90);
            ball.x = randomIntBetween(-300, 2220);
            ball.y = randomIntBetween(-300, 1380);
        }, 2500);
    });
    function logEvent(name, elm) {
        setBallStatus(prev => [ ...prev, name ].slice(-4));
        console.log(name);
    }
    onCleanup(() => {
        clearInterval(invervalTimer);
    });
    return createComponent(View, {
        get children() {
            return [ createComponent(Text, {
                style: Title,
                get children() {
                    return ballStatus().join("\n");
                }
            }), createComponent(View, {
                autofocus: true,
                style: styleBall,
                ref(r$) {
                    var _ref$ = ball;
                    typeof _ref$ === "function" ? _ref$(r$) : ball = r$;
                },
                onEvent: {
                    inBounds: elm => logEvent("inBounds"),
                    outOfBounds: elm => logEvent("outOfBounds"),
                    inViewport: elm => logEvent("inViewport"),
                    outOfViewport: elm => logEvent("outOfViewport")
                }
            }) ];
        }
    });
};

export { Viewport as default };
