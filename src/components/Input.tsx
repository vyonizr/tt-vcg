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
      type='text'
      placeholder={placeholder}
      onChange={onChange}
      className='w-[300px] mb-4 bg-slate-100 border border-slate-400 rounded p-2'
      data-testid={testId}
    />
  )
}
