import { ComponentType } from "react";
import config from "../config";
import Home from "../pages/Home";
import DefaultLayout from "../layout/DefaultLayout";
import Search from "../pages/Search";

interface IRoute {
    path: string;
    component: ComponentType<any>;
    layout?: ComponentType<any>
}

const publicRoutes : IRoute[] = [
    { path: config.routes.home, component: Home, layout: DefaultLayout},
    { path: config.routes.search, component: Search, layout: DefaultLayout},
]

export {publicRoutes} 