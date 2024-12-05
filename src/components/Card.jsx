function Card({ img, title, description }) {
    return (
    <div className="card">
        <img className ="card-image" src= {img} alt={title}/>
        <h2 className ="card-title">{title}</h2>
        <p className ="card-description">{description}</p>
    </div> 
    );
}

export default Card


