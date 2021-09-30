import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="row mb-3">
      <label
        className="col-sm-2 col-form-label  col-form-label-sm"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="col-sm-10">
        <input
          {...rest}
          id={name}
          name={name}
          className="form-control form-control-sm"
        />
      </div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
