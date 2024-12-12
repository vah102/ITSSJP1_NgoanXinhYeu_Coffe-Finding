import { ComponentType } from "react";
import config from "../config";
import Home from "../pages/Home";
import Search from "../pages/Search";
import BlackList from "../pages/BlackList";
import SearchLayout from "../layout/SearchLayout";
import DefaultLayout from "../layout/DefaultLayout";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";

interface IRoute {
    path: string;
    component: ComponentType<any>;
    layout?: ComponentType<any>
}

const publicRoutes : IRoute[] = [
    { path: config.routes.home, component: Home, layout: SearchLayout},
    { path: config.routes.search, component: Search, layout: SearchLayout},
    { path: config.routes.blacklist, component: BlackList, layout: DefaultLayout},
    {path:config.routes.login,component:Login},
    {path:config.routes.signup,component:SignUp},
    
]

export {publicRoutes} 