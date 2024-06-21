import './CatContainer.scss'
import CategoryItem from '../DirectoryItem/DirectoryItem'

const CatContainer = ({props}) => {
    return (
        <div className='categories-container'>
        {
            props.map((iteam) => (
                <CategoryItem key={iteam.id} category={iteam} />
            ))
        }
    </div>
    )    
}
export default CatContainer