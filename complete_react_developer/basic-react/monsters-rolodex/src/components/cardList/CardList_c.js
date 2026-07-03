import React, { Component } from 'react'
import './card-list.styles.css'
import Card from '../Card/Card';

class CardList extends Component {
  render() {
    const { listData } = this.props
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
}

export default CardList
