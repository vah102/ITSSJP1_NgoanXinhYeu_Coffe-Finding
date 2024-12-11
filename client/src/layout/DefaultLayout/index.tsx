import { ReactNode } from "react";
import Header from "../../components/Header";
// import styles from "./DefaultLayout.module.css"
import classNames from "classnames/bind";

// const cx = classNames.bind(styles)

type LayoutProps = {
    children : ReactNode
}

function DefaultLayout({children} : LayoutProps) {
    return ( 
        <div className="bg-[#F1E5D9] min-h-screen">
            <div className="fixed w-full z-50">
                <Header />
            </div>
            <div className="pb-10 flex flex-row gap-10">
                <div className="w-full">{children}</div>
            </div>
        </div>
     );
}

export default DefaultLayout;