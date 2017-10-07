import React from 'react';
import PointsAwardingForm from './children/PointsAwardingForm';
import * as pointsAwardingActions from "../../actions/pointsAwardingActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

export class PointsAwardingPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      pointsAwarding: {
        phoneNumber: ""
      },
      saving: false,
    };
    this.updateFieldsState = this.updateFieldsState.bind(this);
    this.submit = this.submit.bind(this);
  }
  updateFieldsState(event) {
    const field = event.target.name;
    let pointsAwarding = Object.assign({}, this.state.pointsAwarding);
    pointsAwarding[field] = event.target.value;
    return this.setState({pointsAwarding: pointsAwarding});
  }
  submit() {
     this.props.actions.awardPoints();
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

function mapStateToProps(state, ownProps) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(pointsAwardingActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PointsAwardingPage);
