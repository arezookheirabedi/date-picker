import './styles/style.scss';
import './App.css';
import React from 'react';
import "src/helpers/prototypes"
import { Form } from './components/form';

const App: React.FC<any> = () => (
  <div className="min-h-screen">
    <Form/>
  </div>
);

export default App;
