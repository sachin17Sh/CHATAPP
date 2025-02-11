
import { MUI_C } from "../../MUI Components/Components";
import "../../assets/css/Modal.css";

export default function Modal({ children, open, title }) {
  return (
    <MUI_C.Dialog open={open} className="modal">
      <h1>{title}</h1>
      {children}
    </MUI_C.Dialog>)
}

