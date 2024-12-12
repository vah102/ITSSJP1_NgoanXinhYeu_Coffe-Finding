import { ReactNode } from "react";
import Header from "../../components/Header";

type LayoutProps = {
    children : ReactNode
}

function DefaultLayout({children} : LayoutProps) {
    return ( 
        <div className="bg-[#F1E5D9] min-h-screen">
            <div className="fixed w-full z-50">
                <Header />
            </div>
            <div className=" px-10 pb-10 pt-40 flex flex-row gap-10">
                <div className="w-full">{children}</div>
            </div>
        </div>
     );
}

export default DefaultLayout;