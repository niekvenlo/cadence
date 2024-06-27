"use client";

import BasicLink from "./basic/BasicLink";

export default function AppHeader() {
  return (
    <header id="app-header">
      <h1>Cadence</h1>
      <div className="links">
        <BasicLink href="/">Home</BasicLink>
        <BasicLink href="/chinese">读中文</BasicLink>
      </div>
    </header>
  );
}
