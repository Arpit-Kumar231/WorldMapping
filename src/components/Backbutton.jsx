import { useNavigate } from "react-router-dom";
import Button from "./Button";

const Backbutton = () => {
    const Navigate = useNavigate();
  return (
    <div>
        <Button type="back" onClick={(e) => {
          e.preventDefault();
          Navigate(-1)}}>&larr; Back</Button>
    </div>
  )
}

export default Backbutton