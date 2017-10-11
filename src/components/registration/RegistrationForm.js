import React from 'react';
import TextInput from '../common/TextInput';
import PasswordInput from '../common/PasswordInput';

const RegistrationForm = ({registration, onSave, onChange, onCancel, saving, errors}) => {
  let actionsStyle = {
    marginRight: 20,
    marginTop: 10
  };

  let submitStyle = {
    marginTop: 10,
    marginRight: 50
  };

  return (
    <form>
      <TextInput
        name="companyName"
        label="Company Name"
        placeholder="Company name"
        value={registration.companyName}
        onChange={onChange}
        error=""/>

      <TextInput
        name="email"
        label="Email"
        placeholder="Email"
        value={registration.email}
        onChange={onChange}
        error={errors.email}/>

      <PasswordInput
        name="password"
        label="Password"
        placeholder="Password"
        value={registration.password}
        onChange={onChange}
        error={errors.password}/>

      <PasswordInput
        name="passwordConfirmation"
        label="Password Confirmation"
        placeholder="Password Confirmation"
        value={registration.passwordConfirmation}
        onChange={onChange}
        error=""/>

      <input
        id="submit"
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}
        style={submitStyle}/>

      <input
        id="cancel"
        type="submit"
        value="Cancel"
        className="btn btn-default"
        onClick={onCancel}
        style={actionsStyle}/>
    </form>
  );
};

export default RegistrationForm;
