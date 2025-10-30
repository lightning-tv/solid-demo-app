import { s as setGlobalBackground, c as createComponent, V as View } from "./index-gL7wR27X.js";
const Default = () => {
  setGlobalBackground(506018815);
  return createComponent(View, {
    autofocus: true,
    get children() {
      return [createComponent(View, {
        width: 1920 / 4,
        height: 1080,
        colorTop: 143766271,
        colorBottom: 2784230655
      }), createComponent(View, {
        width: 1920 / 4,
        height: 1080,
        x: 1920 / 4,
        colorLeft: 3693487871,
        colorRight: 4168184319
      }), createComponent(View, {
        width: 1920 / 4,
        height: 1080,
        x: 1920 / 4 * 2,
        colorTop: 143766271,
        colorRight: 4168184319
      }), createComponent(View, {
        width: 1920 / 4,
        height: 1080,
        x: 1920 / 4 * 3,
        colorRight: 8388863,
        colorBottom: 4292280575
      })];
    }
  });
};
export {
  Default as default
};
