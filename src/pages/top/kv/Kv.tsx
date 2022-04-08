import React from 'react';
import './kv.scss';
import KvImage from './KvImage';

export default class Kv extends React.Component {
  private kvImage?: KvImage;
  private resizeEvent?: () => void;

  componentDidMount() {
    this.initCanvas();
  }

  componentWillUnmount() {
    // 画面リサイズ時のイベントを破棄します
    if (this.resizeEvent) {
      window.addEventListener('resize', this.resizeEvent);
    }
  }

  private initCanvas() {
    const canvas = document.getElementById('canvas');
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    this.kvImage = new KvImage(canvas, width, height);

    this.kvImage.init();

    // 画面リサイズ時のイベントを登録
    this.resizeEvent = this.kvImage.resetSize.bind(this.kvImage);
    window.addEventListener('resize', this.resizeEvent);
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
