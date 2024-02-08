import TextField from '@material-ui/core/TextField';

interface Props {
  label: string;
  value: string;
  onChange: (val: string) => void; 
}

export default function InputField({ label, value, onChange }: Props) {
  return (
    <TextField 
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}