import { Select, DatePicker } from 'antd';

interface Item {
  order: number;
  followup_time: Date;
  response_evaluation: string;
  remark: string;
  image_type: number;
}

interface EditableRowProps {
  index: number;
}

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: string;
  record: Item;
  handleSave: (record: Item) => void;
}

export { EditableRowProps, EditableCellProps };
