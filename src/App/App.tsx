import React from 'react';
import { Outlet } from 'react-router';
import Header from 'App/components/Header';
import './App.module.scss';

export default function App() {
  return (
    <div className="app">
      <Header></Header>
      <main className="main">
        <Outlet></Outlet>
      </main>
    </div>
  );
}
