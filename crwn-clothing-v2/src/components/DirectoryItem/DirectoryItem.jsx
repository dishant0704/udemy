import { useNavigate } from 'react-router-dom';
import './DirectoryItem.scss'
const DirectoryItem = ({category}) => {
    const { title, btnText, imageUrl, route } = category;
    const navigate = useNavigate()
    const onNavigateHandler = () => navigate(route);
    return (
        <div className='directory-item-container' onClick={onNavigateHandler}>
        <div className='background-image' style={{ backgroundImage: `url(${imageUrl})` }} />
        <div className='body' >
            <h2>{title}</h2>
            <p>{btnText}</p>
        </div>
    </div >
    )
}
export default DirectoryItem