import { useEffect, useMemo, useState } from "react"
import { io } from "socket.io-client"
import { MUI_C } from "../MUI Components/Components"
import { MUI_I } from "../MUI Components/Icons"
import "../assets/css/Home.css"
import SideBar from "../pages/sidebar/SideBar"


export default function Home() {
  const [message, setMessage] = useState("")
  const [allMessage, setAllmessage] = useState([])
  const [socketId, setSocketID] = useState(null)

  const socket = useMemo(() => io("http://localhost:5000", { withCredentials: true }), []);
  useEffect(() => {

    socket.on("connect", () => {
      console.log("User Connected");
      setSocketID(socket.id)
    });

    socket.on("receive-message", (data) => {
      setAllmessage((message) => [...message, data])
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("message", message)
    setMessage("")

  }
  return (
    <>
      <MUI_C.Box>
     
        <MUI_C.Grid container spacing={2}>
          <MUI_C.Grid item xs={2}>
            <SideBar socketId={socketId} />
          </MUI_C.Grid>
          <MUI_C.Grid item xs={10}>
            <MUI_C.Box className="main-container">
    
              <ul>
                {allMessage.map((msg, i) => {
                  return (
                    <li key={i}>
                      {msg}
                    </li>
                  )
                })}
              </ul>
              <form onSubmit={handleSubmit} className="formsec">
                <MUI_C.Input type="text" placeholder="Write a message..." value={message} onChange={(e) => setMessage(e.target.value)} id="inputbox" />
                <MUI_C.Button type="submit">
                  <MUI_I.SendIcon />
                </MUI_C.Button>
              </form>
            </MUI_C.Box>
          </MUI_C.Grid>
        </MUI_C.Grid>


      </MUI_C.Box>

    </>
  )
} 
