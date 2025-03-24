"use client";

import { useState } from "react";
import Checkbox from "./Checkbox";
import { sampleData } from "@/constants/sampleData";

const DataGrid = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Check if all rows are selected
  const isAllSelected = selectedRows.length === sampleData.length;

  // Check if some rows are selected for intermediate state
  const isSomeSelected =
    selectedRows.length > 0 && selectedRows.length < sampleData.length;

  // Check if some row is selected and all selected rows are "available" to enable download button
  const canDownload = selectedRows.length && selectedRows.every(
    (id) => sampleData.find((row, ind) => ind === id)?.status === "available"
  );

  // Onchange function for select all checkbox
  const handleSelectAll = () => {
    if (isSomeSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(sampleData.map((row, ind) => ind));
    }
  };

  // Onchange function for row checkboxes
  const handleRowSelect = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleDownload = () => {
    const selectedData = sampleData.filter((row, ind) =>
      selectedRows.includes(ind)
    );
    alert(JSON.stringify(selectedData, null, 2));
  };

  return (
    <div className="table-container">
      <h2 className="table-header">Datagrid</h2>

      <div className="checkbox-container mb-3">
        <Checkbox
          checked={isAllSelected}
          indeterminate={isSomeSelected}
          onChange={handleSelectAll}
        />
        <span className="checkbox-label">
          {selectedRows.length > 0
            ? `${selectedRows.length} Selected`
            : "None Selected"}
        </span>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Name</th>
              <th>Device</th>
              <th>Path</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((row, ind) => (
              <tr key={ind}>
                <td>
                  <Checkbox
                    checked={selectedRows.includes(ind)}
                    onChange={() => handleRowSelect(ind)}
                  />
                </td>
                <td>{row.name}</td>
                <td>{row.device}</td>
                <td>{row.path}</td>
                <td
                  className={
                    row.status === "available"
                      ? "status-available"
                      : "status-unavailable"
                  }
                >
                  {row.status === "available" && (
                    <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>
                  )}
                  {row.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        className={`download-btn ${canDownload ? "enabled" : "disabled"}`}
        disabled={!canDownload}
        onClick={handleDownload}
      >
        Download Selected
      </button>
    </div>
  );
};

export default DataGrid;
