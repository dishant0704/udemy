import { Outlet } from 'react-router-dom';
import Directory from '../../components/Directory/Directory';
const home = () => {
    return (
        <div>            
            <Directory />
            <Outlet />
        </div>
        
    );
}

export default home;