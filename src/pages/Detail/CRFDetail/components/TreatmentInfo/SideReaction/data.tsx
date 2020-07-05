import { DatePicker, Select, Popconfirm, Radio, Rate, Cascader } from 'antd';
import React from 'react';

const options = [
  {
    value: '症状相关副作用',
    label: '症状相关副作用',
    children: [
      {
        value: '发热',
        label: '发热',
      },
      {
        value: '乏力',
        label: '乏力',
      },
      {
        value: '输液反应',
        label: '输液反应',
      },
      {
        value: '口腔溃疡',
        label: '口腔溃疡',
      },
      {
        value: '脱发',
        label: '脱发',
      },
      {
        value: '过敏',
        label: '过敏',
      },
      {
        value: '绝经',
        label: '绝经',
      },
      {
        value: '不育',
        label: '不育',
      },
      {
        value: '静脉炎',
        label: '静脉炎',
      },
      {
        value: '代谢紊乱',
        label: '代谢紊乱',
      },
      {
        value: '局部组织坏死',
        label: '局部组织坏死',
      },
      {
        value: '关节疼痛或僵硬',
        label: '关节疼痛或僵硬',
      },
      {
        value: '皮肤反应（包括皮疹，瘙痒，荨麻疹，发红和干燥，色素沉着）',
        label: '皮肤反应（包括皮疹，瘙痒，荨麻疹，发红和干燥，色素沉着）',
      },
    ],
  },
  {
    value: '消化系统副作用',
    label: '消化系统副作用',
    children: [
      {
        value: '食欲降低',
        label: '食欲降低',
      },
      {
        value: '恶心呕吐',
        label: '恶心呕吐',
      },
      {
        value: '腹痛',
        label: '腹痛',
      },
      {
        value: '腹泻',
        label: '腹泻',
      },
      {
        value: '消化道出血',
        label: '消化道出血',
      },
      {
        value: '肝功能不全',
        label: '肝功能不全',
      },
    ],
  },
  {
    value: '循环系统副作用',
    label: '循环系统副作用',
    children: [
      {
        value: '心肌损伤',
        label: '心肌损伤',
      },
      {
        value: '心率失常',
        label: '心率失常',
      },
      {
        value: '心衰',
        label: '心衰',
      },
    ],
  },
  {
    value: '呼吸系统副作用',
    label: '呼吸系统副作用',
    children: [
      {
        value: '呼吸系统纤维化',
        label: '呼吸系统纤维化',
      },
      {
        value: '肺衰竭',
        label: '肺衰竭',
      },
    ],
  },
  {
    value: '泌尿系统副作用',
    label: '泌尿系统副作用',
    children: [
      {
        value: '血尿',
        label: '血尿',
      },
      {
        value: '出血性膀胱炎',
        label: '出血性膀胱炎',
      },
      {
        value: '肾功能障碍',
        label: '肾功能障碍',
      },
    ],
  },
  {
    value: '免疫治疗相关副作用',
    label: '免疫治疗相关副作用',
    children: [
      {
        value: '肺炎',
        label: '肺炎',
      },
      {
        value: '结肠炎',
        label: '结肠炎',
      },
      {
        value: '肝炎',
        label: '肝炎',
      },
      {
        value: '脑炎',
        label: '脑炎',
      },
      {
        value: '胰腺炎',
        label: '胰腺炎',
      },
      {
        value: '垂体炎',
        label: '垂体炎',
      },
      {
        value: '心肌炎',
        label: '心肌炎',
      },
      {
        value: '肾炎',
        label: '肾炎',
      },
      {
        value: '眼部炎症',
        label: '眼部炎症',
      },
      {
        value: '肌肉溶解综合征',
        label: '肌肉溶解综合征',
      },
      {
        value: '糖尿病酮症酸中毒',
        label: '糖尿病酮症酸中毒',
      },
      {
        value: '甲状腺功能障碍',
        label: '甲状腺功能障碍',
      },
    ],
  },
  {
    value: '放疗相关副作用',
    label: '放疗相关副作用',
    children: [
      {
        value: '放射性食管炎',
        label: '放射性食管炎',
      },
      {
        value: '放射性肺炎',
        label: '放射性肺炎',
      },
      {
        value: '放射性皮肤反应',
        label: '放射性皮肤反应',
      },
      {
        value: '放射性脑病',
        label: '放射性脑病',
      },
      {
        value: '放射性脊髓炎',
        label: '放射性脊髓炎',
      },
      {
        value: '放射性肠炎',
        label: '放射性肠炎',
      },
      {
        value: '放射性膀胱炎',
        label: '放射性膀胱炎',
      },
    ],
  },
  {
    value: '其他副作用',
    label: '其他副作用',
    children: [
      {
        value: '其他',
        label: '其他',
      },
    ],
  },
];
function onChange(value: any) {
  console.log(value);
}

// Just show the latest item.
function displayRender(label: any) {
  return label[label.length - 1];
}
var columns = [
  {
    title: '症状描述',
    dataIndex: 'description',
    width: '10%',
    render: () => (
      <Cascader
        options={options}
        expandTrigger="hover"
        displayRender={displayRender}
        onChange={onChange}
      />
    ),
  },
  {
    title: '分级',
    key: 'grade',
    width: '10%',
    render: () => <Rate count={4} />,
  },
  {
    title: '开始日期',
    key: 'begin_time',
    width: '10%',
    render: () => <DatePicker />,
  },
  {
    title: '目前是否仍存在',
    dataIndex: 'exist',
    width: '10%',
    render: () => (
      <Radio.Group>
        <Radio value={0}>否</Radio>
        <Radio value={1}>是</Radio>
      </Radio.Group>
    ),
  },
  {
    title: '结束日期',
    dataIndex: 'end_time',
    width: '10%',
    render: () => <DatePicker />,
  },
];

export { columns };
