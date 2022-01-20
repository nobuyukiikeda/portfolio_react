import React from 'react';

export default class About extends React.Component {
  render() {
    return (
      <section className="l-section">
        <div className="about">
          <div className="l-content-width">
            <div className="l-two-column">
              <div
                className="l-two-column__first about__skill-content"
                id="aboutSkillContent"
              >
                <div className="c-text-content c-mask-content is-show">
                  <h2 className="c-common-title">About me</h2>
                  <div className="about-skill-text">
                    <h3 className="c-font-primary">skill</h3>
                    <ul>
                      <li className="c-font-primary">
                        TypeScript / Vue.js / Angular /React
                      </li>
                      <li className="c-font-primary">
                        three.js / D3.js / Nuxt.js
                      </li>
                      <li className="c-font-primary">
                        Node.js / Koa / PHP / WordPress
                      </li>
                      <li className="c-font-primary">
                        Java / Spring Framework / PostgreSQL
                      </li>
                      <li className="c-font-primary">
                        HTML5 / pug / CSS3 / SCSS
                      </li>
                      <li className="c-font-primary">
                        webpack / Vite / gulp / Git / svn
                      </li>
                      <li className="c-font-primary">
                        AdobeXD / Photoshop / Illustrator / Sketch / Figma
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="l-two-column__second skill-data-wrap">
                <div className="skill-data skill-data--code">
                  <div className="skill-title"></div>
                  <ul className="skill-list" id="skillCode">
                    <li className="skill-list__item">
                      <p className="skill-list__title">
                        TypeScript(JavaScript)
                      </p>
                      <div className="skill-list__data">
                        <div className="skill-point" data-point="80"></div>
                      </div>
                    </li>
                    <li className="skill-list__item">
                      <p className="skill-list__title">Vue.js</p>
                      <div className="skill-list__data">
                        <div className="skill-point" data-point="80"></div>
                      </div>
                    </li>
                    <li className="skill-list__item">
                      <p className="skill-list__title">Angular</p>
                      <div className="skill-list__data">
                        <div className="skill-point" data-point="45"></div>
                      </div>
                    </li>
                    <li className="skill-list__item">
                      <p className="skill-list__title">Node.js</p>
                      <div className="skill-list__data">
                        <div className="skill-point" data-point="55"></div>
                      </div>
                    </li>
                    <li className="skill-list__item">
                      <p className="skill-list__title">WordPress</p>
                      <div className="skill-list__data">
                        <div className="skill-point" data-point="55"></div>
                      </div>
                    </li>
                    <li className="skill-list__item">
                      <p className="skill-list__title">HTML/Pug</p>
                      <div className="skill-list__data">
                        <div className="skill-point" data-point="90"></div>
                      </div>
                    </li>
                    <li className="skill-list__item">
                      <p className="skill-list__title">CSS/Sass/SCSS</p>
                      <div className="skill-list__data">
                        <div className="skill-point" data-point="90"></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
