import './card-list.styles.css'
import Card from '../Card/Card';
import { Monster } from '../../App'

type cardListProps = {
    Monster: Monster[]
}

const CardList = ({ Monster }:cardListProps) =>{  
    return (
        <div className='card-list'>
        {Monster.map((listItem)=>{           
            return(
                <Card monster={listItem} key={`card_${listItem.id}`}/>                
            )
        })
        }
        </div>
    )
}

export default CardList
