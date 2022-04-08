import * as THREE from 'three';
import ParticleObject from './ParticleObject';

export default class KvImage {
  /** Canvasを描画するDOM */
  private canvas: HTMLElement;
  /** Canvasのwidth */
  private width: number;
  /** Canvasのheight */
  private height: number;
  private scene = new THREE.Scene();
  private light = new THREE.DirectionalLight(0xffffff);
  private renderer = new THREE.WebGLRenderer();
  private camera?: THREE.PerspectiveCamera;
  private obj?: ParticleObject;

  /**
   * コンストラクター
   * @param canvas
   * @param width
   * @param height
   */
  constructor(canvas: HTMLElement, width: number, height: number) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
  }

  /**
   * 初期化処理+初期描画実行
   */
  public init() {
    this.scene.background = new THREE.Color(0xfcfcfc);
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 300);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.light.position.set(-50, 100, 200);
    this.scene.add(this.light);
    this.scene.add(new THREE.AmbientLight(0xffffff));

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.canvas.appendChild(this.renderer.domElement);

    this.obj = new ParticleObject();

    this.initGeometry();

    this.obj.loaded();

    this.renderCanvas();
  }

  /**
   * レンダラー周りを高さ・幅を再設定します
   * @returns
   */
  public resetSize() {
    if (!this.camera) return;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  private initGeometry() {
    if (!this.obj) return;

    this.obj.createMesh();
    if (this.obj.obj && this.obj.wireObj) {
      this.scene.add(this.obj.obj);
      this.scene.add(this.obj.wireObj);
    }
  }

  private renderCanvas() {
    if (!this.camera || !this.obj) return;
    this.obj.render();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => {
      this.renderCanvas();
    });
  }
}
