import React from 'react';

const ButtonComponent = ({ label, ...props }) => (
  <button {...props}>{label}</button>
);

export default ButtonComponent;