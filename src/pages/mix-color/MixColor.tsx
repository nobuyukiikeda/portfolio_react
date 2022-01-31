import React from 'react';
import './mixColor.scss';
import logoPixijs from '../../assets/img/sketch/logo_pixijs.png';

export default class MixColor extends React.Component {
  render() {
    return (
      <>
        <main className="main sketch--mixcolor">
          <div id="canvasContainer"></div>
          <div className="sketch-info">
            <div className="sketch-info__back">
              <a href="../"></a>
            </div>
            <div className="sketch-info__title">
              <h1>Mix Color Demo</h1>
              <div className="sketch-info__logo sketch-info__logo--pixi">
                <img src={logoPixijs} alt="PIXI.js" width="198" height="66" />
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}
