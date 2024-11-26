import classNames from 'classnames/bind';
import styles from './Filter.module.css'
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)

function Filter() {
    return ( 
        <div className={cx('wrapper')}>
            <div className='w-full flex flex-row items-center justify-between'>
                <h2 className='text-3xl font-bold'>Filter</h2>
                <Button icon={<FontAwesomeIcon icon={faRotateRight} />}>Clear Filters</Button>
            </div>
        </div>
     );
}

export default Filter;