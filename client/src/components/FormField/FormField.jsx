import { Field, ErrorMessage } from "formik";

export function FormField({
  name,
  label,
  type = "text",
  autoComplete = "off",
  rows = "1",
  as = "input",
}) {
  return (
    <label>
      <Field
        className="formField formTextArea"
        type={type}
        name={name}
        placeholder={label}
        autoComplete={autoComplete}
        rows={rows}
        as={as}
      />
      <div className="errorContainer">
        <ErrorMessage className="error" component="p" name={name} />
      </div>
    </label>
  );
}

export function ServerError({ serverError }) {
  return <div className="error">{serverError}</div>;
}
