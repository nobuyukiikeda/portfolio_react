import React from 'react';
import About from './components/about/About';
import Kv from './components/kv/Kv';
import Sketch from './components/sketch/Sketch';
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
        <footer />
      </>
    );
  }
}
