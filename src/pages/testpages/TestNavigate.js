import { useLocation } from "react-router-dom";


export default function NavigateTest(){
    const location = useLocation()
    const { firstName } = location.state.signInResponse.data[0];
    

    return (
        
        <h1 onClick={()=>{console.log(firstName)}}>krushna recieved state is {firstName}</h1>

);



}