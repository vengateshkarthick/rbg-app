

## README.md


# Calendar 360

**Calendar 360** is a React application that visualizes date-wise data using **React Big Calendar**. Users can view data on a daily, weekly, or monthly basis. Clicking on a date with data will display a bar graph for that date. If no data is available, a warning message is shown.

---

## Features

- Display data on a date, week, or month-wise basis using **React Big Calendar**.
- Highlight dates with available data.
- Show a popup with a bar graph when a date is clicked.
- Display a warning if no data is available for the selected date.
- Responsive and cross-platform compatible.

---

## Project Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dataviz-calendar.git
   cd dataviz-calendar
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## Dependencies

- [react-big-calendar](https://github.com/jquense/react-big-calendar)
- [react-chartjs-2](https://react-chartjs-2.js.org/)
- [date-fns](https://date-fns.org/)
- [react-modal](https://reactcommunity.org/react-modal/)

---

## Sample Data

The application uses dummy JSON data for demonstration:

```json
{
    "01-09-2025": [
        {"user_1": 1},
        {"user_2": 2},
        {"user_3": 3},
        {"user_4": 4}
    ],
    "02-09-2025": [
        {"user_1": 1},
        {"user_2": 2},
        {"user_3": 3},
        {"user_4": 4}
    ],
    "03-09-2025": [
        {"user_1": 1},
        {"user_2": 2},
        {"user_3": 3},
        {"user_4": 4}
    ]
}
```

---

## Usage

- Navigate the calendar using the toolbar.
- Click on a highlighted date to view the data as a bar graph.
- If no data is available for the selected date, a warning message will appear.

---

## License

MIT
```

---

## package.json

```json
{
  "name": "dataviz-calendar",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "react-big-calendar": "^1.6.9",
    "react-chartjs-2": "^5.2.0",
    "chart.js": "^4.3.0",
    "date-fns": "^2.30.0",
    "react-modal": "^3.16.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

---

## Implementation Notes

### 1. **React Big Calendar Integration**

- Use the `events` prop to display date-wise data.
- Customize the event style to highlight dates with data.

### 2. **Dummy Data Handling**

- Parse the dummy JSON and convert it into the format expected by React Big Calendar.
- For each date, create an event object with the date and a flag indicating data availability.

### 3. **Popup and Bar Graph**

- Use `react-modal` for the popup.
- Use `react-chartjs-2` to render the bar graph for the selected date.

### 4. **No Data Warning** -- **Not Implemented due to JSON Bin issue**--

- Check if the selected date has data. If not, show a warning using an alert or modal.

---

## Example Code Snippets

### Sample Event Object for React Big Calendar

```js
const events = Object.keys(dummyData).map(date => ({
  title: 'Data Available',
  start: new Date(date),
  end: new Date(date),
  allDay: true,
  data: dummyData[date]
}));
```

### Handling Date Click

```js
const handleSelectEvent = (event) => {
  if (event.data) {
    // Show popup with bar graph
  } else {
    alert("No data found for the selected date.");
  }
};
```

---