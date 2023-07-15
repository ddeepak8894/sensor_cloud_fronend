import "./TopBar.css"

import { SideBarData } from "../SideBar/SideBarData";
import { Stack } from "react-bootstrap";


function TopBar() {
    return ( 
        <div className="TopBar">
    <Stack direction="horizontal" className="TopBarlist">
    {
      SideBarData.map((val,key)=>{

        return <Stack  className="row" direction="horizontal" id={window.location.pathname == val.link? "active":""} key={key} onClick={()=>{window.location.pathname = val.link}}>
          <div id="icon">{val.icon}</div>
          <div id="title">{val.title}</div>
        </Stack>
      }) 
    }

    </Stack>
   
    

  </div> 
     );
}

export default TopBar;