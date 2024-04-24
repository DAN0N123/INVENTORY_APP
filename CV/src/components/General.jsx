import '../styles/main.css'
import CustomInput from './CustomInput.jsx'
import { useState, useRef } from 'react'

function General() {
    const [data, setData] = useState({firstName: '', lastName: '', email: '', phoneNumber: ''})

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
            <div className="header"> Personal Details</div>
            <form ref={formRef} className='personalForm form' onSubmit={(event) => submitData(event)}>
                <CustomInput key="firstName" label="First Name" value={data.firstName} onChange={updateData} id="firstName"> </CustomInput>
                <br />
                <CustomInput key="lastName" label="Last Name" value={data.lastName} onChange={updateData} id="lastName"> </CustomInput>
                <br />
                <CustomInput key="phoneNumber" label="Phone Number" value={data.phoneNumber} onChange={updateData} type="tel" id="phoneNumber"> </CustomInput>
                <br />
                <CustomInput key="email" label="Email" value={data.email} onChange={updateData} type="email" id="email"> </CustomInput>
                <br />
                <button type="submit" className="submitBtn btn"> SUBMIT </button>
            </form>
            <div ref={dataDisplayRef} className="displayData hidden">
                <div className="person">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                    </svg>
                    <p>
                        {data.firstName} {data.lastName}
                    </p>
                </div>
                <div className="email">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                    </svg>
                    <p>
                        {data.email}
                    </p>
                </div>
                <div className="phone">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                    </svg>
                    <p>
                        {data.phoneNumber}
                    </p>
                </div>
                <div className="editBtn btn" onClick={editForm}> Edit</div>
            </div>
        </div>
    )
}

export default General;