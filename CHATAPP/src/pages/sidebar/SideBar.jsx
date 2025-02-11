import { useState } from "react"
import { MUI_C } from "../../MUI Components/Components"
import { MUI_I } from "../../MUI Components/Icons"
import "../../assets/css/SideBar.css"

export default function SideBar({ children, socketId }) {
  const [data, setData] = useState([])
  const handleSubmit = async () => {
    try {
      const resData = await fetch('http://localhost:5050/getUsers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (resData.ok) {
        const data = await resData.json()
        setData(data);
      } else {
        console.log("An error occured");

      }
    } catch (error) {
      throw new Error("error occured while fetching data")
    }
  }

  return (
    <MUI_C.Container className="sidebar">
      <MUI_I.AccountCircleIcon />
      {children} <span id="idsec">{socketId}</span>
      <MUI_C.Button onClick={handleSubmit}>Add Friend</MUI_C.Button>
      <MUI_C.Grid>
        <ul> {
             data.map((user, id) => {
              return <li key={id}>
                {user.userName}
              </li>
            })
        }
        </ul>
      </MUI_C.Grid>
    </MUI_C.Container>
  )
}
