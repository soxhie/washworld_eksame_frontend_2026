import "../onboarding.css"

export default function Toggle(){

    return(
        <div>
            <div className="toggleContainer">
                <p>Jeg acceptere <a href="">Terms & Condtions</a></p>
                <label className="switch">
                    <input type="checkbox" required />
                    <span className="slider round"></span>
                </label>
            </div>
            <div className="toggleContainer">
                <p>Jeg acceptere <a href="">Privacy guidelines</a></p>
                <label className="switch">
                    <input type="checkbox" required  />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    )
}