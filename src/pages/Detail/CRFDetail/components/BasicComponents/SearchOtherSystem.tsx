import React from 'react';
import { Modal, Card } from 'antd';

interface PatientProps {
  id: number;
  age: number;
  gender: string;
  hospitalNumber: string;
  idNumber: string;
  name: string;
  phoneNumber: string;
  patDia: string;
}
interface SearchOtherSystemProps {
  modalVisible: boolean;
  onCancel: () => void;
  children: [PatientProps];
  passData: (args: PatientProps) => void;
}

const SearchOtherSystem: React.FC<SearchOtherSystemProps> = props => {
  const { modalVisible, onCancel, children, passData } = props;

  return (
    <Modal
      destroyOnClose
      title="人员选择"
      visible={modalVisible}
      onCancel={onCancel}
      footer={null}
    >
      <Card title="人员列表">
        {props.children.map(item => (
          <Card.Grid
            key={item.id}
            style={{
              width: '100%',
              textAlign: 'left',
            }}
            onClick={async () => {
              await passData(item);
              onCancel();
            }}
          >
            <p>住院号：{item.hospitalNumber}</p>
            <p>身份证号：{item.idNumber}</p>
            <p>姓名：{item.name}</p>
          </Card.Grid>
        ))}
      </Card>
    </Modal>
  );
};

export default SearchOtherSystem;
