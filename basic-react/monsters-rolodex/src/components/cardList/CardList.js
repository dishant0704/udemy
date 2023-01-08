import './card-list.styles.css'
import Card from '../Card/Card';

const CardList = ({ listData }) =>{  
    return (
        <div className='card-list'>
        {listData.map((listItem)=>{           
            return(
                <Card cardData={listItem} key={`card_${listItem.id}`}/>                
            )
        })
        }
        </div>
    )
}

export default CardList
