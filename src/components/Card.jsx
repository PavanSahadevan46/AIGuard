function Card({ img, title, description }) {
    return (
    <div className="card">
        <div id="logo">
            <img className ="card-image" src= {img} alt="temp alt"/>
        </div>
        <h2 className ="card-title">{title}</h2>
        <p className ="card-description">{description}</p>
    </div> 
    );
}

export default Card


