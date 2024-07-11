import React from 'react';

const InputComponent = ({ label, ...props }) => (
  <div>
    <label>{label}</label>
    <input {...props} />
  </div>
);

export default InputComponent;