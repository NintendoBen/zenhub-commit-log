import React, { useCallback, useState } from 'react';
import Spacer from '../Spacer';
import './FilterToolbar.css';

const FilterToolbar = ({ onFilter }) => {
  const [input, setInput] = useState('');

  const inputOnChange = useCallback((event) => {
    setInput(event.target.value);
  }, []);

  const buttonOnClick = useCallback(() => {
    onFilter(input);
  }, [onFilter, input]);

  return (
    <div className="filter-toolbar">
      <input
        value={input}
        onChange={inputOnChange}
        placeholder="Filter by commit message..."
      />
      <Spacer width={8} />
      <button onClick={buttonOnClick}>Filter</button>
    </div>
  );
};

export default FilterToolbar;
