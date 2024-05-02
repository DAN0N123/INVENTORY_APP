/* eslint-disable react/prop-types */
function CustomInput({ label, id, currentValue, datePlaceholder, onChange, type = "text"}) {

  const handleChange = (event) => {
    const newValue = event.target.value;
    onChange(newValue, id);
};
  if(type != 'date'){
    return (
      <div>
              <input
                  placeholder={label}
                  className="customInput"
                  id={id}
                  type={type}
                  value={currentValue}
                  onChange={handleChange}
                  required
              />
          </div>
    );
  }else{
    return <div className="datePiece">
              <input
                  placeholder={label}
                  className="customInput"
                  id={id}
                  type={type}
                  value={currentValue}
                  onChange={handleChange}
                  required
              />
              <div className="dateLabel"> {datePlaceholder} </div>
          </div>
  }
  
}

export default CustomInput;
