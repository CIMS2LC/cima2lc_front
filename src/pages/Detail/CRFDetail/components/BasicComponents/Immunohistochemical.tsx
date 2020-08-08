import React from 'react';
import { Form, Radio, Button, Input, message, Upload } from 'antd';
import { Immunohisupdate } from '../../service';
import { getCookie } from '@/pages/BasicComponents/request';
import { UploadOutlined } from '@ant-design/icons';

const layout = {
  labelAlign: 'left',
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 8,
  },
};
const immunohistochemical_labels = [
  'ALKD5F3',
  'ALKD5F3N',
  'CAIX',
  'CAM52',
  'CD10',
  'CD34',
  'CD56',
  'CD117',
  'CDX2',
  'CEA',
  'CgA',
  'CK',
  'CK56',
  'CK7',
  'CK818',
  'CK19',
  'CK20',
  'Cyn',
  'DLL3',
  'EMA',
  'ERCC1',
  'LCA',
  'MCM2',
  'NapsinA',
  'P16',
  'P40',
  'p53',
  'P63',
  'PAX2',
  'PAX8',
  'PCK',
  'PDL1',
  'RRM1',
  'SATB2',
  'Syn',
  'TTF1',
  'VEGFC',
  'Villin',
  'Villinco',
];

class Immunohistochemical extends React.Component {
  constructor(props: any) {
    super(props);
    this.pid = props.pid;
    this.initialValues = props.initialValues;
    if (this.initialValues) {
      this.id = this.initialValues['id'];
      this.pid = this.initialValues['pid'] || this.props.pid;

      if (this.initialValues['filePath']) {
        const path_list = (this.initialValues['filePath'] || '')
          .split(',')
          .filter(x => x !== '');
        var index = 0;
        path_list.map(item => {
          const tmp_list = item.split('/');
          const fileName = tmp_list[tmp_list.length - 1];
          console.log(tmp_list);
          this.immDefaultFileList.push({
            uid: `-${index}`,
            name: fileName,
            status: 'done',
            url: `/file/${this.pid}/${fileName}`,
          });
          index += 1;
        });
        console.log(this.immDefaultFileList);
      }
    }
  }
  id = -1;
  pid = -1;
  immDefaultFileList = [];
  state = {
    file_list:
      this.props.initialValues && this.props.initialValues.filePath
        ? this.props.initialValues.filePath
        : [],
  };
  render() {
    return (
      <Form
        name="immunohistochemical"
        {...layout}
        initialValues={this.initialValues}
        onFinish={async values => {
          values.filePath = this.state.file_list.join(',');
          //if (this.id != -1) {
          const res = await Immunohisupdate({
            id: this.id,
            pid: this.props.pid,
            treNum: this.props.treNum,
            ...values,
          });
          if (res.code == 200) {
            message.success('保存成功');
            console.log('更新成功');
          } else {
            message.error('保存失败，' + res.msg);
            console.log('更新失败');
          }
        }}
      >
        {immunohistochemical_labels.map(item => (
          <Form.Item label={item} name={item}>
            <Radio.Group>
              <Radio value={1}>-</Radio>
              <Radio value={2}>±</Radio>
              <Radio value={3}>+</Radio>
              <Radio value={4}>++</Radio>
              <Radio value={5}>+++</Radio>
            </Radio.Group>
          </Form.Item>
        ))}
        <Form.Item label="其他" name="other">
          <Input />
        </Form.Item>
        <Form.Item label="上传" name="filePath">
          <Upload
            name="file[]" //发到后端的文件参数名
            action="/api/upload" //上传的地址
            headers={{
              authorization: 'authorization-text',
              token: getCookie('token'),
            }}
            multiple={true}
            data={{ pid: this.props.pid }}
            defaultFileList={this.immDefaultFileList}
            onChange={info => {
              if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (info.file.status === 'done') {
                console.log(this.state.file_list);
                console.log(info.file.response.path);
                var fileList = this.state.file_list;
                fileList = fileList.concat(info.file.response.path);
                console.log(fileList);
                this.setState({ file_list: fileList });
                message.success(`${info.file.name} file uploaded successfully`);
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            }}
            onRemove={info => {
              var fileList = this.state.file_list.filter(
                x => x.slice(-info.name) !== info.name,
              );
              this.setState({ file_list: fileList });
              console.log(fileList);
            }}
          >
            <Button>
              <UploadOutlined /> 上传报告
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Immunohistochemical;
