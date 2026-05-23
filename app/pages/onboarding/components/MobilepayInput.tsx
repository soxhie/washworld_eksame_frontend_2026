

export default function MobilePayInput(){
    return(
        <div style={{display:"flex", flexDirection:"column"}}>
             <label htmlFor="">Telefonnummer</label>
            <input
                type="text"
                name="user_phone"
                id="user_phone"
            />
        </div>
    )
}