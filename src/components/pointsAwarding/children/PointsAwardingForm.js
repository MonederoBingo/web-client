import React from 'react';
import NumberInput from "../../common/NumberInput";

const PointsAwarding = (props) => {
  return (
     <div>
       <NumberInput name='phoneNumber' label='Phone #' onChange={() => {}} placeholder='Phone #'/>
       <NumberInput name='amount' label='Amount' onChange={() => {}} placeholder='Amount'/>
     </div>
  );
};

export default PointsAwarding;
