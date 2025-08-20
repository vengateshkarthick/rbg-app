import Button from '../../../../shared/widgets/Button';
import { Views } from '../../constant';

export interface ViewTogglerButtonProps {
  activeView: `${typeof Views[keyof typeof Views]}`;
  onToday: () => void;
  onView: (view: `${typeof Views[keyof typeof Views]}` | 'WORK_WEEK') => void;
}

export default function ViewTogglerButton({ activeView, onToday, onView }: ViewTogglerButtonProps) {
  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 12 }}>
      <Button onClick={onToday} variant="outline">Today</Button>
      <Button onClick={() => onView(Views.MONTH)} variant={activeView === Views.MONTH ? 'primary' : 'outline'}>Month</Button>
      <Button onClick={() => onView(Views.WEEK)} variant={activeView === Views.WEEK ? 'primary' : 'outline'}>Week</Button>
      <Button onClick={() => onView(Views.DAY)} variant={activeView === Views.DAY ? 'primary' : 'outline'}>Day</Button>
      <Button onClick={() => onView(Views.AGENDA)} variant={activeView === Views.AGENDA ? 'primary' : 'outline'}>Agenda</Button>
    </div>
  );
}