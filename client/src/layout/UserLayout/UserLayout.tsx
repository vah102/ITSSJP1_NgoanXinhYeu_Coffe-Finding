import React, { ReactNode } from "react";
import Header from "../../components/Header";
import UserSidebar from "../../components/UserSidebar/UserSidebar";
type LayoutProps = {
    children: ReactNode;
};
export default function UserLayout({ children }: LayoutProps) {
    return (
        <div className="bg-[#F1E5D9] min-h-screen">
            <div className="fixed w-full z-50">
                <Header />
            </div>
            <div className=" px-10 pb-10 pt-64 flex flex-row gap-10">
                <div className="fixed">
                    <UserSidebar />
                </div>
                <div className="pl-[280px] w-full">{children}</div>
            </div>
        </div>
    );
}
