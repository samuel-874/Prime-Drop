import "./Button.css"
function Button ({icon, minitext,largetext,backgroundcolor,color}){
    return(
        <div style={{backgroundColor:backgroundcolor}} className="btn-div">
            <div className="tiny-icon-container">
                <img className="tiny-icon" src={icon} />
            </div>
            <div className="div-btn-text-container">
                <span className="tiny-text">{minitext}</span><span style={{color:color}} id="large-text">{largetext}</span>
            </div>
        </div>  
    )
}

    export { Button as default }