import React from "react";
import NumberInput from "../../common/NumberInput";
import TextInput from "../../common/TextInput";

const PointsAwardingForm = (props) => {
  return (
     <div>
       <NumberInput name="phoneNumber" label="Phone #" onChange={props.onChange} placeholder="Phone #"/>
       <NumberInput name="amount" label="Amount" onChange={props.onChange} placeholder="Amount"/>
       <TextInput name="saleKey" label="Sale Key" onChange={props.onChange} placeholder=""/>
       <input id="save" type="submit" disabled={props.saving} value="Save" className="btn btn-primary" onClick={props.onClick} />
     </div>
  );
};

export default PointsAwardingForm;
