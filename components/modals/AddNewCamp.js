import React, { useState } from "react";
import { Form, Modal, Input } from "antd";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ApiRoutes from "../../util/APIConfig";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import types from "../../util/ActionTypes";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const getBase64ArrayPromisePerImage = (file) => {
  return new Promise((resolve, reject) => {
    if (file.imageBase64) {
      resolve(file.imageBase64);
    }
    if (
      file.originFileObj.type == "image/png" ||
      file.originFileObj.type == "image/jpeg"
    ) {
      toBase64(file.originFileObj)
        .then((base64) => {
          resolve(base64);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      reject("Image only please");
    }
  });
};
const getFileName = (file) => {
  try {
    if (file.originFileObj.name) {
      return file.originFileObj.name;
    }
  } catch (error) {
    return file.name;
  }
};
export var myPromise = function (values, form) {
  let imageBase64Values = [];
  return new Promise(function (resolve, reject) {
    form
      .validateFields()
      .then((validatedValues) => {
        const requests = values.uploadImages.fileList.map((file) => {
          return getBase64ArrayPromisePerImage(file)
            .then((base64) => {
              imageBase64Values.push({
                imageBase64: base64,
                fileName: getFileName(file),
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
        return Promise.all(requests).then(() => {
          let result = {
            name: values.name,
            location: values.location,
            description: values.description,
            imageBase64Values: imageBase64Values,
            costADay: values.costADay,
          };
          resolve(result);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
const AddNewCamp = (props) => {
  const { ADD_NEW_CAMP } = types;
  const campState = useSelector((state) => state.camp.isAdded);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { ADD_NEW_CAMP_URL } = ApiRoutes;

  const handleOk = () => {
    let newState = campState + 1;
    const values = form.getFieldsValue();
    const token = localStorage.getItem("jwtToken");
    myPromise(values, form)
      .then((newCamp) => {
        axios
          .post(ADD_NEW_CAMP_URL, newCamp, {
            headers: {
              Authorization: `${token}`,
            },
          })
          .then((response) => {
            dispatch({
              type: ADD_NEW_CAMP,
              payload: {
                isAdded: newState,
              },
            });
            props.onCancle();
            form.resetFields();
          });
      })
      .catch((err) => {
        console.log(err);
      });
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
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            <Input placeholder="Name of the park" />
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            <Input placeholder="Where is the park?" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "This field is required !",
              },
            ]}
          >
            <Input.TextArea placeholder="Description" />
          </Form.Item>
          <div className="image__cost">
            <Form.Item
              label="Upload Image (image only)"
              name="uploadImages"
              rules={[
                {
                  required: true,
                  message: "This field is required !",
                },
              ]}
            >
              <Upload>
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              style={{ marginLeft: "2rem" }}
              label="Cost Per Day"
              name="costADay"
              rules={[
                {
                  required: true,
                  message: "This field is required!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (isNaN(value)) {
                      return Promise.reject(
                        new Error("This field must be a number !")
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input style={{ width: "120px" }} placeholder="Cost per day" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
export default AddNewCamp;
