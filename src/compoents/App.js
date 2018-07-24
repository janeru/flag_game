import React from 'react';
import '../compoents/css/App.css';
import NationOption from '../compoents/NationOption';
import Header from '../compoents/header';

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