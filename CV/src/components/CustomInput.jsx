/* eslint-disable react/prop-types */
function CustomInput({ label, id, currentValue, onChange, type = "text"}) {

  const handleChange = (event) => {
    const newValue = event.target.value;
    onChange(newValue, id);
};
  return (
    <div>
            <input
                placeholder={label}
                className="customInput"
                id={id}
                type={type}
                value={currentValue}
                onChange={handleChange}
            />
        </div>
  );
}

export default CustomInput;
