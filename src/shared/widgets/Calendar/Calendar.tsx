import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar as RBCalendar, dateFnsLocalizer, Views, type View, type NavigateAction } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import type { CSSProperties } from 'react';

export type CalendarActions = 'NEXT' | 'PREV' | 'TODAY' | 'DATE';

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
    view?: keyof typeof Views;
    date?: Date;
    onView?: (view: keyof typeof Views) => void;
    onNavigate?: (date: Date, view: keyof typeof Views, action: CalendarActions) => void;
    views?: Array<keyof typeof Views>;
    toolbar?: boolean;
    onSelectEvent?: (event: AppCalendarEvent) => void;
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
        onSelectEvent,
        onSelectSlot,
        selectable = true,
        style,
        className
    } = props;

    const enabledViews = (views && views.length > 0
        ? views.map((v) => Views[v])
        : [Views.MONTH, Views.WEEK, Views.DAY]);

    const getCurrentViewKey = (v: string): keyof typeof Views => {
        const entry = Object.entries(Views).find(([, value]) => value === v);
        return (entry ? (entry[0] as keyof typeof Views) : 'MONTH');
    };

    const onViewHelper = (v: string) => {
        onView?.(getCurrentViewKey(v))
    }

    const onNavigateHelper = (newDate: Date, v: View, action: NavigateAction) => {
        onNavigate?.(newDate, getCurrentViewKey(v as string), action as CalendarActions)
    }

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
            onView={onViewHelper}
            onNavigate={onNavigateHelper}
            views={enabledViews}
            toolbar={toolbar}
            onSelectEvent={onSelectEvent as unknown as (event: object) => void}
            onSelectSlot={onSelectSlot as unknown as (slotInfo: object) => void}
            selectable={selectable}
            style={style}
            className={className}
        />
    );
}