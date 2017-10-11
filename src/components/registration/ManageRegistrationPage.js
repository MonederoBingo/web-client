import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as registrationActions from '../../actions/registrationActions';
import RegistrationForm from './RegistrationForm';
import toastr from 'toastr';
import Messages from '../common/Messages';

export class ManageRegistrationPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      registration: Object.assign({}, this.props.registration),
      serviceResult: Object.assign({}, this.props.registrationResult),
      errors: {},
      saving: false
    };
    this.updateUserState = this.updateUserState.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.redirect = this.redirect.bind(this);
    this.redirectToHome = this.redirectToHome.bind(this);
  }

  updateUserState(event) {
    const field = event.target.name;
    let registration = Object.assign({}, this.state.registration);
    registration[field] = event.target.value;
    return this.setState({registration: registration});
  }

  registrationFormIsValid() {
    let formIsValid = true;
    let errors = {};
    if (this.state.registration.email.length === 0) {
      errors.email = 'Provide a valid email.';
      formIsValid = false;
    }

    if (this.state.registration.password.length === 0) {
      errors.password = 'Provide a valid password.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  saveUser(event) {
    event.preventDefault();

    if (!this.registrationFormIsValid()) {
      return;
    }

    this.setState({saving: true});
    this.props.actions.createUser(this.state.registration)
      .then(() => {
        if (this.props.registrationResult.success) {
          this.setState({saving: false});
          toastr.success('Registration successful.');
          this.redirect('/login');
        } else {
          this.setState({saving: false});
          toastr.error(Messages.getMessage(this.props.registrationResult.message));
        }
      })
      .catch(error => {
        this.setState({saving: false});
        toastr.error(error);
      });
  }

  redirect(route) {
    this.context.router.push(route);
  }

  redirectToHome(event) {
    event.preventDefault();
    this.redirect("/");
  }

  render() {
    return (
      <div>
        <h3><strong>Registration</strong></h3>
        <RegistrationForm
          registration={this.state.registration}
          errors={this.state.errors}
          onSave={this.saveUser}
          onChange={this.updateUserState}
          saving={this.state.saving}
          onCancel={this.redirectToHome}/>
      </div>
    );
  }
}

ManageRegistrationPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  let registration = {
    email: '',
    username: 'Admin',
    password: '',
    passwordConfirmation: '',
    companyName: '',
  };

  return {
    registrationResult: state.registrationResult,
    registration: registration
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(registrationActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRegistrationPage);
