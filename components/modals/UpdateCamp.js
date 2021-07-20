import React, { useEffect, useMemo } from "react";
import { Form, Modal, Input } from "antd";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ApiRoutes from "../../util/APIConfig";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import types from "../../util/ActionTypes";
import { myPromise } from "./AddNewCamp";

const UpdateCamp = (props) => {
  const [form] = Form.useForm();
  const extractedDefaultFileList = useSelector(
    (state) => state.camp.defaultFileList
  );
  const updatedCamp = useSelector((state) => state.camp.updatedCamp);
  const isUpdated = useSelector((state) => state.camp.isUpdated);
  useEffect(() => {
    form.setFieldsValue({
      name: updatedCamp.name,
      location: updatedCamp.location,
      description: updatedCamp.description,
      costADay: updatedCamp.costADay,
    });
  }, [updatedCamp]);

  const state = useMemo(() => {
    return {
      defaultFileList: extractedDefaultFileList,
    };
  }, [extractedDefaultFileList]);
  const { FINAL_UPDATE_CAMP, UPDATE_CAMP } = types;
  const dispatch = useDispatch();
  const { UPDATE_CAMP_BY_ID_URL } = ApiRoutes;

  const dispatchAfterUpdating = () => {
    let newState = isUpdated + 1;
    dispatch({
      type: FINAL_UPDATE_CAMP,
      payload: {
        isUpdated: newState,
      },
    });
    dispatch({
      type: UPDATE_CAMP,
      payload: {
        updatedCamp: {},
        defaultFileList: [],
      },
    });
    props.onCancel();
  };
  const handleOk = () => {
    const id = updatedCamp._id;
    const jwt = localStorage.getItem("jwtToken");
    form
      .validateFields()
      .then((validatedValues) => {
        if (typeof validatedValues.uploadImages === "undefined") {
          const updatedCamp = form.getFieldsValue();
          axios
            .put(UPDATE_CAMP_BY_ID_URL + id, updatedCamp, {
              headers: {
                Authorization: jwt,
              },
            })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
          dispatchAfterUpdating();
        } else if (validatedValues.uploadImages.fileList.length > 0) {
          const values = form.getFieldsValue();
          myPromise(values, form)
            .then((updatedCamp) => {
              axios.put(UPDATE_CAMP_BY_ID_URL + id, updatedCamp, {
                headers: {
                  Authorization: jwt,
                },
              });
              dispatchAfterUpdating();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Modal
        title="Update The Camp"
        visible={props.isUpdateCampClicked}
        onOk={handleOk}
        onCancel={props.onCancel}
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
            <Form.Item label="Upload Image (image only)" name="uploadImages">
              {state.defaultFileList.length > 0 && (
                <Upload {...state}>
                  <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
              )}
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

export default UpdateCamp;
