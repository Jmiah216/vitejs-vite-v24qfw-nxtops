import { Button } from './button';

interface Props {
  onClick: () => void;
}

export function AssessmentButton({ onClick }: Props) {
  return (
    <Button
      onClick={onClick}
      className="bg-military-accent hover:bg-military-accent-dark text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors"
    >
      Start Assessment
    </Button>
  );
}