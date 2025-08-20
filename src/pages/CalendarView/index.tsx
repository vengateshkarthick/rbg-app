import { format, parse } from 'date-fns';
import Calendar from '../../shared/widgets/Calendar';
import Modal from '../../shared/widgets/Modal';
import { BarGraph } from '../../shared/widgets/Chart';
import Button from '../../shared/widgets/Button';
import { Views } from './constant';

export interface CalendarViewProps {
  events: Parameters<typeof Calendar>[0]['events'];
  activeView: `${typeof Views[keyof typeof Views]}`;
  currentDate: Date;
  onView: (v: `${typeof Views[keyof typeof Views]}` | 'WORK_WEEK') => void;
  onNavigate: (date: Date) => void;
  onToday: () => void;
  handleSelectEvent: Parameters<typeof Calendar>[0]['handleSelectEvent'];
  isModalOpen: boolean;
  closeModal: () => void;
  selectedDateKey: string | null;
  labels: string[];
  values: number[];
}

export default function CalendarView(props: CalendarViewProps) {
  const {
    events,
    activeView,
    currentDate,
    onView,
    onNavigate,
    onToday,
    handleSelectEvent,
    isModalOpen,
    closeModal,
    selectedDateKey,
    labels,
    values
  } = props;

  return (
    <div style={{ padding: 16 }}>
      <h1>Calendar 360</h1>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 12 }}>
        <Button onClick={onToday} variant="outline">Today</Button>
        <Button onClick={() => onView(Views.MONTH)} variant={activeView === Views.MONTH ? 'primary' : 'outline'}>Month</Button>
        <Button onClick={() => onView(Views.WEEK)} variant={activeView === Views.WEEK ? 'primary' : 'outline'}>Week</Button>
        <Button onClick={() => onView(Views.DAY)} variant={activeView === Views.DAY ? 'primary' : 'outline'}>Day</Button>
        <Button onClick={() => onView(Views.AGENDA)} variant={activeView === Views.AGENDA ? 'primary' : 'outline'}>Agenda</Button>
      </div>
      <Calendar
        events={events}
        defaultView="MONTH"
        view={activeView}
        date={currentDate}
        onView={onView}
        onNavigate={onNavigate}
        views={[ 'MONTH', 'WEEK', 'DAY', 'AGENDA' ]}
        handleSelectEvent={handleSelectEvent}
        style={{ height: 500 }}
      />

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Data Visualization">
        <h2>
          {selectedDateKey ? `Data for ${format(parse(selectedDateKey as string, 'dd-MM-yyyy', new Date()), 'dd-MM-yyyy')}` : 'No date selected'}
        </h2>
        {selectedDateKey ? (
          <BarGraph
            labels={labels}
            datasets={[
              {
                label: 'Available dates',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.6)'
              }
            ]}
          />
        ) : (
          <p>No data found for the selected date.</p>
        )}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}
