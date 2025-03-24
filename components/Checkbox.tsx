import { useEffect, useRef } from "react";

interface CheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
}

const Checkbox = ({ checked, indeterminate, onChange }: CheckboxProps) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  // To set the checkbox state to indeterminate. We can only set the indeterminate state using JS
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate ?? false;
    }
  }, [indeterminate]);

  return (
    <input
      ref={checkboxRef}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 cursor-pointer"
    />
  );
};

export default Checkbox;
