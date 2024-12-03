import { ComponentType } from "react";
import config from "../config";
import Home from "../pages/Home";
import Search from "../pages/Search";
import SearchLayout from "../layout/SearchLayout";

interface IRoute {
    path: string;
    component: ComponentType<any>;
    layout?: ComponentType<any>
}

const publicRoutes : IRoute[] = [
    { path: config.routes.home, component: Home, layout: SearchLayout},
    { path: config.routes.search, component: Search, layout: SearchLayout},
]

export {publicRoutes} 