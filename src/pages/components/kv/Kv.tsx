import React from 'react';
import './kv.scss';

type State = {
  loaderOpacity: number;
  loaderDisplay: 'block' | 'none';
  kvOpacity: number;
};

export default class Kv extends React.Component<{}, State> {
  state: State = {
    loaderOpacity: 1,
    loaderDisplay: 'block',
    kvOpacity: 0,
  };
  get loaderStyle() {
    return {
      opacity: this.state.loaderOpacity,
      display: this.state.loaderDisplay,
    };
  }

  componentDidMount() {
    this.hideLoading();
  }

  hideLoading() {
    this.setState({
      ...this.state,
      loaderOpacity: 0,
    });
    setTimeout(() => {
      this.setState({
        ...this.state,
        loaderDisplay: 'none',
      });
      this.showKv();
    }, 400);
  }

  showKv() {
    this.setState({
      ...this.state,
      kvOpacity: 1,
    });
  }

  render() {
    return (
      <section className="l-section l-section--home">
        <div className="loader" style={this.loaderStyle}>
          <p>Now loading...</p>
        </div>
        <div className="hero">
          <div className="kv"></div>
          <div className="kv__canvas"></div>
          <div className="scroller" style={{ opacity: this.state.kvOpacity }}>
            <span></span>
          </div>
          <div className="catch" style={{ opacity: this.state.kvOpacity }}>
            <h1>this is my portfolio site</h1>
            <h2>nobuyuki ikeda</h2>
            <p>span web developer</p>
          </div>
        </div>
      </section>
    );
  }
}
