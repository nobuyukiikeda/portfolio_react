import React from 'react';
import * as THREE from 'three';
import vertexShader from './glsl/vertices.vs?raw';
import fragmentShader from './glsl/fragment.fs?raw';
import './turnImage.scss';
import { IUniform } from 'three';
import texture1 from './img/texture01.jpg';
import texture2 from './img/texture02.jpg';
import SketchInfoThree from '../../components/sketch-info/SketchInfoThree';

export default class TurnImage extends React.Component {
  wWidth = 0;
  wHeight = 0;

  componentDidMount() {
    this.init();
  }

  init() {
    this.wWidth = window.innerWidth;
    this.wHeight = window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfcfcfc);
    const camera = new THREE.PerspectiveCamera(
      75,
      this.wWidth / this.wHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 500);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(-50, 100, 200);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff));

    const renderer = new THREE.WebGLRenderer();
    const canvas = document.getElementById('canvas');
    if (!canvas) return;

    renderer.setSize(this.wWidth, this.wHeight);
    canvas.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneBufferGeometry(
      window.innerWidth,
      window.innerHeight,
      100,
      100
    );
    const uniforms: { [uniform: string]: IUniform } = {
      slideProgress: { value: 1.0 },
      pixels: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      uvRate: {
        value: new THREE.Vector2(1.0, window.innerHeight / window.innerWidth),
      },
      texture: { value: undefined },
    };
    const material = new THREE.RawShaderMaterial({
      uniforms: uniforms,
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
    });

    const promiseTexture = (src: string) => {
      return new Promise((resolve, reject) => {
        loader.load(src, resolve, undefined, reject);
      });
    };

    const loader = new THREE.TextureLoader();
    Promise.all([promiseTexture(texture1), promiseTexture(texture2)]).then(
      (texture: any[]) => {
        texture.forEach(tex => {
          tex.magFilter = THREE.NearestFilter;
          tex.minFilter = THREE.NearestFilter;
          tex.wrapS = THREE.MirroredRepeatWrapping;
          tex.wrapT = THREE.MirroredRepeatWrapping;
        });
        uniforms.texture = { value: texture };
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
      }
    );

    let time = 0.0;
    let timeDir = true;
    let m = true;
    const render = () => {
      if (m === true) {
        if (timeDir === true) {
          time += 0.01;
        } else {
          time -= 0.01;
        }

        if (time > 1.5) {
          timeDir = false;
        } else if (time < -0.5) {
          timeDir = true;
        }
      }
      uniforms.slideProgress.value = time;
      // uniforms.slideProgress.value = 1.1;
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    };
    render();

    // resize
    window.addEventListener('resize', () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      if (w > h) {
        uniforms.uvRate.value.x = 1.0;
        uniforms.uvRate.value.y = window.innerHeight / window.innerWidth;
      } else {
        uniforms.uvRate.value.x = window.innerWidth / window.innerHeight;
        uniforms.uvRate.value.y = 1.0;
      }
    });
  }

  render() {
    return (
      <>
        <main className="main sketch--turn-image">
          <div id="canvas"></div>
          <SketchInfoThree title="Turn up Image Demo" />
        </main>
      </>
    );
  }
}
