'use client';
import { UseFormRegister } from 'react-hook-form';

interface Props {
  label:    string;
  name:     string;
  items:    string[];
  register: UseFormRegister<any>;
}

export default function MultiCheckbox({ label, name, items, register }: Props) {
  return (
    <fieldset className="space-y-2">
      <legend className="font-medium">{label}</legend>

      {items.map(item => (
        <label key={item} className="flex items-center space-x-2">
          <input
            type="checkbox"
            value={item}
            {...register(name)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600"
          />
          <span>{item}</span>
        </label>
      ))}
    </fieldset>
  );
}
