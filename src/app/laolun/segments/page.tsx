"use client";

import "../style.css";

import { getSegmentsRarity } from "../phrase-util-sync";
import { useState } from "react";
import useLaolunQuery from "../../api/useLaolunQuery";

export default function Chinese() {
  const laolunQuery = useLaolunQuery();
  const phrases = laolunQuery.data?.phrases ?? [];
  const pinyin = laolunQuery.data?.pinyin ?? {};
  const [sortBy, setSortBy] = useState("totalCount");
  const [isAsc, setIsAsc] = useState(false);
  const toggleAsc = (column) => {
    setIsAsc((asc) => {
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

  const sortRarity = (a, b) => {
    const asc = () => (isAsc ? 1 : -1);
    if (a[sortBy] === b[sortBy]) {
      if (a.length < b.length) {
        return asc();
      } else {
        return -asc();
      }
    }
    if (a[sortBy] < b[sortBy]) {
      return asc();
    }
    return -asc();
  };

  return (
    <main id="zhongwen">
      <div id="segments-page">
        Sorted by &quot;{columnNames[sortBy] ?? "[unknown]"}&quot;,{" "}
        {isAsc ? "Ascending" : "Descending"}
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
            {getSegmentsRarity(phrases)
              .sort(sortRarity)
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
