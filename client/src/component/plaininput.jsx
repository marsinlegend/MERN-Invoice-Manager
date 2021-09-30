import React from "react";

const PlainInput = ({ name, placeholder, error, ...rest }) => {
  return (
    <input
      {...rest}
      id={name}
      name={name}
      placeholder={placeholder}
      className="form-control-plaintext form-control-sm"
    />
  );
};

export default PlainInput;
