import classNames from 'classnames/bind';
import styles from './Card.module.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import config from '../../config';

const cx = classNames.bind(styles)

type CardProps = {
    item: {
        store_id: string;
        name: string;
        address: string;
        logo: string;
        min_price: number;
        max_price: number;
        rate: number;
        // to: string | '/'
    };
};


function Card({item} : CardProps) {
    return ( 
        <Link to={`/storedetail/${item.store_id}`} className={cx('wrapper')}>
            <div className={cx('card-img')}>
                <img src={item.logo} alt="coffee" />
            </div>
            <div className={cx('card-content')}>
                <span className='text-3xl font-bold mb-3 h-[2.5em] line-clamp-2'>{item.name}</span>
                <span className='mb-3 line-clamp-2'>{item.address}</span>
                <span className='font-semibold'>{item.min_price} ~ {item.max_price} VND</span>
                <div className='flex felx-row items-center gap-3 '>
                    <FontAwesomeIcon icon={faStar} />
                    <span>{item.rate}</span>
                </div>
                
            </div>
        </Link>
     );
}

export default Card;