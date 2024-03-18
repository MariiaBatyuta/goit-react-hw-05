import { NavLink } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div>
            <p>Oooops... Something went wrong.</p>
            <NavLink to="/">Go to Home Page!</NavLink>
        </div>
    )
}