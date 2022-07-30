import React from 'react';
import styles from './App.module.css';
import  MainPage from "./features/pages/MainPage";

function App() {
  return <div className={styles.app}>
    <MainPage />
  </div>;
}

export default App;
