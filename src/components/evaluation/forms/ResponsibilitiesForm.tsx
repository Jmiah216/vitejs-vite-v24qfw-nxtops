interface Props {
  value: string[];
  onChange: (responsibilities: string[]) => void;
}

export function ResponsibilitiesForm({ value, onChange }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Job Responsibilities</label>
      <p className="text-sm text-gray-500 mb-2">
        Summarize your primary duties and responsibilities. Enter each one on a new line.
      </p>
      <textarea
        value={value.join('\n')}
        onChange={(e) => onChange(e.target.value.split('\n').filter(r => r.trim()))}
        rows={4}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        placeholder="Example:&#10;- Managed network infrastructure&#10;- Led technical training sessions&#10;- Implemented security protocols"
        required
      />
    </div>
  );
}