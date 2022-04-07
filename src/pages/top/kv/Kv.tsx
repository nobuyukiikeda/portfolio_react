import React from 'react';
import * as THREE from 'three';
import './kv.scss';
import ParticleObject from './ParticleObject';

export default class Kv extends React.Component {
  scene = new THREE.Scene();
  light = new THREE.DirectionalLight(0xffffff);
  renderer = new THREE.WebGLRenderer();
  camera?: THREE.PerspectiveCamera;
  obj?: ParticleObject;
  resizeEvent?: () => void;

  componentDidMount() {
    this.init();
    this.renderCanvas();

    // 画面リサイズ時のイベントを登録
    this.resizeEvent = this.resetSize.bind(this);
    window.addEventListener('resize', this.resizeEvent);
  }

  componentWillUnmount() {
    // 画面リサイズ時のイベントを破棄します
    if (this.resizeEvent) {
      window.removeEventListener('resize', this.resizeEvent);
    }
  }

  private init() {
    this.scene.background = new THREE.Color(0xfcfcfc);
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 300);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.light.position.set(-50, 100, 200);
    this.scene.add(this.light);
    this.scene.add(new THREE.AmbientLight(0xffffff));

    const canvas = document.getElementById('canvas');
    if (!canvas) return;

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    canvas.appendChild(this.renderer.domElement);

    this.obj = new ParticleObject();

    this.initGeometry();

    this.obj.loaded();
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

  /**
   * レンダラー周りを高さ・幅を再設定します
   * @returns
   */
  private resetSize() {
    if (!this.camera) return;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  render() {
    return (
      <section className="l-section l-section--home">
        <div className="hero">
          <div className="kv">
            <div id="canvas" className="kv__canvas"></div>
            <div className="scroll-icon">
              <span></span>
            </div>
            <div className="catch">
              <h1>This is my portfolio site</h1>
              <h2>Nobuyuki Ikeda</h2>
              <p>web developer</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
