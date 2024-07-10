import {
  SdfTrFontFace,
  type Stage,
} from "@lightningjs/renderer";

const basePath = import.meta.env.BASE_URL;

export function loadFonts(stage: Stage) {
    stage.fontManager.addFontFace(
      new SdfTrFontFace(
        'msdf',
        {
          fontFamily: 'Roboto',
          descriptors: {
            weight: 700,
          },
          atlasDataUrl: basePath + 'fonts/Roboto-Bold.msdf.json',
          atlasUrl: basePath + 'fonts/Roboto-Bold.msdf.png',
          stage,
        }
      ),
    );

    stage.fontManager.addFontFace(
      new SdfTrFontFace(
        'msdf',
        {
          fontFamily: 'Roboto',
          descriptors: {
            weight: 500,
          },
          atlasDataUrl: basePath + 'fonts/Roboto-Medium.msdf.json',
          atlasUrl: basePath + 'fonts/Roboto-Medium.msdf.png',
          stage,
        }
      ),
    );
    
    
    stage.fontManager.addFontFace(
      new SdfTrFontFace(
        'msdf',
        {
          fontFamily: 'Roboto',
          descriptors: {
            weight: 400,
          },
          atlasDataUrl: basePath + 'fonts/Roboto-Regular.msdf.json',
          atlasUrl: basePath + 'fonts/Roboto-Regular.msdf.png',
          stage,
        }
      ),
    );

    stage.fontManager.addFontFace(
      new SdfTrFontFace(
        'msdf',
        {
          fontFamily: 'Roboto',
          descriptors: {
            weight: 100,
          },
          atlasDataUrl: basePath + 'fonts/Roboto-Thin.msdf.json',
          atlasUrl: basePath + 'fonts/Roboto-Thin.msdf.png',
          stage,
        }
      ),
    );

    stage.fontManager.addFontFace(
      new SdfTrFontFace(
        'msdf',
        {
          fontFamily: 'Arial',
          descriptors: {
            weight: 500,
          },
          atlasDataUrl: basePath + 'fonts/Roboto-Regular.msdf.json',
          atlasUrl: basePath + 'fonts/Roboto-Regular.msdf.png',
          stage,
        }
      ),
    );
}
