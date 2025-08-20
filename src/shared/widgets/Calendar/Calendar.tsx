import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar as RBCalendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import type { CSSProperties } from 'react';

export interface AppCalendarEvent {
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    resource?: unknown;
}

export interface CalendarProps {
    events: AppCalendarEvent[];
    defaultDate?: Date;
    defaultView?: keyof typeof Views;
    handleSelectEvent?: (event: AppCalendarEvent) => void;
    onSelectSlot?: (selection: { start: Date; end: Date; slots: Date[]; action: string }) => void;
    selectable?: boolean;
    style?: CSSProperties;
    className?: string;
}

const locales = {
    'en-US': enUS
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: (date: Date) => startOfWeek(date, { weekStartsOn: 0 }),
    getDay,
    locales
});

export default function Calendar(props: CalendarProps) {
    const {
        events,
        defaultDate,
        defaultView = 'MONTH',
        handleSelectEvent,
        onSelectSlot,
        selectable = true,
        style,
        className
    } = props;

    return (
        <RBCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultDate={defaultDate ?? new Date()}
            defaultView={Views[defaultView]}
            onSelectEvent={handleSelectEvent as unknown as (event: object) => void}
            onSelectSlot={onSelectSlot as unknown as (slotInfo: object) => void}
            selectable={selectable}
            style={style}
            className={className}
        />
    );
}