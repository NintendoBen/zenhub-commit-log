import React, { useEffect, useState, useCallback } from 'react';
import CommitList from '../CommitList';
import FilterToolbar from '../FilterToolbar';
import Sidebar from '../Sidebar';
import getData from '../../data/getData';
import getSampoleGraph from '../../data/getSampleGraph';
import getGraph from '../../data/getGraph';
import normalizeData from '../../data/normalizeData';
import filterCommits from '../../data/filterCommits';
import './App.css';

const App = () => {
  const [, setCommits] = useState({});
  const [, setCommitOrder] = useState([]);
  const [commitList, setCommitList] = useState([]);
  const [filteredCommitList, setFilteredCommitList] = useState([]);
  const [filtering, setFiltering] = useState(false);
  const [graph, setGraph] = useState([]);

  // On load, fetch data
  useEffect(() => {
    getData().then((response) => {
      const normalizedData = normalizeData(response);

      setCommits(normalizedData.entities.commits);
      setCommitOrder(normalizedData.result);
      setCommitList(response);
      setFilteredCommitList(response);

      if (!response) return;

      let graph;
      if (response[0].parents != null) {
        graph = getGraph(response);
      } else {
        graph = getSampoleGraph(response);
      }

      setGraph(graph);
    });
  }, []);

  const filterToolbarOnFilter = useCallback(
    (filter) => {
      const filteredCommits = filterCommits(filter, commitList);

      setFilteredCommitList(filteredCommits);
      setFiltering(filter !== '');
    },
    [commitList]
  );

  return (
    <div className="app">
      <Sidebar />
      <section className="content">
        <FilterToolbar onFilter={filterToolbarOnFilter} />
        <CommitList commits={filteredCommitList} graph={graph} filtering={filtering} />
      </section>
    </div>
  );
};

export default App;
