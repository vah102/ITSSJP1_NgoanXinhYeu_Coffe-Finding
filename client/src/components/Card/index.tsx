import classNames from 'classnames/bind';
import styles from './Card.module.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)

type CardProps = {
    item: {
        _id: string;
        name: string;
        location: string;
        logo: string;
        price: number;
        rating: number;
        // to: string | '/'
    };
};


function Card({item} : CardProps) {
    return ( 
        <Link to="/" className={cx('wrapper')}>
            <div className={cx('card-img')}>
                <img src={item.logo} alt="coffee" />
            </div>
            <div className={cx('card-content')}>
                <span className='text-3xl font-bold'>{item.name}</span>
                <span className=''>{item.location}</span>
                <span className=''>~ {item.price} VND</span>
                <div className='flex felx-row items-center gap-3'>
                    <FontAwesomeIcon icon={faStar} />
                    <span>{item.rating}</span>
                </div>
                
            </div>
        </Link>
     );
}

export default Card;