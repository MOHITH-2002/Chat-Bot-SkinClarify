"use client"
import React, { useState } from 'react';

export const TextModel= () => {
  const [inputText, setInputText] = useState('');
  const [prediction, setPrediction] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send the input to the Flask API
    const response = await fetch('http://localhost:5000/text-predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: inputText }),
    });

    const data = await response.json();
    setPrediction(data.predicted_condition);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Skin Condition Predictor</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Describe your skin condition symptoms:
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
          />
        </label>
        <button type="submit" style={{ marginLeft: '10px', padding: '5px 10px' }}>Predict</button>
      </form>

      {prediction && (
        <div style={{ marginTop: '20px' }}>
          <h2>Predicted Condition:</h2>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
};

