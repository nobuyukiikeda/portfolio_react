import React from 'react';
import * as THREE from 'three';
import './gallery.scss';
import SketchInfoThree from '../../components/sketch-info/SketchInfoThree';
import CanvasUtil from '../../utils/CanvasUtil';
import { GalleryImage } from './GalleryImage';
import EasingUtil from '../../utils/EasingUtil';
import bgWood from './img/bg_wood2.jpg';
import bgStone from './img/bg_stone.jpg';

export default class Gallery extends React.Component {
  wWidth = 0;
  wHeight = 0;
  scene = new THREE.Scene();
  light = new THREE.DirectionalLight(0xffffff);
  renderer = new THREE.WebGLRenderer();
  camera?: THREE.PerspectiveCamera;
  /** カメラの移動中フラグ */
  isCameraMove = true;
  /** 画像の枚数 */
  numRowImages = 24;
  /** 行スケール */
  rowScale = 5;
  /** イメージのオフセット */
  imageOffset = 1;
  /** カメラの現在のタイミング保持変数 */
  t = 0;
  /** カメラ移動スピードの設定値 */
  timeSpeed = 0.003;

  imagesObjects: GalleryImage[] = [];
  imagesTextures: THREE.Texture[] = [];

  /** Camera Property Object */
  cObj = {
    beforeTarget: 0,
    afterTarget: 0,
    beforeViewPoint: new THREE.Vector3(0, 0, 0),
    afterViewPoint: new THREE.Vector3(0, 0, 0),
    x: 0,
    y: 0,
    z: 0,
    beforeX: 0,
    beforeY: 2,
    beforeZ: 10,
    afterX: 0,
    afterY: 0,
    afterZ: 0,
  };

  viewRate = CanvasUtil.clamp(document.body.clientWidth / 1200, 0.5, 0.85);

  async componentDidMount() {
    await this.setup();
    this.init();

    setTimeout(() => {
      const pager = document.getElementsByClassName('gallery-pager');
      for (let i = 0; i < pager.length; i++) {
        (pager[i] as HTMLElement).style.display = 'block';
      }
    }, 5000);
  }

  /**
   * 初期化に必要な前準備
   */
  private async setup() {
    this.wWidth = window.innerWidth;
    this.wHeight = window.innerHeight;

    this.scene.background = new THREE.Color(0x222222);
    this.light.position.set(-50, 100, 200);
    this.scene.add(this.light);
    this.scene.add(new THREE.AmbientLight(0xffffff));

    const canvas = document.getElementById('canvas');
    if (!canvas) return;

    this.renderer.setSize(this.wWidth, this.wHeight);
    canvas.appendChild(this.renderer.domElement);

    // scene.add( new THREE.AxesHelper( 20 ) );

    const images: Promise<THREE.Texture>[] = [];
    for (let i = 0; i < this.numRowImages; i++) {
      const imageNum = String(Math.min(i + 1, 24)).padStart(2, '0');
      const src = new URL(`./img/image${imageNum}.png`, import.meta.url).href;
      const image = CanvasUtil.loadTextureAsync(src);
      images.push(image);
    }
    await Promise.all(images).then(textures => {
      textures.forEach(texture => {
        this.imagesTextures.push(texture);
      });
    });
  }

  /**
   * 初期化処理
   */
  private init() {
    this.initImages();
    this.initCamera();
    this.renderCanvas();

    window.addEventListener('resize', () => {
      if (!this.camera) return;

      const w = window.innerWidth;
      const h = window.innerHeight;
      this.viewRate = CanvasUtil.clamp(
        document.body.clientWidth / 1200,
        0.5,
        0.9
      );
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(w, h);
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.setCamera();
    });
  }

