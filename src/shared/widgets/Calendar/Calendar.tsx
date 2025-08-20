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
    // Controlled view/date & navigation
    view?: keyof typeof Views;
    date?: Date;
    onView?: (view: keyof typeof Views) => void;
    onNavigate?: (date: Date, view: keyof typeof Views, action: 'NEXT' | 'PREV' | 'TODAY' | 'DATE') => void;
    views?: Array<keyof typeof Views>;
    toolbar?: boolean;
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
        view,
        date,
        onView,
        onNavigate,
        views,
        toolbar = true,
        handleSelectEvent,
        onSelectSlot,
        selectable = true,
        style,
        className
    } = props;

    const viewsToUse = (views && views.length > 0
        ? views.map((v) => Views[v])
        : [Views.MONTH, Views.WEEK, Views.DAY]);

    const toKeyOfViews = (v: string): keyof typeof Views => {
        const entry = Object.entries(Views).find(([, value]) => value === v);
        return (entry ? (entry[0] as keyof typeof Views) : 'MONTH');
    };

    return (
        <RBCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultDate={defaultDate ?? new Date()}
            defaultView={Views[defaultView]}
            view={view ? Views[view] : undefined}
            date={date}
            onView={onView ? ((v) => onView(toKeyOfViews(v as string))) : undefined}
            onNavigate={onNavigate ? ((newDate, v, action) => onNavigate(newDate, toKeyOfViews(v as string), action as 'NEXT' | 'PREV' | 'TODAY' | 'DATE')) : undefined}
            views={viewsToUse}
            toolbar={toolbar}
            onSelectEvent={handleSelectEvent as unknown as (event: object) => void}
            onSelectSlot={onSelectSlot as unknown as (slotInfo: object) => void}
            selectable={selectable}
            style={style}
            className={className}
        />
    );
}