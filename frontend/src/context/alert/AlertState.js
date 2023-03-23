import { useState } from "react";
import AlertContext from "./AlertContext";


const AlertState= (props)=>{
    const [alert,setalert]=useState(null);
      const ShowAlert=(message,type)=>{
        setalert({msg:message,type:type});
        setTimeout(() => {
            setalert(null);
        }, 1500);
      }

      //Add Notes
      
      //delete Notes
      
      // Edit notes
      

    return(
        <AlertContext.Provider value={{alert,ShowAlert}} >
            {props.children}
        </AlertContext.Provider>
    )

}

export default AlertState;