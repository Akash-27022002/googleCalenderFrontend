import logo from './logo.svg';
import './App.css';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';

function App() {
  const responseSuccess = response => {
    console.log(response)
    const { code } = response
    axios.post("http://localhost:5000/api/initGoogleCalender", { code }).then((res) => {
      console.log("api success")
      console.log(res.data)
      setsignedIn(true)
    }).catch((error) => {
      console.log("api fails", error)
    })
  }
  const responseFailure = error => {
    console.log(error.message)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(summary, description, location, startDataTime, endDateTime)
    axios.post("http://localhost:5000/api/createEventsInGoogleCalenderView", {
      summary,
      description,
      location,
      startDataTime,
      endDateTime
    }).then(response => {
      console.log(response.data)
    }).catch(error => console.log(error))
  }

  const [summary, setSummary] = useState('')
  const [description, setdescription] = useState('')
  const [location, setlocation] = useState('')
  const [startDataTime, setstartDataTime] = useState('')
  const [endDateTime, setendDateTime] = useState('')
  const [signedIn, setsignedIn] = useState(false)

  return (
    <div>
      <div className="App">
        <h1>Google Calender</h1>
      </div>
      {
        !signedIn ? (
          <div>
            <GoogleLogin
              clientId='53637382107-cj4jbju9dvsfgkql17q1tqis251il92g.apps.googleusercontent.com'
              buttonText='signIn and Authorize Calender'
              onSuccess={responseSuccess}
              onFailure={responseFailure}
              cookiePolicy={'single_host_origin'}
              responseType='code'
              accessType='offline'
              scope='openid email profile https://www.googleapis.com/auth/calendar'
            />
          </div>
        ) : (
          <div>
            <form onSubmit={handleSubmit}>
              <label htmlFor='summary'>Summary</label>
              <br />
              <input type='text' id='summary' value={summary} onChange={e => setSummary(e.target.value)} />
              <br />
              <label htmlFor='description'>Description</label>
              <br />
              <textarea type='text' id='description' value={description} onChange={e => setdescription(e.target.value)} />
              <br />
              <label htmlFor='location'>Location</label>
              <br />
              <input type='text' id='location' value={location} onChange={e => setlocation(e.target.value)} />
              <br />
              <label htmlFor='startDateTime'>startDateTime</label>
              <br />
              <input type='datetime-local' id='startDateTime' value={startDataTime} onChange={e => setstartDataTime(e.target.value)} />
              <br />
              <label htmlFor='endDateTime'>endDateTime</label>
              <br />
              <input type='datetime-local' id='endDateTime' value={endDateTime} onChange={e => setendDateTime(e.target.value)} />
              <br />
              <button type='submit'> create event</button>
            </form>
          </div>
        )
      }


    </div>
  );
}

export default App;

/**

function GoogleAuthButton() {
  useEffect(() => {
    const initGoogleAuth = async () => {
      await window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: '53637382107-cj4jbju9dvsfgkql17q1tqis251il92g.apps.googleusercontent.com',
          scope: 'openid email profile https://www.googleapis.com/auth/calendar',
        });
      });
    };

    initGoogleAuth();
  }, []);

  const handleGoogleLogin = async () => {
    const auth = window.gapi.auth2.getAuthInstance();
    const user = await auth.signIn();

    // Use the user object to authenticate the user in your application
    console.log(user);
  };

  return (
    <button onClick={handleGoogleLogin}>
      Login with Google
    </button>
  );
}


function App() {
  // const arr = [{ src: xyz, name: "Akash", country: "India", phoneNo: "7007796127" },
  // { src: xyz, name: "Akash1", country: "India1", phoneNo: "17007796127" },
  // // { src: xyz, name: "Akash2", country: "India2", phoneNo: "27007796127" },
  // // { src: xyz, name: "Akash3", country: "India3", phoneNo: "37007796127" },
  // { src: xyz, name: "Akash4", country: "India4", phoneNo: "47007796127" }]
  // const [data, setData] = useState()
  // const [array, setArray] = useState([])

  // function getData() {
  //   axios({
  //     method: "GET",
  //     url: "http://127.0.0.1:8000/api/"
  //   })
  //     .then((data) => {
  //       setArray(data.data)
  //     }).catch((error) => {

  //     })
  // }
  // return (
  //   <div>
  //     {array?.map(e => <div style={{ color: "blue", border: "3px solid green", display: 'flex' }}>
  //       <div style={{ height: "75px", width: "60px", border: "2px solid blue", margin: "0.5px" }}>
  //         {/* <img src={e.src} style={{ height: "75px", width: "60px" }} /> */
  //       </div>
  //       <div style={{ display: 'flex', flexDirection: 'column', marginLeft: "15px" }}>
  //         <span>{e.event}</span>
  //         <span>{e.eventName}</span>
  //       </div>

  //     </div>)}
  //     <button onClick={(e) => getData(e)} type='button'>Click Me For Data</button>
  //   </div>
  // );

