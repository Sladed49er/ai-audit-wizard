import { Controller, Control } from 'react-hook-form';

interface Props {
  label: string;
  name: string;
  options: string[];
  control: Control<any>;
  extraInput?: string;
}

export default function MultiCheckbox({ label, name, options, control, extraInput }: Props) {
  return (
    <div className="my-6">
      <p className="mb-2 font-medium text-sm uppercase tracking-wide">{label}</p>
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 text-sm">
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  value={opt}
                  checked={field.value?.includes(opt) ?? false}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const current: string[] = field.value ?? [];
                    field.onChange(checked ? [...current, opt] : current.filter((x) => x !== opt));
                  }}
                />
              )}
            />
            {opt}
          </label>
        ))}
      </div>
      {extraInput && (
        <Controller
          name={`${name}Other`}
          control={control}
          render={({ field }) => (
            <input
              type="text"
              placeholder={extraInput}
              className="mt-3 w-full rounded border px-3 py-1 text-sm"
              {...field}
            />
          )}
        />
      )}
    </div>
  );
}
