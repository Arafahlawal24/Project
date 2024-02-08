import Button from '@material-ui/core/Button';

interface Props {
  text: string;
  onClick: () => void;
}

export default function AppButton({ text, onClick }: Props) {
  return (
    <Button 
      variant="contained"
      color="primary"
      onClick={onClick}
    >
      {text}
    </Button>  
  );
}