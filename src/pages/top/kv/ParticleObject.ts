import * as THREE from 'three';
import { IUniform } from 'three';
import particleObjectVertices from './glsl/particleObject.vs?raw';
import particleObjectFragment from './glsl/particleObject.fs?raw';
import particleObjectWireFragment from './glsl/particleObjectWire.fs?raw';

export default class ParticleObject {
  uniforms: { [uniform: string]: IUniform } = {
    time: { value: -0.1 },
    init: { value: 0.0 },
  };
  judge = false;
  time = 0;
  obj?: THREE.Mesh;
  wireObj?: THREE.Mesh;

  createMesh() {
    const geometry = new THREE.BufferGeometry();
    const icosahedronGeometry = new THREE.IcosahedronBufferGeometry(270, 4);

    const triangleCenters = [];
    let triangleCenter = [0, 0, 0];

    const triangleRandoms = [];
    let triangleRandom = [0, 0, 0];
    const ga = icosahedronGeometry.attributes.position.array;
    for (let i = 0; i < ga.length; i++) {
      if (i % 3 == 0) {
        triangleCenter = [
          (ga[i] + ga[i + 3] + ga[i + 6]) / 3,
          (ga[i + 1] + ga[i + 4] + ga[i + 7]) / 3,
          (ga[i + 2] + ga[i + 5] + ga[i + 8]) / 3,
        ];
        triangleRandom = [Math.random(), Math.random(), Math.random()];
      }
      triangleCenters.push(triangleCenter[0]);
      triangleCenters.push(triangleCenter[1]);
      triangleCenters.push(triangleCenter[2]);
      triangleRandoms.push(triangleRandom[0]);
      triangleRandoms.push(triangleRandom[1]);
      triangleRandoms.push(triangleRandom[2]);
    }

    geometry.setAttribute('position', icosahedronGeometry.attributes.position);
    geometry.setAttribute(
      'random',
      new THREE.Float32BufferAttribute(triangleRandoms, 3)
    );
    geometry.setAttribute(
      'triangleCenter',
      new THREE.Float32BufferAttribute(triangleCenters, 3)
    );

    this.obj = new THREE.Mesh(
      geometry,
      new THREE.RawShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: particleObjectVertices,
        fragmentShader: particleObjectFragment,
        depthWrite: false,
        transparent: true,
        side: THREE.DoubleSide,
      })
    );
    this.wireObj = new THREE.Mesh(
      geometry,
      new THREE.RawShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: particleObjectVertices,
        fragmentShader: particleObjectWireFragment,
        depthWrite: false,
        transparent: true,
        side: THREE.DoubleSide,
        wireframe: true,
      })
    );
  }

  render() {
    if (this.judge == true) {
      this.uniforms.time.value += 0.003;
    }
  }

  loaded() {
    this.judge = true;
    this.uniforms.init.value = 1.0;
  }
}
