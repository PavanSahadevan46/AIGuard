import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import criteria from "../criteria.json";

function RouteContainer() {
  const nav = useNavigate();
  const routes = criteria.routeOptions[0].routes;

  return (
    <div className="container mx-auto px-4 py-8">
      {routes.map((route, index) => (
        <Link
          key={index}
          className="block mx-auto px-2 py-3 font-bold text-center mb-3 align-middle border-1 rounded"
        //   onClick={() => nav(`/${route.toLowerCase()}`)}
          to={`${route.toLowerCase()}`}
        >
          {route}
        </Link>
      ))}
    </div>
  );
}

export default RouteContainer;
