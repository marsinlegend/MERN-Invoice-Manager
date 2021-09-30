import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="row mb-3">
      <label
        className="col-sm-2 col-form-label col-form-label-sm"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="col-sm-10">
        <select
          name={name}
          id={name}
          {...rest}
          className="form-control form-control-sm my-2"
        >
          <option value="" />
          {options.map((option) => (
            <option key={option._id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
