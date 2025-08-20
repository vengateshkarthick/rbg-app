import { format, parse } from 'date-fns';
import Calendar from '../../shared/widgets/Calendar';
import Modal from '../../shared/widgets/Modal';
import { BarGraph } from '../../shared/widgets/Chart';

export interface CalendarViewProps {
  events: Parameters<typeof Calendar>[0]['events'];
  activeView: 'MONTH' | 'WEEK' | 'DAY' | 'AGENDA';
  currentDate: Date;
  onView: (v: 'MONTH' | 'WEEK' | 'DAY' | 'AGENDA' | 'WORK_WEEK') => void;
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
        <button onClick={onToday}>Today</button>
        <button onClick={() => onView('MONTH')}>Month</button>
        <button onClick={() => onView('WEEK')}>Week</button>
        <button onClick={() => onView('DAY')}>Day</button>
        <button onClick={() => onView('AGENDA')}>Agenda</button>
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
