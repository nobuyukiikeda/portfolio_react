import React from 'react';
import ReactDOM from 'react-dom';
import Top from './pages/top/Top';
import './assets/scss/common.scss';
import {
  unstable_HistoryRouter as HistoryRouter,
  Link,
  Route,
  Routes,
} from 'react-router-dom';
import MixColor from './pages/mix-color/MixColor';
import history from './history';
import TurnImage from './pages/turn-image/TurnImage';
import Gallery from './pages/gallery/Gallery';

ReactDOM.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/mix-color" element={<MixColor />} />
        <Route path="/turn-image" element={<TurnImage />} />
        <Route
          path="*"
          element={
            <main style={{ padding: '2rem', textAlign: 'center' }}>
              <p>There's nothing here!</p>
              <Link to="">Back to top.</Link>
            </main>
          }
        />
      </Routes>
    </HistoryRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
