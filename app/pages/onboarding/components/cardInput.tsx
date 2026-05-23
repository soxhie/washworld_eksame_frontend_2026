

export default function CardInput(){
    return(
        <div>
            <div style={{display:"flex", flexDirection:"column"}}>
            <label htmlFor="">Kortnummer</label>
            <input type="text" />
            </div>
            <div style={{display:"flex"}}>
                <div>
                    <label htmlFor="">Udløbsdato</label>
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor="">CVV</label>
                    <input type="text" size={3}/>
                    
                </div>
            </div>

        </div>
    )
}