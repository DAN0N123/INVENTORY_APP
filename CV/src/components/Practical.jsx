import { useState, useRef} from "react";
import CustomInput from "./CustomInput";
import { GrUserWorker } from "react-icons/gr";
import '../styles/main.css'
export default function Practical(){
    const [data, setData] = useState({company: '', position: '', responsibilities: '', dateFrom: '', dateTo: ''});
    const formRef = useRef(null)
    const dataDisplayRef = useRef(null)

    function updateData(value, id){
        const newData = {...data, [id]: value}
        setData(newData)
    }

    function submitData(event){
        event.preventDefault()
        formRef.current.classList.add('hidden')
        dataDisplayRef.current.classList.remove('hidden')
    }

    function editForm(){
        dataDisplayRef.current.classList.add('hidden')
        formRef.current.classList.remove('hidden')
    }

    return (
        <div className='bigbox'>
            <div className="header"> Practical Experience</div>
            <form ref={formRef} className='practicalForm form' onSubmit={(event) => submitData(event)}>
                <CustomInput key="company" id="company" label="Company Name" currentValue={data.company} onChange={updateData}> </CustomInput>
                <br />
                <CustomInput key="position" id="position" label="Position Title" currentValue={data.position} onChange={updateData}> </CustomInput>
                <br />
                <CustomInput key="responsibilities" id="responsibilities" label="Main responsibilities" currentValue={data.responsibilities} onChange={updateData}> </CustomInput>
                <br />
                <div className="date">
                    <CustomInput key="dateFrom" id="dateFrom" label="From" datePlaceholder="From" type="date" currentValue={data.dateFrom} onChange={updateData}> </CustomInput>
                    <CustomInput key="dateTo" id="dateTo" label="To" type="date" datePlaceholder="To" currentValue={data.dateTo} onChange={updateData}> </CustomInput>
                </div>
                <button type="submit" className="submitBtn btn"> SUBMIT </button>
            </form>
            <div ref={dataDisplayRef} className="displayData hidden">
                <div className="company">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-building" viewBox="0 0 16 16">
                        <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
                        <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z"/>
                    </svg>
                    {data.company}
                </div>
                <div className="position">
                    <GrUserWorker />
                    {data.position}
                </div>
                <div className="responsibilities">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-paperclip" viewBox="0 0 16 16">
                        <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z"/>
                    </svg>
                    {data.responsibilities}
                </div>
                <div className="date">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-calendar" viewBox="0 0 16 16">
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                    </svg>
                    {data.dateFrom} - {data.dateTo}
                </div>
                <div className="editBtn btn" onClick={editForm}> Edit</div>
            </div>
        </div>
    )
}