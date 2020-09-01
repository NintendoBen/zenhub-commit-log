import React, { useEffect, useState } from 'react';
import CommitList from '../CommitList';
import FilterToolbar from '../FilterToolbar';
import Sidebar from '../Sidebar';
import getData from '../../data/getData';
import './App.css';

const App = () => {
  const [commits, setCommits] = useState([]);

  // On load, fetch data
  useEffect(() => {
    getData().then((response) => {
      setCommits(response);
    });
  }, []);

  return (
    <div className="app">
      <Sidebar />
      <section className="content">
        <FilterToolbar />
        <CommitList commits={commits} />
      </section>
    </div>
  );
};

export default App;
