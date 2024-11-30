import Card from "./Card";

function CardList({cardContent}){
    return(
        <div className="card-Container">
            {cardContent.map((card,index)=>
            <Card 
            key={index} 
            imgSrc={card.img} 
            title={card.title} 
            description={card.description} 
            />
            )}
        </div>
        
    );
}

export default CardList