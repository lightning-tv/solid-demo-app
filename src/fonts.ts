import { WebTrFontFaceOptions } from "@lightningtv/solid";

const basePath = import.meta.env.BASE_URL;

export default [
  {
    type: "msdf",
    fontFamily: "Roboto",
    atlasDataUrl: basePath + "fonts/Roboto-Regular.msdf.json",
    atlasUrl: basePath + "fonts/Roboto-Regular.msdf.png"
  } as const,
  {
    type: "msdf",
    fontFamily: "Roboto700",
    atlasDataUrl: basePath + "fonts/Roboto-Bold.msdf.json",
    atlasUrl: basePath + "fonts/Roboto-Bold.msdf.png"
  } as const,
  {
    type: "msdf",
    fontFamily: "Arial",
    atlasDataUrl: basePath + "fonts/Roboto-Regular.msdf.json",
    atlasUrl: basePath + "fonts/Roboto-Regular.msdf.png"
  } as const,
  {
    type: "msdf",
    fontFamily: "Raleway",
    atlasDataUrl: basePath + "fonts/Raleway-ExtraBold.msdf.json",
    atlasUrl: basePath + "fonts/Raleway-ExtraBold.msdf.png"
  } as const,
  {
    fontFamily: "Roboto400",
    fontUrl: basePath + "fonts/Roboto-Regular.ttf"
  } as WebTrFontFaceOptions
];
