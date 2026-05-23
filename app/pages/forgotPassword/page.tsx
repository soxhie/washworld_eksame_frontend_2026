import "../../globals.css"
import "./forgot-password.css"
export default function forgotPassword(){
    return(
        <div className="forgot-password">
           <h1>Forgot password?</h1>
           <form action="/forgot-password" method="POST">
           <label htmlFor="">Email</label>
           <input type="text" name="user_email" id="" />
            <button>Send email</button>
           </form>
        </div>
    )
}