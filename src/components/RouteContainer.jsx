import criteria from "../criteria.json";
import SteroidRoute from "./SteroidRoute";
function RouteContainer() {
    const routes = criteria.routeOptions[0].routes;
    return (
        <div>
            {routes.map((route, index) => (
                <SteroidRoute key = {index} title={route} />
            ))}
        </div>

    )
}

export default RouteContainer