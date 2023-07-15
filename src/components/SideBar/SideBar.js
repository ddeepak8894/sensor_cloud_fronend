import "./SideBar.css"
import { SideBarData } from "./SideBarData";

function SideBar() {

  return ( 
  <div className="SideBar">
    <ul className="Sidebarlist">
    {
      SideBarData.map((val,key)=>{
        return <li className="row" id={window.location.pathname == val.link? "active":""} key={key} onClick={()=>{window.location.pathname = val.link}}>
          <div id="icon">{val.icon}</div>
          <div id="title">{val.title}</div>
        </li>
      }) 
    }

    </ul>
   
    

  </div> );
}

export default SideBar;