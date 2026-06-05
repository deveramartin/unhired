import HistoryView from '@/components/HistoryView';
import { RoastRecord } from '@/types/types';
import { INITIAL_HISTORY } from '@/utils/roasts';

interface HistoryPageProps {
  historyList?: RoastRecord[];
  onRemoveRecord?: (id: string) => void;
}

export default function HistoryPage({ 
  historyList = INITIAL_HISTORY, 
  onRemoveRecord = () => {} 
}: HistoryPageProps) {
  return (
    <HistoryView 
      historyList={historyList} 
      onRemoveRecord={onRemoveRecord} 
    />
  );
}
