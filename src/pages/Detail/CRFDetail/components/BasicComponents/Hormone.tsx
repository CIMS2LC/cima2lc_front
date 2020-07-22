import React, { useState } from 'react';
import EditableTable from '@/pages/BasicComponents/EditableTable';
import { Input, InputNumber } from 'antd';

interface HormoneValue {
  name?: string;
  count?: number;
  exist?: number;
}

interface HormoneInputProps {
  value?: HormoneValue;
  onChange?: (value: HormoneValue) => void;
}

const Hormone: React.FC<HormoneInputProps> = ({ value = {}, onChange }) => {
  const [name, setName] = useState('');
  const [count, setCount] = useState(0);
  const [exist, setexist] = useState(0);

  const triggerChange = changedValue => {
    if (onChange) {
      onChange({ name, count, exist, ...value, ...changedValue });
    }
  };
  const onNameChange = e => {
    triggerChange({ number: e.target.value });
  };
  const onCountChange = e => {
    triggerChange({ count: e.target.value });
  };
  const onExistChange = e => {
    triggerChange({ exist: e.target.value });
  };

  return (
    <EditableTable
      dataColumns={[
        {
          title: '药物名称',
          dataIndex: 'medicine_name',
          width: '20%',
          render: () => <Input />,
        },
        {
          title: '日使用剂量',
          key: 'medicine_count',
          width: '20%',
          render: () => <InputNumber />,
        },
        {
          title: '累积使用时间（月）',
          key: 'exist',
          width: '20%',
          render: () => <InputNumber />,
        },
      ]}
      operColumns={[]}
    />
  );
};

export default Hormone;
