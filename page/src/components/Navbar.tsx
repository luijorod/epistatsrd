import { Link, useMatch, useResolvedPath } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        <span className="text-blue-500">epi</span>
        <span>stats</span>
        <span className="text-red-500">rd</span>
      </Link>
      <ul>
        <CustomLink to="/">Visualizaciones</CustomLink>
        <CustomLink to="/about">Acerca de</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
