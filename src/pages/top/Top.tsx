import React from 'react';
import About from './about/About';
import Kv from './kv/Kv';
import Sketch from './sketch/Sketch';
import './top.scss';

type State = {
  loaderOpacity: number;
  loaderDisplay: 'block' | 'none';
};

export default class Top extends React.Component<{}, State> {
  state: State = {
    loaderOpacity: 1,
    loaderDisplay: 'block',
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
    }, 400);
  }

  render() {
    return (
      <>
        <div className="loader" style={this.loaderStyle}>
          <p>Now loading...</p>
        </div>
        <header />
        <main>
          <Kv />
          <About />
          <Sketch />
        </main>
        <footer className="footer">
          <p className="copyright c-font-primary">&copy;Nobuyuki Ikeda</p>
        </footer>
      </>
    );
  }
}
