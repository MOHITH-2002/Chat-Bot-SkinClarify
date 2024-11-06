"use client"
import React, { useState } from 'react';

// Defining the TypeScript types for our expected responses
type Result = {
  error?: string; // To handle error cases
  name?: string;
  description?: string;
  symptoms?: string;
  causes?: string;
  treatment?: string;
  additional_treatment?: string;
}

const Model: React.FC = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [results, setResults] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setResults(null); // Reset results on new submit
    fetch('http://127.0.0.1:8080/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: imageUrl })
    })
    .then(response => response.json())
    .then((data: Result) => {
      setLoading(false);
      if (data.error) {
        setError(data.error);
      } else {
        setResults(data);
      }
    })
    .catch(error => {
      setLoading(false);
      console.error('Error:', error);
      setError('Failed to connect to the server');
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={imageUrl} onChange={handleUrlChange} placeholder="Enter image URL" />
        <button type="submit">Predict</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {results && (
        <div>
          {results.name ? (
            <>
              <h3>Name: {results.name}</h3>
              <p>Description: {results.description}</p>
              <p>Symptoms: {results.symptoms}</p>
              <p>Causes: {results.causes}</p>
              <p>Treatment: {results.treatment}</p>
              {results.additional_treatment && <p>Additional Treatment: {results.additional_treatment}</p>}
            </>
          ) : (
            <p>No human skin detected, unable to predict skin disease.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Model;
