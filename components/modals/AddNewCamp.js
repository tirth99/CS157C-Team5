import React, {useState, useEffect} from "react";
import { Form, Modal, Input } from "antd";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const AddNewCamp = (props) => {
  const [form] = Form.useForm();
  const [state, setState] = useState({
    fileList: [],
  });
  const handleUpload = () => {
    const formData = new FormData();
    state.fileList.forEach((file) => {
      formData.append("files[]", file);
    });
  };

  const isValidInput = (values) => {
    form.validateFields().then((validatedValues) => {
        values.uploadImages.fileList.map((file) => {
            if (file.originFileObj.type !== 'image/png') {
                return false;
            }
        })
      }).catch(err => {
        return false
      })
      return true;
  }
  const handleOk = () => {
    const values = form.getFieldsValue()
    console.log(isValidInput(values));
    if (isValidInput(values)) {
        console.log(values)
    }
    else {
        console.log('false')
    }
    props.onCancle();
    form.resetFields();

    handleUpload()
  };

  return (
    <div>
      <Modal
        title="Add New Camp"
        visible={props.isAddNewCamp}
        onOk={handleOk}
        onCancel={props.onCancle}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name" 
          rules={[
                  {
                    required: true,
                    message: "This field is required!",
                  },
                ]}>
            <Input placeholder="Name of the park" />
          </Form.Item>
          <Form.Item label="Location" name="location" 
          rules={[
                  {
                    required: true,
                    message: "This field is required!",
                  },
                ]}>
            <Input placeholder="Where is the park?" />
          </Form.Item>
          <Form.Item label="Description" name="description"
          rules={[
                  {
                    required: true,
                    message: "This field is required!",
                  },
                ]}>
            <Input.TextArea placeholder="Description" />
          </Form.Item>
          <Form.Item label="Upload Image (image only)" name="uploadImages" 
          rules={[
                  {
                    required: true,
                    message: "This field is required!",
                  },
                ]}>
          <Upload>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddNewCamp;
