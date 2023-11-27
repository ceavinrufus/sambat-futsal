'use client'
import React from 'react';
import { RiPencilFill, RiDeleteBinFill } from 'react-icons/ri';

interface TableProps<T> {
  data: T[] | null;
  isContainImage?: boolean;
  ud?: boolean;
  handleUpdateClick?: (row: T) => void;
  handleDeleteClick?: (row: T) => void; // Add delete handler prop
}

const Table = <T extends Record<string, any>>({ data, isContainImage, ud, handleUpdateClick, handleDeleteClick }: TableProps<T>) => {
  if (data === null) {
    return <p>No data available.</p>;
  }

  const columns = Object.keys(data[0]);

  // Function to handle delete action
  const handleDelete = (row: T) => {
    if (handleDeleteClick) {
      handleDeleteClick(row);
    }
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((column) => (
            <th
              key={column}
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {column.replaceAll("_", " ")}
            </th>
          ))}
          {ud && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, columnIndex) => (
              <td
                key={columnIndex}
                className="px-6 py-4 whitespace-nowrap"
              >
                {column.toLowerCase().includes('harga') ? `Rp ${row[column]}` : (
                  column.toLowerCase() === 'lapangan' && isContainImage && typeof row[column] === 'string' ? (
                    <img src={row[column]} alt="Lapangan" className="w-20 h-20 max-w-full" />
                  ) : (
                    row[column]
                  )
                )}
              </td>
            ))}
            {ud && (
              <td className="px-6 py-12 whitespace-nowrap flex gap-4 justify-center">
                {handleUpdateClick && (
                  <RiPencilFill
                    className="cursor-pointer text-blue-500 hover:text-blue-700"
                    onClick={() => handleUpdateClick(row)}
                  />
                )}
                <RiDeleteBinFill
                  className="cursor-pointer text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(row)}
                />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
