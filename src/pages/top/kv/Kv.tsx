import React from 'react';
import './kv.scss';

export default class Kv extends React.Component {
  render() {
    return (
      <section className="l-section l-section--home">
        <div className="hero">
          <div className="kv"></div>
          <div className="kv__canvas"></div>
          <div className="scroll-icon">
            <span></span>
          </div>
          <div className="catch">
            <h1>This is my portfolio site</h1>
            <h2>Nobuyuki Ikeda</h2>
            <p>web developer</p>
          </div>
        </div>
      </section>
    );
  }
}
