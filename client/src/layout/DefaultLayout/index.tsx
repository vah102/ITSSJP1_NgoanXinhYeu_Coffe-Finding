import { ReactNode } from "react";
import Header from "../../components/Header";
import styles from "./DefaultLayout.module.css"
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

type LayoutProps = {
    children : ReactNode
}

function DefaultLayout({children} : LayoutProps) {
    return ( 
        <div className={cx('wrapper')}>
            <Header />
            {children}
        </div>
     );
}

export default DefaultLayout;