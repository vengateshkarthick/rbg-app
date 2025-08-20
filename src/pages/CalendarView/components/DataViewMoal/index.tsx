import { parse, format } from 'date-fns';
import Modal from '../../../../shared/widgets/Modal';
import { BarGraph } from '../../../../shared/widgets/Chart';

export interface DataViewModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedDateKey: string | null;
  labels: string[];
  values: number[];
}

export default function DataViewModal({ isOpen, onRequestClose, selectedDateKey, labels, values }: DataViewModalProps) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Data Visualization">
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
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
}