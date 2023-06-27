interface InputProps {
  placeholder: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  'data-testid': string
}

export default function Input({
  placeholder,
  onChange,
  'data-testid': testId,
}: InputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      className="mb-4 w-[300px] rounded border border-slate-400 bg-slate-100 p-2"
      data-testid={testId}
    />
  );
}
