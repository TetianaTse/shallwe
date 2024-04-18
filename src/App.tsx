import React from 'react';
import './App.css';
import Form from './componets/form/Form';
import ImageCrop from './componets/upload/ImageCrop';

function App() {
  return (
    <div className="App">
      <Form />
      <div className='crop'>
          <ImageCrop />
      </div>
    </div>
  );
}

export default App;
