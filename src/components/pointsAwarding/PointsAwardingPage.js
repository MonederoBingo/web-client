import React from 'react';
import PointsAwardingForm from './children/PointsAwardingForm';

class PointsAwardingPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      saving: false
    };
  }
  updateFieldsState() {

  }
  submit() {

  }
   render() {
     return (
       <div>
         <PointsAwardingForm
           onChange={this.updateFieldsState}
           onSubmit={this.submit}
           saving={this.state.saving}
         />
       </div>
     );
   }
}

export default PointsAwardingPage;
