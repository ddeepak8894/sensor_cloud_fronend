import { color, motion } from "framer-motion";
import { useState } from "react";
import { Container, NavLink } from "react-bootstrap";


function SideBar({childern}) {

    const [isOpen,setIsOpen] = useState(false)
    const toggle =()=>
    {
        setIsOpen(!isOpen)
    }
    const routes =[
        {
            path:"/1",
            name:"Krushna"
        },
        {
            path:"/2",
            name:"Radha"
        },   {
            path:"/2",
            name:"Radha"
        },   {
            path:"/2",
            name:"Radha"
        }
    ]
    

    return ( 
        <Container fluid style={{marginLeft:0,marginRight:0}} >
            <motion.div animate={{width: isOpen? "400px":"45px"}} className="sidebar">
                <div>
                    <h1 onClick={toggle}>
                        krushna heading
                    </h1>
                </div>
            <section>
                {routes.map(
                    (route)=>
                    { return(<NavLink to={route.path} key={route.name}>
                        <h1 style={{color:"white"}}>{route.name}</h1>
                    </NavLink>)
                        
                    })
                    
                    }
            </section>

            </motion.div>


        </Container>


     );
}

export default SideBar;