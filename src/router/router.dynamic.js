import React from "react";
import staticRoutes from "./routes.static";
function getRouterData(tree, flag = true) {
  let routes = [];
  for (let i = 0; i < tree.length; i++) {
    let Component = React.lazy(() => import(`@/views/${tree[i].component}`));
    let path = null;
    path = tree[i].path;
    if (!flag) {
      tree[i].path[0] === "/"
        ? (path = tree[i].path.slice(1, tree[i].length))
        : (path = tree[i].path);
    }
    routes.push({
      path: path,
      element: (
        <React.Suspense fallback={<div></div>}>
          <Component />
        </React.Suspense>
      ),
      children: tree[i].children
        ? getRouterData(tree[i].children, false)
        : null,
    });
  }
  return routes;
}
const generateRoutes = () => {
  const tree = localStorage.getItem("user_menus")
    ? JSON.parse(localStorage.getItem("user_menus"))
    : [];
  const routerData = getRouterData(tree);
  return [...routerData, ...staticRoutes];
};

export default generateRoutes;
