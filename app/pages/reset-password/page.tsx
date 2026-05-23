
import { Form } from "react-router"
export default function resetPassword(){
    
    return(
        <div>
            <form action="/reset-password" method="POST">
            <input name="password" type="text" placeholder="new password"></input>
            <input name="confirm-password" type="text" placeholder="confirm new password" />
        
        <button>
            Save password
        </button>

   
            </form>
        </div>
    )
}