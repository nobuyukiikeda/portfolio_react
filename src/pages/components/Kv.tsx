import React from 'react';

export default class Kv extends React.Component {
  render() {
    return (
      <section className="l-section l-section--home">
        <div className="hero">
          <div className="kv"></div>
          <div className="kv__canvas"></div>
          <div className="scroller">
            <span></span>
          </div>
          <div className="catch">
            <h1>this is my portfolio site</h1>
            <h2>nobuyuki ikeda</h2>
            <p>span web developer</p>
          </div>
        </div>
      </section>
    );
  }
}
