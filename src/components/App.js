import React from 'react';
import '../components/css/App.css';
import NationOption from '../components/NationOption';
import Header from '../components/header';

const App = () => (
  <div>
    <Header />
    <section>
      <NationOption />
    </section>
    <footer>
      &copy; 2018 <br />
      By Jane
    </footer>
  </div>

)

export default App;