'use client';
import { UseFormRegister } from 'react-hook-form';

interface Props {
  label:    string;
  name:     string;
  items:    string[];
  register: UseFormRegister<any>;
  cols?:    1 | 2 | 3 | 4;     // allowable column counts
}

export default function MultiCheckbox({
  label,
  name,
  items,
  register,
  cols = 1,
}: Props) {
  /* map the numeric prop → valid Tailwind class ------------------ */
  const gridCols =
    cols === 4 ? 'grid-cols-4'
  : cols === 3 ? 'grid-cols-3'
  : cols === 2 ? 'grid-cols-2'
  :               'grid-cols-1';

  return (
    <fieldset className="space-y-2">
      <legend className="font-semibold uppercase tracking-wide text-xs text-gray-600">
        {label}
      </legend>

      <div className={`grid gap-x-8 gap-y-2 ${gridCols}`}>
        {items.map((item) => (
          <label key={item} className="flex items-start space-x-2">
            <input
              type="checkbox"
              value={item}
              {...register(name)}
              className="h-4 w-4 mt-0.5 rounded border-gray-300 text-sky-600"
            />
            <span className="select-none">{item}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
