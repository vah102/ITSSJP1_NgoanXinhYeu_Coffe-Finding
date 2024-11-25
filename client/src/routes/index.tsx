import { ComponentType } from "react";
import config from "../config";
import Home from "../pages/Home";
import DefaultLayout from "../layout/DefaultLayout";

interface IRoute {
    path: string;
    component: ComponentType<any>;
    layout?: ComponentType<any>
}

const publicRoutes : IRoute[] = [
    { path: config.routes.home, component: Home, layout: DefaultLayout},
]

export {publicRoutes} 