const Input = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  className,
  autoFocus,
}) => {
  return (
    <div className="form-control w-full my-2">
      <label className="label">
        <span className="label-text text-gray-700 dark:text-gray-300 font-medium my-1">
          {label}
        </span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={`input input-bordered input-primary w-full font-semibold ${className}`}
        value={value}
        onChange={onChange}
        autoFocus
      />
    </div>
  );
};

export default Input;
