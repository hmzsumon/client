const Input = ({
  handleChange,
  value,
  label,
  type,
  name,
  disabled,
  placeholder,
}) => {
  return (
    <div className='relative w-full mb-3'>
      <label
        className='block uppercase text-gray-600 text-xs font-semibold mb-2'
        htmlFor='grid-password'
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className='border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none  focus:ring w-full ease-linear transition-all duration-150 disabled:cursor-not-allowed disabled:text-gray-400'
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
