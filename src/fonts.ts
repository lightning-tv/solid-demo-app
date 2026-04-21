const basePath = import.meta.env.BASE_URL;

export default [
  {
    type: "msdf",
    fontFamily: "Roboto",
    atlasDataUrl: basePath + "fonts/Roboto-Regular.msdf.json",
    atlasUrl: basePath + "fonts/Roboto-Regular.msdf.png",
    metrics: {
      ascender: 1000,
      descender: 100,
      lineGap: 0,
      unitsPerEm: 1000
    }
  } as const,
  {
    type: "msdf",
    fontFamily: "Roboto700",
    atlasDataUrl: basePath + "fonts/Roboto-Bold.msdf.json",
    atlasUrl: basePath + "fonts/Roboto-Bold.msdf.png",
    metrics: {
      ascender: 1000,
      descender: 100,
      lineGap: 0,
      unitsPerEm: 1000
    }
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
    fontFamily: "Roboto",
    fontUrl: basePath + "fonts/Roboto-Regular.ttf"
  },
  {
    fontFamily: "Roboto700",
    fontUrl: basePath + "fonts/Roboto-Bold.ttf"
  }
];
