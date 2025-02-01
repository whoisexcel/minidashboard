import { useState, useEffect } from 'react';

interface DebouncedInputProps {
  value: string;
  onChange: (value: string) => void;
  delay?: number;
  placeholder?: string;
}

const DebouncedInput: React.FC<DebouncedInputProps> = ({ value, onChange, delay = 500, placeholder }) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      className="p-2 w-full max-w-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
      value={debouncedValue}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

export default DebouncedInput;
