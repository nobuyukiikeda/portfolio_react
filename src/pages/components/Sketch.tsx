import React from 'react';

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
                  <a className="sketch-item__img ishadow" href="./gallery/">
                    <img
                      src="img/gallery.jpg"
                      data-blur="20"
                      alt="Art gallery"
                    />
                    <div className="image-shadow"></div>
                  </a>
                  <p className="sketch-item__title">Art Gallery</p>
                </li>
                <li className="sketch-item">
                  <a className="sketch-item__img ishadow" href="./turnImage/">
                    <img
                      src="img/turnImage.jpg"
                      data-blur="20"
                      alt="turn image demo"
                    />
                    <div className="image-shadow"></div>
                  </a>
                  <p className="sketch-item__title">turn image demo</p>
                </li>
                <li className="sketch-item">
                  <a className="sketch-item__img ishadow" href="./mixColor/">
                    <img
                      src="img/mixColor.jpg"
                      data-blur="20"
                      alt="mix color tool"
                    />
                    <div className="image-shadow"></div>
                  </a>
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
