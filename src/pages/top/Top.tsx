import React from 'react';
import About from './about/About';
import Kv from './kv/Kv';
import Sketch from './sketch/Sketch';
import './top.scss';

export default class Top extends React.Component {
  render() {
    return (
      <>
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
