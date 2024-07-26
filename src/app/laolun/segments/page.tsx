"use client";

import "../style.css";

import { getSegmentsRarity } from "../phrase-util-sync";
import { useState } from "react";

export default function Chinese() {
  const [sortBy, setSortBy] = useState("totalCount");
  const [asc, setAsc] = useState(false);
  const toggleAsc = (column) => {
    setAsc((asc) => {
      if (sortBy === column) {
        return !asc;
      }
      return false;
    });
    setSortBy(column);
    console.log(column, sortBy);
  };

  const columnNames = {
    segment: "Segment",
    baseCount: "Base count",
    appearsInOtherEntriesCount: "In other segments",
    totalCount: "Total count",
    length: "Length",
  };

  return (
    <main id="zhongwen">
      <div id="segments-page">
        Sorted by &quot;{columnNames[sortBy] ?? "[unknown]"}&quot;,{" "}
        {asc ? "Ascending" : "Descending"}
        <table>
          <thead>
            <tr>
              {Object.entries(columnNames).map(([key, value]) => (
                <th key={key} onClick={() => toggleAsc(key)}>
                  {value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getSegmentsRarity()
              .sort((a, b) =>
                a[sortBy] < b[sortBy] ? (asc ? 1 : -1) : asc ? -1 : 1
              )
              .map((s) => (
                <tr key={s.segment}>
                  <td>{s.segment}</td>
                  <td>{s.baseCount}</td>
                  <td>{s.appearsInOtherEntriesCount}</td>
                  <td>{s.totalCount}</td>
                  <td>{s.length}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
