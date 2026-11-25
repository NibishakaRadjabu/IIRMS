import { useLanguage } from "../context/LanguageContext";

export default function CrudTable({ columns, data, onEdit, onDelete, extraActions }) {
  const { translate: tr } = useLanguage();
  if (!data.length) return <p className="text-gray-400 text-center py-8">{tr("No records found.")}</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200 text-sm">
        <thead>
          <tr className="bg-gray-100">
            {columns.map(c => <th key={c.key} className="border p-2 text-left">{tr(c.label)}</th>)}
            <th className="border p-2">{tr("Actions")}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {columns.map(c => (
                <td key={c.key} className="border p-2">
                  {c.render ? c.render(row) : row[c.key] ?? '—'}
                </td>
              ))}
              <td className="border p-2 flex gap-2">
                {onEdit && <button onClick={() => onEdit(row)} className="text-blue-600 hover:underline">{tr("Edit")}</button>}
                {extraActions?.(row)}
                {onDelete && <button onClick={() => onDelete(row)} className="text-red-500 hover:underline">{tr("Delete")}</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
