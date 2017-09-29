import React from 'react';
import PointsAwardingForm from './children/PointsAwardingForm';

class PointsAwardingPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      saving: false
    };
  }
  change() {

  }
   render() {
     return (
       <div>
         <PointsAwardingForm
           onChange={this.change}
           saving={this.state.saving}
         />
       </div>
     );
   }
}

export default PointsAwardingPage;
