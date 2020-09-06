import React from 'react';
import './Sidebar.css';

const Sidebar = () => (
  <aside className="sidebar">
    <h1>organization/repository</h1>

    <h2>Local Branches</h2>
    <ul>
      <li className="sidebar-li-selected">dev</li>
      <li>master</li>
      <li>feature/test</li>
      <li>feature/test2</li>
    </ul>

    <h2>Remote Branches</h2>
    <ul>
      <li className="sidebar-li-parent">
        origin
        <ul>
          <li>dev</li>
          <li>master</li>
          <li>feature/test</li>
          <li>feature/test2</li>
        </ul>
      </li>
    </ul>
  </aside>
);

export default Sidebar;
