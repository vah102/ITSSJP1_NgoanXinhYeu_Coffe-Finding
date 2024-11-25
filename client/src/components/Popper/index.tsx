import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

function Popper({ children }: Props) {
    return <div className="w-full bg-white py-3 rounded-lg">{children}</div>;
}

export default Popper;
