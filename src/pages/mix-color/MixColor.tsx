import React from 'react';
import SketchInfo from '../../components/sketch-info/SketchInfo';
import './mixColor.scss';
import * as PIXI from 'pixi.js';
import * as dat from 'dat.gui';
import vertexShader from './glsl/vertices.vs?raw';
import fragmentShader from './glsl/fragment.fs?raw';
import CanvasUtil from '../../utils/canvasUtil';

export default class MixColor extends React.Component {
  app?: PIXI.Application;
  triangle?: PIXI.Mesh<PIXI.Shader>;
  datGui?: dat.GUI;
  wWidth = 0;
  wHeight = 0;
  bgColor = 0x061639;
  colorPalette = {
    color1: '#f4955f',
    color2: '#ecff7d',
  };
  toggle = {
    vertical: true,
    horizon: true,
  };

  get color1() {
    return CanvasUtil.rgb2Hex(this.colorPalette.color1);
  }
  get color2() {
    return CanvasUtil.rgb2Hex(this.colorPalette.color2);
  }
  get uniforms() {
    return {
      resolutionX: this.wWidth,
      resolutionY: this.wWidth,
      vertical: 1,
      horizon: 1,
      value: 10,
      color1_Red: this.color1[0],
      color1_Green: this.color1[1],
      color1_Blue: this.color1[2],
      color2_Red: this.color2[0],
      color2_Green: this.color2[1],
      color2_Blue: this.color2[2],
    };
  }

  constructor(props: {}) {
    super(props);
    this.resizePixi = this.resizePixi.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  init() {
    this.wWidth = window.innerWidth;
    this.wHeight = window.innerHeight;

    this.app = new PIXI.Application({
      width: this.wWidth,
      height: this.wHeight,
    });
    this.app.renderer.backgroundColor = this.bgColor;
    this.app.renderer.options.autoDensity = true;

    const container = document.getElementById('canvas');
    if (!container) {
      throw Error('Canvas対象のidが見つかりません。');
    }
    container.appendChild(this.app.view);

    const geometry = new PIXI.Geometry()
      .addAttribute(
        'aVertexPosition',
        [0, 0, 0, this.wHeight, this.wWidth, 0, this.wWidth, this.wHeight],
        2
      )
      .addIndex([0, 1, 2, 2, 1, 3])
      .addAttribute('aColor', [1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0], 3);

    const shader = PIXI.Shader.from(
      vertexShader,
      fragmentShader,
      this.uniforms
    );

    this.triangle = new PIXI.Mesh(geometry, shader);
    this.triangle.position.set(0, 0);
    this.triangle.scale.set(1);
    this.app.stage.addChild(this.triangle);

    this.initDat();

    window.addEventListener('resize', this.resizePixi);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizePixi);
    this.datGui?.destroy();
  }

  initDat() {
    if (!this.triangle) return;

    this.datGui = new dat.GUI({ name: 'My GUI' });
    const target = this.triangle.shader.uniforms;
    const guiValue = this.datGui.add(target, 'value', 0, 200, 1);
    const guiVertical = this.datGui.add(this.toggle, 'vertical');
    guiVertical.onChange(() => {
      target.vertical = Number(this.toggle.vertical);
    });
    const guiHorizon = this.datGui.add(this.toggle, 'horizon');
    guiHorizon.onChange(() => {
      target.horizon = Number(this.toggle.horizon);
    });
    const guiColor1 = this.datGui.addColor(this.colorPalette, 'color1');
    const guiColor2 = this.datGui.addColor(this.colorPalette, 'color2');
    guiColor1.onChange(() => {
      const c = CanvasUtil.rgb2Hex(this.colorPalette.color1);
      target.color1_Red = c[0];
      target.color1_Green = c[1];
      target.color1_Blue = c[2];
    });
    guiColor2.onChange(() => {
      const c = CanvasUtil.rgb2Hex(this.colorPalette.color2);
      target.color2_Red = c[0];
      target.color2_Green = c[1];
      target.color2_Blue = c[2];
    });
  }

  resizePixi() {
    if (!this.app || !this.triangle) return;

    this.wWidth = window.innerWidth;
    this.wHeight = window.innerHeight;
    this.app.renderer.resize(this.wWidth, this.wHeight);
    this.triangle.shader.uniforms.resolutionX = this.wWidth;
    this.triangle.shader.uniforms.resolutionY = this.wWidth;
  }

  render() {
    return (
      <>
        <main className="main sketch--mixcolor">
          <div id="canvas"></div>
          <SketchInfo />
        </main>
      </>
    );
  }
}
