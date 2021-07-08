import { DatePicker, Space, Select } from "antd";
import moment from "moment";
import React from "react";

const RangePicker = () => {
  const { RangePicker } = DatePicker;
  const { Option } = Select;

  function onChange(dates, dateStrings) {
    console.log("From: ", dates[0], ", to: ", dates[1]);
    console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
  }
  function onSelectionChange(value) {
    console.log(`selected ${value}`);
  }
  const numberOfPeopleGenerator = () => {
      let array = [];
      for (let i = 1; i <= 20; i++) {
          array.push(<Option value={i}>{i}</Option>);
      }
      return array;
  }
  return (
    <div className="ticket__form">
      <div className="inner__ticket__form">
      <div>
      <h6 >Stay Range</h6>
        <Space direction="vertical" size={12}>
          <RangePicker
            ranges={{
              Today: [moment(), moment()],
              "This Month": [
                moment().startOf("month"),
                moment().endOf("month"),
              ],
            }}
            onChange={onChange}
          />
        </Space>
      </div>
        <div>
        <h6 >Unit Type</h6>
        <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select a unit type"
    optionFilterProp="children"
    onChange={onSelectionChange}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    <Option value="truck">Truck Camper</Option>
    <Option value="mh class a">Mh Class A</Option>
    <Option value="mh class b">Mh Class B</Option>
    <Option value="mh class c">Mh Class C</Option>
  </Select>
        </div>
        <div>
        <h6 >How many adults?</h6>
        <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select a number"
    optionFilterProp="adults"
    onChange={onSelectionChange}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    {numberOfPeopleGenerator()}
  </Select>
        </div>
        <div>
        <h6 >How many children?</h6>
        <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select a number"
    optionFilterProp="children"
    onChange={onSelectionChange}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    {numberOfPeopleGenerator()}
  </Select>
        </div>
        <button className="show__avai__btn">
            Show Avaibility
        </button>
      </div>
    </div>
  );
};

export default RangePicker;
