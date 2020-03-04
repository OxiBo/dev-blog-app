//https://stackoverflow.com/questions/42640636/react-must-be-in-scope-when-using-jsx-react-react-in-jsx-scope
import React from "react";
import { Field } from "redux-form";

// https://codeburst.io/forms-with-redux-form-v7-part-2-of-2-f44ffee4a34d
export default props => {
  // console.log(props);
  const renderRadioButtons = (key, index) => {
    // console.log(key, index)
    return (
      <div key={key+index} className="">
        <label className="form-check-label" htmlFor={key}>
          <Field
            id={key}
            component="input"
            name={props.input.name}
            type="radio"
            value={key}
            className="form-check-label"
          />

          {props.options[key]}
        </label>
      </div>
    );
  };

  return (
    <>
      <label className="col-sm-4 col-form-label text-uppercase font-weight-bold">
        {props.label}
      </label>
      <div className="radio-buttons">
        {props.options && Object.keys(props.options).map(renderRadioButtons)}
      </div>
    </>
  );
};