  /**
   * 画像の初期化です
   */
  private initImages() {
    const imageGeometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    const frameGeometry = new THREE.PlaneGeometry(1.1, 1.1, 1, 1);
    const bgWoodTexture = CanvasUtil.loadTexture(bgWood);
    bgWoodTexture.wrapS = THREE.RepeatWrapping;
    bgWoodTexture.wrapT = THREE.RepeatWrapping;
    bgWoodTexture.repeat.set(1, 1);
    const frameMaterial = new THREE.MeshBasicMaterial({
      map: bgWoodTexture,
    });
    const bgGeometry = new THREE.PlaneGeometry(1.5, 1.5, 1, 1);
    const bgStoneTexture = CanvasUtil.loadTexture(bgStone);
    bgStoneTexture.wrapS = THREE.RepeatWrapping;
    bgStoneTexture.wrapT = THREE.RepeatWrapping;
    bgStoneTexture.repeat.set(2, 2);
    const bgMaterial = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: bgStoneTexture,
    });
    for (let i = 0; i < this.numRowImages; i++) {
      const image = new GalleryImage(
        i,
        this.imagesTextures[i],
        imageGeometry,
        frameGeometry,
        frameMaterial,
        bgGeometry,
        bgMaterial,
        this.imageOffset,
        this.numRowImages,
        this.rowScale
      );
      this.scene.add(image.obj, image.frame, image.bg);
      this.imagesObjects.push(image);
    }
  }

  /**
   * カメラの初期化です
   */
  private initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.wWidth / this.wHeight,
      0.1,
      100
    );
    this.camera.position.set(0, 2, 10);
    this.camera.lookAt(0, 0, 0);
    this.cObj.afterTarget = CanvasUtil.randomInt(1, 23);
    this.cObj.beforeViewPoint = new THREE.Vector3(0, 0, 0);
    this.cObj.afterViewPoint =
      this.imagesObjects[this.cObj.afterTarget].obj.position;
    this.cObj.afterX = CanvasUtil.mix(
      0,
      this.cObj.afterViewPoint.x,
      this.viewRate
    );
    this.cObj.afterY = CanvasUtil.mix(
      0,
      this.cObj.afterViewPoint.y,
      this.viewRate
    );
    this.cObj.afterZ = CanvasUtil.mix(
      0,
      this.cObj.afterViewPoint.z,
      this.viewRate
    );
  }

  /**
   * カメラのポジションをセットします。
   */
  private setCamera() {
    if (!this.camera) return;

    this.cObj.x = CanvasUtil.mix(
      this.cObj.beforeX,
      this.cObj.afterX,
      EasingUtil.easeInOutQuart(this.t)
    );
    this.cObj.y = CanvasUtil.mix(
      this.cObj.beforeY,
      this.cObj.afterY,
      EasingUtil.easeInOutQuart(this.t)
    );
    this.cObj.z = CanvasUtil.mix(
      this.cObj.beforeZ,
      this.cObj.afterZ,
      EasingUtil.easeInOutQuart(this.t)
    );
    this.camera.position.set(this.cObj.x, this.cObj.y, this.cObj.z);
    this.camera.lookAt(
      CanvasUtil.mixVector(
        this.cObj.beforeViewPoint,
        this.cObj.afterViewPoint,
        EasingUtil.easeInOutQuart(this.t)
      )
    );
  }

  /**
   * カメラの位置を固定します。（カメラの移動完了時）
   */
  private lockCamera() {
    this.cObj.beforeTarget = this.cObj.afterTarget;
    this.cObj.beforeViewPoint = this.cObj.afterViewPoint;
    this.cObj.beforeX = this.cObj.x;
    this.cObj.beforeY = this.cObj.y;
    this.cObj.beforeZ = this.cObj.z;
  }

  /**
   * キャンバスの描画処理です
   */
  private renderCanvas() {
    if (!this.camera) return;
    if (this.isCameraMove) {
      this.t += this.timeSpeed;
      this.setCamera();
      if (this.t > 1.0) {
        this.isCameraMove = false;
        this.lockCamera();
      }
    }
    requestAnimationFrame(() => {
      this.renderCanvas();
    });
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * カメラを移動させます
   * @param direction
   * @returns
   */
  private moveCamera(direction: 'pre' | 'next') {
    if (this.isCameraMove === true) {
      return;
    }
    switch (direction) {
      case 'pre':
        this.cObj.afterTarget = (this.cObj.afterTarget + 1) % this.numRowImages;
        this.timeSpeed = 0.01;
        break;
      case 'next':
        this.cObj.afterTarget = (this.cObj.afterTarget - 1) % this.numRowImages;
        this.timeSpeed = 0.01;
        break;
      default:
        return false;
    }
    this.cObj.afterViewPoint =
      this.imagesObjects[this.cObj.afterTarget].obj.position;
    this.cObj.afterX = CanvasUtil.mix(
      0,
      this.cObj.afterViewPoint.x,
      this.viewRate
    );
    this.cObj.afterY = CanvasUtil.mix(
      0,
      this.cObj.afterViewPoint.y,
      this.viewRate
    );
    this.cObj.afterZ = CanvasUtil.mix(
      0,
      this.cObj.afterViewPoint.z,
      this.viewRate
    );
    // cameraのモーション値をリセット
    this.t = 0;
    this.isCameraMove = true;
  }

  /**
   * ナビゲーションクリック時の処理です
   * @param direction
   * @returns
   */
  clickNav(direction: 'pre' | 'next') {
    if (this.isCameraMove === true) {
      return false;
    }
    this.moveCamera(direction);
  }

  render() {
    return (
      <>
        <main className="main sketch--gallery">
          <div id="canvas"></div>
          <div className="gallery-pager">
            <div className="gallery-pager__pre">
              <a onClick={() => this.clickNav('pre')}></a>
            </div>
            <div className="gallery-pager__next">
              <a onClick={() => this.clickNav('next')}></a>
            </div>
          </div>
          <SketchInfoThree title="Art gallery" />
        </main>
      </>
    );
  }
}
