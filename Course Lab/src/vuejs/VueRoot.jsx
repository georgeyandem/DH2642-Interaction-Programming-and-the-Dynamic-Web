import Summary from "./summaryPresenter.jsx";
import Sidebar from "./sidebarPresenter.jsx";
import Search from "./searchPresenter.jsx";
import Details from "./detailsPresenter.jsx";

import {createRouter, RouterView, createWebHashHistory} from "vue-router";

export function makeRouter(model) {
    return createRouter({
        history: createWebHashHistory(),
        routes: [
            {
                path: "/",
                component: <Search model={model} />
            },
            {
                path: "/search",
                component: <Search model={model} />
            },
            {
                path: "/details",
                component: <Details model={model} />
            },
            {
                path: "/summary",
                component: <Summary model={model} />
            }
        ]});
}

export function VueRoot(props){

    if (props.model.ready) {
        return (
            <div class="flex_parent">
                <div>
                    <Sidebar model={props.model} class="sidebar"/>
                </div>
                <div class="main_content">
                    <RouterView />
                </div>
            </div>
        );
    }
    else {                      
        return (
            <div class="flex_parent">
                <div>
                    <img src="https://brfenergi.se/iprog/loading.gif"/>
                </div>
                <div class="main_content">
                    <RouterView />
                </div>
            </div>
        );
    }
}

export default VueRoot;
