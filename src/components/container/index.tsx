import {ReactNode} from 'react';
import './styles.scss';

const Container = ({children}: {children?: ReactNode}) => {
    return (
        <div className="container">
            {children}
        </div>
    )
}

export default Container