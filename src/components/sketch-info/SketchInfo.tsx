import React from 'react';
import './sketchInfo.scss';
import logoPixijs from '../../assets/img/sketch/logo_pixijs.png';
import history from '../../history';

export default class SketchInfo extends React.Component {
  render() {
    return (
      <div className="sketch-info">
        <div className="sketch-info__back">
          <a onClick={history.back}></a>
        </div>
        <div className="sketch-info__title">
          <h1>Mix Color Demo</h1>
          <div className="sketch-info__logo sketch-info__logo--pixi">
            <img src={logoPixijs} alt="PIXI.js" width="198" height="66" />
          </div>
        </div>
      </div>
    );
  }
}
