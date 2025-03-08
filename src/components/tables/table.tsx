import React from "react";

interface TableProps {
  columns: { header: string; key: string; className?: string }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}

export const Table = ({ columns, renderRow, data }: TableProps) => {
  return (
    <table className="w-full mt-4 text-right" dir="rtl">
      <thead className="bg-gray-100">
        <tr className="text-right text-gray-500 text-sm lg:uppercase">
          {columns.map(({ header, key, className }) => (
            <th key={key} className={`px-4 py-2 ${className}`}>
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data?.length < 1 && (
          <tr>
            <td
              colSpan={columns.length}
              className="text-gray-400 text-base py-4 text-center"
            >
              لا توجد بيانات متاحة
            </td>
          </tr>
        )}

        {data?.length > 0 &&
          data.map((item, id) => renderRow({ ...item, index: id }))}
      </tbody>
    </table>
  );
};
