interface NewFileProps {
  filename: string;
  description: string;
  code: string;
}

export default function NewFile({ filename, description, code }: NewFileProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded">
          NEW FILE
        </span>
        <span className="text-gray-400 text-xs font-mono">{filename}</span>
      </div>
      <p className="text-gray-500 text-sm mb-3">{description}</p>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
