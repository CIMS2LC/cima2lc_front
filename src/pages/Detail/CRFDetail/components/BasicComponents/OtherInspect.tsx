import React from 'react';
import {
  Form,
  Input,
  Button,
  Col,
  Row,
  Radio,
  DatePicker,
  Upload,
  InputNumber,
  Select,
  message,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './table.css';
import moment from 'moment';
import { getCookie } from '@/pages/BasicComponents/request';
import { imageExamsupdate, otherExamsupdate, lungupdate } from '../../service';

// 肺功能
const Lung = {
  'FVC(L)': {
    name: '用力肺活量',
    unit: '',
    key: 'FVC',
  },
  'FEV1/FVC(%)': {
    name: '用力呼气一秒率',
    unit: '',
    key: 'FEV1_FVC',
  },
  'MEF(L/S)': {
    name: '用力呼气中期流速',
    unit: '',
    key: 'MEF',
  },
  'MEF25(L/S)': {
    name: '25%用力呼气流速',
    unit: '',
    key: 'MEF25',
  },
  'MEF50(L/S)': {
    name: '50%用力呼气流速',
    unit: '',
    key: 'MEF50',
  },
  'MEF75(L/S)': {
    name: '75%用力呼气流速',
    unit: '',
    key: 'MEF75',
  },
  'TLC’sb(L)': {
    name: '肺总量',
    unit: '',
    key: 'TLC_sb',
  },
  'RV’(L)': {
    name: '残气容积',
    unit: '',
    key: 'RV',
  },
  'RV’/TLC’(%)': {
    name: '残气容积/肺总量比',
    unit: '',
    key: 'RV_TLC',
  },
  'VC(L)': {
    name: '肺活量',
    unit: '',
    key: 'VC',
  },
  'DLCO-ex (mL/mmHg/Mi)': {
    name: '无需屏气弥散',
    unit: '',
    key: 'DLCO_ex',
  },
  'DLCO-sb (mL/mmHg/Mi)': {
    name: '肺一氧化碳弥散量',
    unit: '',
    key: 'DLCO_sb',
  },
  KCO: {
    name: '比弥散量',
    unit: '',
    key: 'KCO',
  },
};
const exam_method_ops = [
  { value: 'CT' },
  { value: '增强CT' },
  { value: 'MRI' },
  { value: '增强MRI' },
  { value: 'X线' },
  { value: 'B超' },
  { value: '骨扫描' },
  { value: 'PET-CT' },
  { value: '其他' },
];
class OtherInspect extends React.Component {
  constructor(prop: any) {
    super(prop);
    if (this.props.Lung)
      Object.keys(Lung).map(para => {
        this.state[`肺功能_${para}`] = this.props.Lung[
          `${Lung[para]['key']}Mea`
        ];
      });
    if (this.props.OtherExams) {
      if (this.props.OtherExams.ECGDetTime)
        this.props.OtherExams.ECGDetTime = moment(
          this.props.OtherExams.ECGDetTime,
        );
      if (this.props.OtherExams.UCGDetTime)
        this.props.OtherExams.UCGDetTime = moment(
          this.props.OtherExams.UCGDetTime,
        );
    }
    if (this.props.ImageExams) {
      if (this.props.ImageExams.detectTime)
        this.props.ImageExams.detectTime = moment(
          this.props.ImageExams.detectTime,
        );
      if (typeof this.props.ImageExams.exmaMethod === 'string')
        this.props.ImageExams.exmaMethod = this.props.ImageExams.exmaMethod.split(
          ',',
        );
    }
    // console.log(this.state);
  }
  state = {
    evalution: 0,
    肺功能_filePath:
      this.props.Lung && this.props.Lung.filePath
        ? this.props.Lung.filePath.split(',')
        : [],
    UCGFiles:
      this.props.OtherExams && this.props.OtherExams.UCGPath
        ? this.props.OtherExams.UCGPath.split(',')
        : [],
    ECGFiles:
      this.props.OtherExams && this.props.OtherExams.ECGPath
        ? this.props.OtherExams.ECGPath.split(',')
        : [],
    imageFiles:
      this.props.ImageExams && this.props.ImageExams.path
        ? this.props.ImageExams.path.split(',')
        : [],
  };
  render() {
    return (
      <div>
        <hr />
        <div>
          <Row>
            <Col span={24}>
              <h2>肺功能</h2>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col className={'my-col'} span={3}>
              <h3>代码</h3>
            </Col>
            <Col className={'my-col'} span={3}>
              <h3>项目</h3>
            </Col>
            <Col className={'my-col'} span={3}>
              <h3>预计值</h3>
            </Col>
            <Col className={'my-col'} span={3}>
              <h3>最佳值</h3>
            </Col>
            <Col className={'my-col'} span={3}>
              <h3>最佳值/预计值(%)</h3>
            </Col>
            <Col className={'my-col'} span={6}>
              <h3>临床意义判断</h3>
            </Col>
            <Col className={'my-col'} span={3}>
              <h3>备注</h3>
            </Col>
          </Row>
          <Form
            name="Lung"
            initialValues={this.props.Lung}
            labelCol={{
              span: 2,
            }}
            wrapperCol={{
              span: 24,
            }}
            onFinish={async e => {
              Object.keys(Lung).map(para => {
                e[`${Lung[para]['key']}Mea`] = this.state[`肺功能_${para}`];
              });
              e.pid = this.props.pid;
              e.treNum = this.props.treNum;
              const id_key = 'Lung_id';
              if (this.state[id_key]) e.id = this.state[id_key];
              const res = await lungupdate(e);
              if (res.code === 200) {
                message.success('保存成功');
                this.setState({ [id_key]: res.id });
              } else message.error('保存失败，' + res.msg);
            }}
          >
            {Object.keys(Lung).map(para => {
              return (
                <div>
                  <Row>
                    <Col className={'my-col'} span={3}>
                      <label>{para}</label>
                    </Col>
                    <Col className={'my-col'} span={3}>
                      <label>{Lung[para]['name']}</label>
                    </Col>
                    <Col className={'my-col'} span={3}>
                      <Form.Item name={`${Lung[para]['key']}_exp`}>
                        <Input className={'my-input'} />
                      </Form.Item>
                    </Col>
                    <Col className={'my-col'} span={3}>
                      <Form.Item name={`${Lung[para]['key']}_best`}>
                        <Input className={'my-input'} />
                      </Form.Item>
                    </Col>
                    <Col className={'my-col'} span={3}>
                      <Form.Item name={`${Lung[para]['key']}_ratio`}>
                        <Input className={'my-input'} />
                      </Form.Item>
                    </Col>
                    <Col className={'my-col'} span={6}>
                      <Row>
                        <Form.Item name={`${Lung[para]['key']}Mea`}>
                          <Radio.Group
                            onChange={e => {
                              this.setState({
                                [`肺功能_${para}`]: e.target.value,
                              });
                            }}
                            value={this.state[`肺功能_${para}`]}
                          >
                            <Radio value={'0'}>正常</Radio>
                            <Radio value={'1'}>异常</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </Row>
                      <Row>
                        {/* <Col className={'my-col'} offset={13}> */}
                        {this.state[`肺功能_${para}`] &&
                        this.state[`肺功能_${para}`] !== '0' ? (
                          <Radio.Group
                            value={this.state[`肺功能_${para}`]}
                            onChange={e => {
                              this.setState({
                                [`肺功能_${para}`]: e.target.value,
                              });
                            }}
                          >
                            <Radio value={'1'}>1</Radio>
                            <Radio value={'2'}>2</Radio>
                            <Radio value={'3'}>3</Radio>
                            <Radio value={'4'}>4</Radio>
                            <Radio value={'5'}>5</Radio>
                          </Radio.Group>
                        ) : null}
                        {/* </Col> */}
                      </Row>
                    </Col>
                    <Col className={'my-col'} span={3}>
                      <Form.Item name={`${Lung[para]['key']}Note`}>
                        <Input.TextArea rows={2} className={'my-input'} />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              );
            })}
            <Row style={{ 'margin-top': '10px' }}>
              <Col span={16}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    保存
                  </Button>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item name={'filePath'}>
                  <Upload
                    name="file[]" //发到后端的文件参数名
                    action="/api/upload" //上传的地址
                    headers={{
                      authorization: 'authorization-text',
                      token: getCookie('token'),
                    }}
                    multiple={true}
                    data={{ pid: this.props.pid }}
                    defaultFileList={(
                      (this.props.Lung && this.props.Lung.filePath) ||
                      ''
                    )
                      .split(',')
                      .filter(x => x !== '')
                      .map(path => ({
                        uid: `image-${path}`,
                        name: path.split('/')[path.split('/').length - 1],
                        status: 'done',
                        url: `/file/${this.props.pid}/${
                          path.split('/')[path.split('/').length - 1]
                        }`,
                      }))}
                    onChange={info => {
                      if (info.file.status !== 'uploading') {
                        console.log(info.file, info.fileList);
                      }
                      if (info.file.status === 'done') {
                        var fileList = this.state['肺功能_filePath'];
                        fileList = fileList.concat(info.file.response.path);
                        this.setState({ ['肺功能_filePath']: fileList });
                        message.success(
                          `${info.file.name} file uploaded successfully`,
                        );
                      } else if (info.file.status === 'error') {
                        message.error(`${info.file.name} file upload failed.`);
                      }
                    }}
                    onRemove={info => {
                      var fileList = this.state['肺功能_filePath'].filter(
                        x => x.slice(-info.name) !== info.name,
                      );
                      this.setState({ ['肺功能_filePath']: fileList });
                      console.log(fileList);
                    }}
                  >
                    <Button>
                      <UploadOutlined /> 上传报告
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <hr />
        </div>
        <div>
          <Row>
            <Col span={24}>
              <h2>其他检查</h2>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col className={'my-col'} span={4}>
              <h3>项目</h3>
            </Col>
            <Col className={'my-col'} span={4}>
              <h3>日期</h3>
            </Col>
            <Col className={'my-col'} span={8}>
              <h3>结果描述</h3>
            </Col>
            <Col className={'my-col'} span={4}>
              <h3>操作</h3>
            </Col>
          </Row>
          <Form
            name="OtherExams"
            initialValues={this.props.OtherExams}
            onFinish={async e => {
              e.ECGPath = this.state.ECGFiles.join(',');
              e.UCGPath = this.state.UCGFiles.join(',');

              if (e.ECGDetTime)
                e.ECGDetTime = e.ECGDetTime.format('YYYY-MM-DD');
              if (e.UCGDetTime)
                e.UCGDetTime = e.UCGDetTime.format('YYYY-MM-DD');
              e.pid = this.props.pid;
              e.treNum = this.props.treNum;
              const id_key = 'OtherExams_id';
              if (this.state[id_key]) e.id = this.state[id_key];
              const res = await otherExamsupdate(e);
              if (res.code === 200) {
                message.success('保存成功');
                this.setState({ [id_key]: res.id });
              } else message.error('保存失败，' + res.msg);
            }}
            wrapperCol={{ span: 24 }}
          >
            <Row>
              <Col className={'my-col'} span={4}>
                <label>12导联心电图</label>
              </Col>
              <Col className={'my-col'} span={4}>
                <Form.Item name={'ECGDetTime'} wrapperCol={{ span: 24 }}>
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col className={'my-col'} span={8}>
                <Form.Item name={'ECGDesc'}>
                  <Input.TextArea rows={2} />
                </Form.Item>
              </Col>
              <Col
                className={'my-col'}
                style={{ 'text-align': 'left', display: 'block' }}
                span={4}
              >
                <Form.Item
                  name={'ECGPath'}
                  wrapperCol={{ span: 20, offset: 4 }}
                >
                  <Upload
                    name="file[]" //发到后端的文件参数名
                    action="/api/upload" //上传的地址
                    headers={{
                      authorization: 'authorization-text',
                      token: getCookie('token'),
                    }}
                    multiple={true}
                    data={{ pid: this.props.pid }}
                    defaultFileList={(
                      (this.props.OtherExams &&
                        this.props.OtherExams.ECGPath) ||
                      ''
                    )
                      .split(',')
                      .filter(x => x !== '')
                      .map(path => ({
                        uid: `ECG-${path}`,
                        name: path.split('/')[path.split('/').length - 1],
                        status: 'done',
                        url: `/file/${this.props.pid}/${
                          path.split('/')[path.split('/').length - 1]
                        }`,
                      }))}
                    onChange={info => {
                      if (info.file.status !== 'uploading') {
                        console.log(info.file, info.fileList);
                      }
                      if (info.file.status === 'done') {
                        var fileList = this.state.ECGFiles;
                        fileList = fileList.concat(info.file.response.path);
                        this.setState({ ECGFiles: fileList });
                        message.success(
                          `${info.file.name} file uploaded successfully`,
                        );
                      } else if (info.file.status === 'error') {
                        message.error(`${info.file.name} file upload failed.`);
                      }
                    }}
                    onRemove={info => {
                      var fileList = this.state.ECGFiles.filter(
                        x => x.slice(-info.name) !== info.name,
                      );
                      this.setState({ ECGFiles: fileList });
                      console.log(fileList);
                    }}
                  >
                    <Button>
                      <UploadOutlined /> 上传报告
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col className={'my-col'} span={4}>
                <label>超声心动图</label>
              </Col>
              <Col className={'my-col'} span={4}>
                <Form.Item name={'UCGDetTime'}>
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col className={'my-col'} span={8}>
                <Form.Item name={'UCGDesc'}>
                  <Input.TextArea rows={2} />
                </Form.Item>
              </Col>
              <Col
                className={'my-col'}
                style={{ 'text-align': 'left', display: 'block' }}
                span={4}
              >
                <Form.Item
                  name={'UCGPath'}
                  wrapperCol={{ span: 20, offset: 4 }}
                >
                  <Upload
                    name="file[]" //发到后端的文件参数名
                    action="/api/upload" //上传的地址
                    headers={{
                      authorization: 'authorization-text',
                      token: getCookie('token'),
                    }}
                    multiple={true}
                    data={{ pid: this.props.pid }}
                    defaultFileList={(
                      (this.props.OtherExams &&
                        this.props.OtherExams.UCGPath) ||
                      ''
                    )
                      .split(',')
                      .filter(x => x !== '')
                      .map(path => ({
                        uid: `UCG-${path}`,
                        name: path.split('/')[path.split('/').length - 1],
                        status: 'done',
                        url: `/file/${this.props.pid}/${
                          path.split('/')[path.split('/').length - 1]
                        }`,
                      }))}
                    onChange={info => {
                      if (info.file.status !== 'uploading') {
                        console.log(info.file, info.fileList);
                      }
                      if (info.file.status === 'done') {
                        console.log(info);
                        var fileList = this.state.UCGFiles;
                        fileList = fileList.concat(info.file.response.path);
                        this.setState({ UCGFiles: fileList });
                        message.success(
                          `${info.file.name} file uploaded successfully`,
                        );
                      } else if (info.file.status === 'error') {
                        message.error(`${info.file.name} file upload failed.`);
                      }
                    }}
                    onRemove={info => {
                      var fileList = this.state.UCGFiles.filter(
                        x => x.slice(-info.name) !== info.name,
                      );
                      this.setState({ UCGFiles: fileList });
                      console.log(fileList);
                    }}
                  >
                    <Button>
                      <UploadOutlined /> 上传报告
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </Form>
          <hr />
        </div>
        <div>
          <Row>
            <Col span={24}>
              <h3>影像学检查</h3>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col className={'my-col'} span={4}>
              <h2>检查部位</h2>
            </Col>
            <Col className={'my-col'} span={4}>
              <h3>检查方法</h3>
            </Col>
            <Col className={'my-col'} span={4}>
              <h3>日期</h3>
            </Col>
            <Col className={'my-col'} span={4}>
              <h3>肿瘤大小</h3>
            </Col>
            <Col className={'my-col'} span={4}>
              <h3>肿瘤描述</h3>
            </Col>
            <Col className={'my-col'} span={4}>
              <h3>操作</h3>
            </Col>
          </Row>
          <Form
            name="ImageExams"
            initialValues={this.props.ImageExams}
            onFinish={async e => {
              e.path = this.state.imageFiles.join(',');
              if (e.detectTime)
                e.detectTime = e.detectTime.format('YYYY-MM-DD');
              if (e.exmaMethod) e.exmaMethod = e.exmaMethod.join(',');
              e.pid = this.props.pid;
              e.treNum = this.props.treNum;
              const id_key = 'ImageExams_id';
              if (this.state[id_key]) e.id = this.state[id_key];
              const res = await imageExamsupdate(e);
              if (res.code === 200) {
                message.success('保存成功');
                this.setState({ [id_key]: res.id });
              } else message.error('保存失败，' + res.msg);
            }}
            wrapperCol={{ span: 20, offset: 2 }}
          >
            <Row>
              <Col className={'my-high-col'} span={4}>
                <Form.Item name={'examArea'}>
                  <Input className={'my-input'} />
                </Form.Item>
              </Col>
              <Col className={'my-high-col'} span={4}>
                <Form.Item name={'exmaMethod'}>
                  <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    options={exam_method_ops}
                  />
                </Form.Item>
              </Col>
              <Col className={'my-high-col'} span={4}>
                <Form.Item name={'detectTime'}>
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col className={'my-high-col'} span={4}>
                <Row>
                  <Form.Item
                    name={'tumorLD'}
                    label={'长径:'}
                    labelCol={{ span: 8, offset: 3 }}
                    wrapperCol={{ span: 12 }}
                  >
                    <InputNumber
                      formatter={value => `${value}cm`}
                      parser={value => value.replace('cm', '')}
                    />
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item
                    name={'tumorSD'}
                    label={'短径:'}
                    labelCol={{ span: 8, offset: 3 }}
                    wrapperCol={{ span: 12 }}
                  >
                    <InputNumber
                      formatter={value => `${value}cm`}
                      parser={value => value.replace('cm', '')}
                    />
                  </Form.Item>
                </Row>
              </Col>
              <Col className={'my-high-col'} span={4}>
                <Form.Item name={'tumorDesc'}>
                  <Input.TextArea rows={2} />
                </Form.Item>
              </Col>
              <Col
                className={'my-high-col'}
                style={{ 'text-align': 'left', display: 'block' }}
                span={4}
              >
                <Form.Item name={'path'} wrapperCol={{ span: 20, offset: 4 }}>
                  <Upload
                    name="file[]" //发到后端的文件参数名
                    action="/api/upload" //上传的地址
                    headers={{
                      authorization: 'authorization-text',
                      token: getCookie('token'),
                    }}
                    multiple={true}
                    data={{ pid: this.props.pid }}
                    defaultFileList={(
                      (this.props.ImageExams && this.props.ImageExams.path) ||
                      ''
                    )
                      .split(',')
                      .filter(x => x !== '')
                      .map(path => ({
                        uid: `image-${path}`,
                        name: path.split('/')[path.split('/').length - 1],
                        status: 'done',
                        url: `/file/${this.props.pid}/${
                          path.split('/')[path.split('/').length - 1]
                        }`,
                      }))}
                    onChange={info => {
                      if (info.file.status !== 'uploading') {
                        console.log(info.file, info.fileList);
                      }
                      if (info.file.status === 'done') {
                        var fileList = this.state.imageFiles;
                        fileList = fileList.concat(info.file.response.path);
                        this.setState({ imageFiles: fileList });
                        message.success(
                          `${info.file.name} file uploaded successfully`,
                        );
                      } else if (info.file.status === 'error') {
                        message.error(`${info.file.name} file upload failed.`);
                      }
                    }}
                    onRemove={info => {
                      var fileList = this.state.imageFiles.filter(
                        x => x.slice(-info.name) !== info.name,
                      );
                      this.setState({ imageFiles: fileList });
                      console.log(fileList);
                    }}
                  >
                    <Button>
                      <UploadOutlined /> 上传报告
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item wrapperCol={{ offset: 0 }}>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
export default OtherInspect;
