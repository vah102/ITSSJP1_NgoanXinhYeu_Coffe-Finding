import classNames from 'classnames/bind';
import styles from './Button.module.css'
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles)

type ButtonProps = {
    children? : ReactNode
    to? : string
    primary? : boolean
    icon? : ReactNode
    type?: "button" | "submit" | "reset" | undefined
    onClick? : () => void
}

function Button({children, to, primary, icon, type, onClick} : ButtonProps) {

    let props = {children, to, icon, type}

    let Comp : React.ElementType = "button"

    const classes = cx('button', { primary })

    if (to) {
        Comp = Link
    }

    return ( 
        <Comp className={classes} {...props} onClick={onClick}>
            {icon && <span>{icon}</span>}
            <span className='font-semibold px-3'>{children}</span>
        </Comp>
     );
}

export default Button;