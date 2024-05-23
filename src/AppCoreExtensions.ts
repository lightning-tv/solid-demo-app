/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2023 Comcast
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  CoreExtension,
  WebTrFontFace,
  SdfTrFontFace,
  type Stage,
} from "@lightningjs/renderer/core";

const basePath = import.meta.env.BASE_URL;

export default class AppCoreExtension extends CoreExtension {
  async run(stage: Stage) {
    // stage.fontManager.addFontFace(
    //   new WebTrFontFace({
    //     fontFamily: "NotoSans",
    //     descriptors: {},
    //     fontUrl: basePath + "fonts/NotoSans-Regular.ttf",
    //     metrics: {
    //       ascender: 1069,
    //       descender: -293,
    //       lineGap: 0,
    //       unitsPerEm: 1000
    //     }
    //   }),
    // );
    stage.fontManager.addFontFace(
      new SdfTrFontFace(
        'msdf',
        {
          fontFamily: 'Ubuntu',
          descriptors: {
            weight: 700,
          },
          atlasDataUrl: basePath + 'fonts/Ubuntu-Bold.msdf.json',
          atlasUrl: basePath + 'fonts/Ubuntu-Bold.msdf.png',
          stage,
        }
      ),
    );
    stage.fontManager.addFontFace(
      new SdfTrFontFace(
        'msdf',
        {
          fontFamily: 'Ubuntu',
          descriptors: {
            weight: 400,
          },
          atlasDataUrl: basePath + 'fonts/Ubuntu-Regular.msdf.json',
          atlasUrl: basePath + 'fonts/Ubuntu-Regular.msdf.png',
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
          atlasDataUrl: basePath + 'fonts/Ubuntu-Regular.msdf.json',
          atlasUrl: basePath + 'fonts/Ubuntu-Regular.msdf.png',
          stage,
        }
      ),
    );
  }
}
