import React from 'react';
import PointsAwardingForm from './children/PointsAwardingForm';

class PointsAwardingPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      pointsAwarding: {
        phoneNumber: ""
      },
      saving: false,
    };
    this.updateFieldsState = this.updateFieldsState.bind(this);
  }
  updateFieldsState(event) {
    const field = event.target.name;
    let pointsAwarding = Object.assign({}, this.state.pointsAwarding);
    pointsAwarding[field] = event.target.value;
    return this.setState({pointsAwarding: pointsAwarding});
  }
  submit() {

  }
   render() {
     return (
       <div>
         <PointsAwardingForm
           onChange={this.updateFieldsState}
           onSubmit={this.submit}
           pointsAwarding={this.state.pointsAwarding}
           saving={this.state.saving}
         />
       </div>
     );
   }
}

export default PointsAwardingPage;
