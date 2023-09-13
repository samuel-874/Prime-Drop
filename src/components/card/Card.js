import "./Card.css"

function Card ({icon,heading,subheading,height,width,borderColor,borderSolidity}){
    return(
        <div className="card" id="body-card" style={{height:height,width:width,borderColor:borderColor,border:`${borderSolidity} solid ${borderColor}`}}>
                <img id="card-icon" className="card-icon" src={icon} />
            <div id="card-text-container" className="card-text-container">
               <p id="card-heading" className="card-heading">{heading}</p>
                <p id="card-subheading" className="card-subheading">{subheading}</p>
            </div>
        </div>
    )
}

    export { Card as default }