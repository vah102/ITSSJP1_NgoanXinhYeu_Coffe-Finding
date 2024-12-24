import { ReactNode } from "react";
import Header from "../../components/Header";
import Filter from "../../components/Filter";

type LayoutProps = {
    children: ReactNode;
};

function SearchLayout({ children }: LayoutProps) {
    return (
        <div className="bg-[#F1E5D9] min-h-screen">
            <div className="fixed w-full z-50">
                <Header />
            </div>
            <div className=" px-10 pb-10 pt-64 flex flex-row gap-10">
                <div className="fixed"><Filter /></div>
                <div className="pl-[280px] w-full">{children}</div>
            </div>
        </div>
    );
}

export default SearchLayout;
