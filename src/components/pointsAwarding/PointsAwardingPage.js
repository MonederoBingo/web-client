import React from 'react';
import PointsAwardingForm from './children/PointsAwardingForm';

class PointsAwardingPage extends React.Component {
  change() {

  }
   render() {
     return (
       <div>
         <PointsAwardingForm
           onChange={this.change}
         />
       </div>
     );
   }
}

export default PointsAwardingPage;
