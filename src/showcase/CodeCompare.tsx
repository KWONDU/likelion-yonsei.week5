interface CodeCompareProps {
  title: string;
  description?: string;
  before: { label: string; filename: string; code: string };
  after: { label: string; filename: string; code: string };
}

export default function CodeCompare({ title, description, before, after }: CodeCompareProps) {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
      {description && <p className="text-gray-500 text-sm mb-4">{description}</p>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded">
              {before.label}
            </span>
            <span className="text-gray-400 text-xs font-mono">{before.filename}</span>
          </div>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto leading-relaxed">
            <code>{before.code}</code>
          </pre>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded">
              {after.label}
            </span>
            <span className="text-gray-400 text-xs font-mono">{after.filename}</span>
          </div>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto leading-relaxed">
            <code>{after.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
