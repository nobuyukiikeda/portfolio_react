import React from 'react';
import './sketchInfo.scss';
import logoPixijs from '../../assets/img/sketch/logo_pixijs.png';
import history from '../../history';

export default class SketchInfoThree extends React.Component<{
  title: String;
}> {
  render() {
    return (
      <div className="sketch-info">
        <div className="sketch-info__back">
          <a onClick={history.back}></a>
        </div>
        <div className="sketch-info__title">
          <h1>{this.props.title}</h1>
          <div className="sketch-info__logo sketch-info__logo--three">
            <p>three.js</p>
          </div>
        </div>
      </div>
    );
  }
}
