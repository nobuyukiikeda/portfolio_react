import * as THREE from 'three';
export default class CanvasUtil {
  static loader = new THREE.TextureLoader();

  /**
   * texture読み込みて返します
   * @param src
   * @returns
   */
  static loadTexture(src: string) {
    return CanvasUtil.loader.load(src);
  }

  /**
   * texture読み込みのpromiseを返します
   * @param src
   * @returns
   */
  static loadTextureAsync(src: string) {
    return CanvasUtil.loader.loadAsync(src);
  }

  /**
   * v1とv2を合成した値を返します。
   * @param v1
   * @param v2
   * @param value
   * @returns
   */
  static mixVector(v1: THREE.Vector3, v2: THREE.Vector3, value: number) {
    value = Math.max(0, Math.min(value, 1));
    const v1Value = v1.clone().multiplyScalar(1 - value);
    const v2Value = v2.clone().multiplyScalar(value);
    return v1Value.add(v2Value);
  }

  /**
   * valueをmin,maxの範囲に丸めます
   * @param value
   * @param min
   * @param max
   * @returns
   */
  static clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(value, max));
  }

  /**
   * xの小数部分を返します。
   * @param x
   * @returns
   */
  static fraction(x: number) {
    return x - Math.floor(x);
  }

  /**
   * inputMin,inputMaxのvalueを、outputMin,outputMaxにマッピングします。
   * @param value
   * @param inputMin
   * @param inputMax
   * @param outputMin
   * @param outputMax
   * @param clamp inputMin,inputMaxの範囲外の場合に、outputMin,outputMaxまで丸めるかどうか
   * @returns
   */
  static map(
    value: number,
    inputMin: number,
    inputMax: number,
    outputMin: number,
    outputMax: number,
    clamp: boolean
  ) {
    if (clamp) {
      if (value < inputMin) {
        return outputMin;
      } else if (value > inputMax) {
        return outputMax;
      }
    }
    const p = (outputMax - outputMin) / (inputMax - inputMin);
    return (value - inputMin) * p + outputMin;
  }

  /**
   * x,yをvalueの割合で混ぜます。
   * @param x 0.0~1.0
   * @param y 0.0~1.0
   * @param value
   * @returns
   */
  static mix(x: number, y: number, value: number) {
    value = Math.max(0, Math.min(value, 1));
    return x * (1 - value) + y * value;
  }

  /**
   * min,maxの範囲の整数を返します
   * @param min
   * @param max
   * @returns
   */
  static randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * RGBをHEXの配列にして返します
   * @param rgbCode
   * @returns
   */
  static rgb2Hex(rgbCode: string) {
    const codeNumber = rgbCode.slice(1);
    const red = parseInt(codeNumber.slice(0, 2), 16);
    const green = parseInt(codeNumber.slice(2, 4), 16);
    const blue = parseInt(codeNumber.slice(4, 6), 16);
    return [red, green, blue];
  }
}
