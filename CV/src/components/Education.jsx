import '../styles/main.css'
import { useRef, useState } from 'react'
import CustomInput from './CustomInput'

import { TbSchool } from 'react-icons/tb';
import { LuSchool } from "react-icons/lu";
import { MdOutlineDateRange } from "react-icons/md";
import { IconContext } from "react-icons";
function Education() {
    const [data, setData] = useState({school: '', title: '', date: ''})
    const formRef = useRef(null)
    const dataDisplayRef = useRef(null)

    function submitData(event){
        event.preventDefault()
        formRef.current.classList.add('hidden')
        dataDisplayRef.current.classList.remove('hidden')
    }

    function updateData(value, id){
        const newData = {...data, [id]: value}
        setData(newData)
    }

    function editForm(){
        dataDisplayRef.current.classList.add('hidden')
        formRef.current.classList.remove('hidden')
    }

    return (
            <div className="bigbox">
                <div className="header"> Education</div>
                <form ref={formRef} className='educationForm form' onSubmit={(event) => submitData(event)}>
                    <CustomInput key="school" id="school" label="School" onChange={updateData}></CustomInput>
                    <br />
                    <CustomInput key="title" id="title" label="Title of Study" onChange={updateData}></CustomInput>
                    <br />
                    <CustomInput key="date" id="date" type="date" datePlaceholder="Date of Study" onChange={updateData}></CustomInput>
                    <br />
                    <button type="submit" className="submitBtn btn"> SUBMIT </button>
                </form>
                <div ref={dataDisplayRef} className="displayData hidden">
                <div className="School">
                    <IconContext.Provider value={{ size: '30px' }}>
                    <div>
                        <LuSchool />
                    </div>
                    </IconContext.Provider>
                    
                    <p>
                        {data.school}
                    </p>
                </div>
                <div className="title">
                    <IconContext.Provider value={{ size: '30px' }}>
                    <div>
                        <TbSchool />
                    </div>
                    </IconContext.Provider>
                    
                    <p>
                        {data.title}
                    </p>
                </div>
                <div className="date">

                    <IconContext.Provider value={{ size: '30px' }}>
                    <div>
                        <MdOutlineDateRange />
                    </div>
                    </IconContext.Provider>
                    <p>
                        {data.date}
                    </p>
                </div>
                <div className="editBtn btn" onClick={editForm}> Edit</div>
            </div>
            </div>
    )
}

export default Education;