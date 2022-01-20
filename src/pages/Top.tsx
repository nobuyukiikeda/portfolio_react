import React from 'react';
import About from './components/About';
import Kv from './components/Kv';
import Sketch from './components/Sketch';

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
