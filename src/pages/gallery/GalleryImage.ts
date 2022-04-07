import * as THREE from 'three';
import { MeshBasicMaterial } from 'three';
import CanvasUtil from '../../utils/CanvasUtil';

export class GalleryImage {
  id: number;
  imageNumber: string;
  obj;
  frame;
  bg;
  rad;
  objX;
  objZ;
  frameX;
  frameZ;
  bgX;
  bgZ;

  constructor(
    id: number,
    map: THREE.Texture,
    imageGeometry: THREE.PlaneBufferGeometry,
    frameGeometry: THREE.PlaneBufferGeometry,
    frameMaterial: THREE.MeshBasicMaterial,
    bgGeometry: THREE.PlaneGeometry,
    bgMaterial: MeshBasicMaterial,
    imageOffset: number,
    numRowImages: number,
    rowScale: number
  ) {
    this.id = id;
    this.imageNumber = String(Math.min(id + 1, 24)).padStart(2, '0');

    const imageMaterial = new THREE.MeshBasicMaterial({
      map,
      // alphaMap: loader.load('../../../img/gallery/image01_alphamap.jpg'),
      transparent: true,
    });
    this.obj = new THREE.Mesh(imageGeometry, imageMaterial);
    this.frame = new THREE.Mesh(frameGeometry, frameMaterial);
    this.bg = new THREE.Mesh(bgGeometry, bgMaterial);

    this.rad = CanvasUtil.fraction((this.id + imageOffset) / numRowImages);
    this.objX = Math.sin(this.rad * 2 * Math.PI) * rowScale;
    this.objZ = Math.cos(this.rad * 2 * Math.PI) * rowScale;
    this.frameX = Math.sin(this.rad * 2 * Math.PI) * (rowScale + 0.01);
    this.frameZ = Math.cos(this.rad * 2 * Math.PI) * (rowScale + 0.01);
    this.bgX = Math.sin(this.rad * 2 * Math.PI) * (rowScale + 0.02);
    this.bgZ = Math.cos(this.rad * 2 * Math.PI) * (rowScale + 0.02);
    this.obj.position.set(this.objX, 0, this.objZ);
    this.frame.position.set(this.frameX, 0, this.frameZ);
    this.bg.position.set(this.bgX, 0, this.bgZ);
    this.obj.lookAt(0, 0, 0);
    this.frame.lookAt(0, 0, 0);
    this.bg.lookAt(0, 0, 0);
  }
}
