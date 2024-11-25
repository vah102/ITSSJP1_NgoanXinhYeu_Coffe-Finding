import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from './PopperItem.module.css'
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

type Props = {
    children : ReactNode
    icon? : ReactNode
    to? : string
    onClick? : () => void
}

function PopperItem({children, icon, to, onClick} : Props) {

    const props = {children, icon, to, onClick}
    
    let Comp : React.ElementType = 'div'

    if(to) Comp = Link

    return ( 
        <Comp className={cx('wrapper')} {...props}>
            {icon && <span>{icon}</span>}
            <span className="px-3">{children}</span>
        </Comp>
     );
}

export default PopperItem;