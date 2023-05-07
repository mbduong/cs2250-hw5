import React, { useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = React.useState([]);
  const [isDataLoaded, setIsDataLoaded] = React.useState(false);

  useEffect(() => {
    const storage = localStorage.getItem("fox");
    if (storage) {
      setItems(storage);
      setIsDataLoaded(true);
    } else {
      fetch("https://randomfox.ca/floof/")
        .then((res) => res.json())
        .then((json) => {
          setItems(json.image);
          setIsDataLoaded(true);
          localStorage.setItem("fox", json.image);
        });
    }
  }, []);

  const handleButtonClick = () => {
    fetch("https://randomfox.ca/floof/")
      .then((res) => res.json())
      .then((json) => {
        setItems(json.image);
        setIsDataLoaded(true);
        localStorage.setItem("fox", json.image);
      });
  }

  if (!isDataLoaded) {
    return (
      <div>
        <h1> Please wait, data is still loading. </h1>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Your fox friend:</h1>
      <button onClick={handleButtonClick} className="button">Click for a new friend!</button>
      <img src={items} width={500} />
    </div>
  );
}

export default App;
