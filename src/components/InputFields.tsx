

export function InputField({ ...props }) {
  return (
    <input
      className="px-4 py-2 focus:outline-none rounded-sm w-full"
      {...props}
    />
  );
}

export const Checkbox = ({ ...props }) => (
  <label className="switch">
    <input type="checkbox" {...props} />
    <span className="slider round"></span>
  </label>
);


