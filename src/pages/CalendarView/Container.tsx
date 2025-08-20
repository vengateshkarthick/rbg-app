import { useEffect, useMemo, useState } from 'react';
import { parse } from 'date-fns';
import type { AppCalendarEvent } from '../../shared/widgets/Calendar';
import { sampleData, Views } from './constant';
import CalendarView, { type CalendarViewProps } from './index';
import { fetchUserEvents } from '../../shared/services/api/calendarview';

type EventsData = typeof sampleData;
type DateKey = keyof EventsData;
type CalendarViewType = `${typeof Views[keyof typeof Views]}`;

export default function CalendarViewContainer() {
  const [selectedDateKey, setSelectedDateKey] = useState<DateKey | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<CalendarViewType>(Views.MONTH);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const [userEvents, setUserEvents] = useState<EventsData>({} as EventsData);

  useEffect(() => {
    if (JSON.stringify(userEvents) === '{}') {
      const fetchEvents = async () => {
        try {
          const data = await fetchUserEvents<EventsData>();
          setUserEvents(data);
        }
        catch (err) {
          console.log(err);
          setUserEvents(sampleData);
        }
      
      };
      fetchEvents();
    }
  },[])

  const events: AppCalendarEvent[] = useMemo(() => {
    return (Object.keys(userEvents) as DateKey[]).map((dateKey) => {
      const date = parse(dateKey as string, 'dd-MM-yyyy', new Date());
      return {
        title: 'Data Available',
        start: date,
        end: date,
        allDay: true,
        resource: { dateKey }
      };
    });
  }, [userEvents]);

  const handleSelectEvent = (event: AppCalendarEvent) => {
    const dateKey = (event.resource as { dateKey?: DateKey } | undefined)?.dateKey ?? null;
    if (dateKey) {
      setSelectedDateKey(dateKey);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const labels = useMemo(() => {
    if (!selectedDateKey) return [] as string[];
    const entries = sampleData[selectedDateKey];
    return entries.map((entry) => Object.keys(entry)[0]);
  }, [selectedDateKey]);

  const values = useMemo(() => {
    if (!selectedDateKey) return [] as number[];
    const entries = sampleData[selectedDateKey];
    return entries.map((entry) => Number(Object.values(entry)[0]));
  }, [selectedDateKey]);

  const props: CalendarViewProps = {
    events,
    activeView,
    currentDate,
    onView: (v) => setActiveView(v as CalendarViewType),
    onNavigate: (date) => setCurrentDate(date),
    onToday: () => setCurrentDate(new Date()),
    handleSelectEvent,
    isModalOpen,
    handleCloseModal,
    selectedDateKey: (selectedDateKey as string | null),
    labels,
    values
  };

  return <CalendarView {...props} />;
}


