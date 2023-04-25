import { useEffect, useState } from 'react';
import axios from 'axios';

function ViewCalender() {
    const [array, setArray] = useState([])
    function getData() {
        axios({
            method: "GET",
            url: "http://localhost:5000/api/getCalenderView"
        })
            .then((data) => {
                setArray(data.data)
            }).catch((error) => {

            })
    }
    return (
        <div>
            {array?.map(e => <div style={{ color: "blue", border: "3px solid green", display: 'flex' }}>
                <div style={{ height: "75px", width: "60px", border: "2px solid blue", margin: "0.5px" }}>
                    {/* <img src={e.src} style={{ height: "75px", width: "60px" }} /> */}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: "15px" }}>
                    <span>{e.summary}</span>
                    <span>{e.description}</span>
                    {/* <span>{e.phoneNo}</span> */}
                </div>

            </div>)}
            <button onClick={(e) => getData(e)} type='button'>Click Me For Data</button>
        </div>
    )
}

export default ViewCalender