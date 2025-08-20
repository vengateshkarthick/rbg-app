import { format, parse } from 'date-fns';
import Calendar from '../../shared/widgets/Calendar';
import DataViewModal from './components/DataViewMoal';
import { Views } from './constant';
import ViewTogglerButton from './components/ViewTogglerButton';

export interface CalendarViewProps {
  events: Parameters<typeof Calendar>[0]['events'];
  activeView: `${typeof Views[keyof typeof Views]}`;
  currentDate: Date;
  onView: (v: `${typeof Views[keyof typeof Views]}` | 'WORK_WEEK') => void;
  onNavigate: (date: Date) => void;
  onToday: () => void;
  handleSelectEvent: Parameters<typeof Calendar>[0]['handleSelectEvent'];
  isModalOpen: boolean;
  handleCloseModal: () => void;
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
    handleCloseModal,
    selectedDateKey,
    labels,
    values
  } = props;

  return (
    <div style={{ padding: 16 }}>
      <h1>Calendar 360</h1>
      <ViewTogglerButton activeView={activeView} onToday={onToday} onView={onView} />
      <Calendar
        events={events}
        defaultView="MONTH"
        view={activeView}
        date={currentDate}
        onView={onView}
        onNavigate={onNavigate}
        views={[ 'MONTH', 'WEEK', 'DAY' ]}
        handleSelectEvent={handleSelectEvent}
        style={{ height: 500 }}
      />
      <DataViewModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        selectedDateKey={selectedDateKey}
        labels={labels}
        values={values}
      />
    </div>
  );
}
