import React from 'react';
import './about.scss';

export default class About extends React.Component {
  render() {
    return (
      <section className="l-section">
        <div className="about">
          <div className="l-content-width">
            <div className="about__skill-content">
              <h2 className="c-common-title">About me</h2>
              <div className="about-skill-text">
                <h3 className="sub-title c-font-primary">skill</h3>
                <ul className="skill-list">
                  <li className="c-font-primary skill-item">
                    <div className="skill-item__title">FrontEnd</div>
                    <div>
                      TypeScript / Vue.js / Angular / React / three.js / D3.js /
                      Nuxt.js
                    </div>
                  </li>
                  <li className="c-font-primary skill-item">
                    <div className="skill-item__title">BackEnd</div>
                    <div>
                      Java / Spring Framework / Node.js / Koa / PHP / WordPress
                      / Golang / PostgreSQL / MySql
                    </div>
                  </li>
                  <li className="c-font-primary skill-item">
                    <div className="skill-item__title">WebDesign</div>
                    <div>HTML5 / pug / CSS3 / SCSS</div>
                  </li>
                  <li className="c-font-primary skill-item">
                    <div className="skill-item__title">Tools</div>
                    <div>webpack / Vite / gulp / Git / svn</div>
                  </li>
                  <li className="c-font-primary skill-item">
                    <div className="skill-item__title">DesignTools</div>
                    <div>
                      AdobeXD / Photoshop / Illustrator / Sketch / Figma
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
