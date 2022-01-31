import React from 'react';
import './sketch.scss';
import gallery from '../../../assets/img/top/gallery.jpg';
import turnImage from '../../../assets/img/top/turnImage.jpg';
import mixColor from '../../../assets/img/top/mixColor.jpg';
import { Link } from 'react-router-dom';

export default class Sketch extends React.Component {
  render() {
    return (
      <section className="l-section">
        <div className="sketch">
          <div className="l-content-width">
            <h2 className="c-common-title sketch__title">sketch</h2>
            <div className="sketch-content">
              <ul className="sketch-list">
                <li className="sketch-item">
                  <Link className="sketch-item__img" to="/gallery">
                    <img src={gallery} data-blur="20" alt="Art gallery" />
                    <div className="image-shadow"></div>
                  </Link>
                  <p className="sketch-item__title">Art Gallery</p>
                </li>
                <li className="sketch-item">
                  <Link className="sketch-item__img" to="/turn-image">
                    <img src={turnImage} data-blur="20" alt="turn image demo" />
                    <div className="image-shadow"></div>
                  </Link>
                  <p className="sketch-item__title">turn image demo</p>
                </li>
                <li className="sketch-item">
                  <Link className="sketch-item__img" to="/mix-color">
                    <img src={mixColor} data-blur="20" alt="mix color tool" />
                    <div className="image-shadow"></div>
                  </Link>
                  <p className="sketch-item__title">mix color project</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
