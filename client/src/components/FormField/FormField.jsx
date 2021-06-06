import { Field, ErrorMessage } from "formik";

export function FormField({
  name,
  label,
  type = "text",
  autoComplete = "off",
}) {
  return (
    <label>
      <Field
        className="formField"
        type={type}
        name={name}
        placeholder={label}
        autoComplete={autoComplete}
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
