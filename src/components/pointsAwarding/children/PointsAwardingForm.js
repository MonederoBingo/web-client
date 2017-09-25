import React from "react";
import NumberInput from "../../common/NumberInput";
import TextInput from "../../common/TextInput";

const PointsAwardingForm = (props) => {
  return (
     <div>
       <NumberInput name="phoneNumber" label="Phone #" onChange={props.onChange} placeholder="Phone #"/>
       <NumberInput name="amount" label="Amount" onChange={() => {}} placeholder="Amount"/>
       <TextInput name="saleKey" label="Sale Key" onChange={() => {}} placeholder=""/>
       <input id="save" type="submit" disabled={() => {}} value="Save" className="btn btn-primary" onClick={() => {}} />
     </div>
  );
};

export default PointsAwardingForm;
