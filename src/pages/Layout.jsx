import { Outlet, Link } from "react-router-dom";
import "./Layout.css"

const Layout = () => {
    const isLoggedIn = localStorage.getItem("login") === "true"


 
    const handleClick = () => {
        window.location.reload();
    };
    return (
        <>
            <div className="header-container">
                <div className="header1">
                    Drone Delivery Service
                </div>
                <div className="header2">
                    Welcome Valued Customer!
                </div>

                <nav>
                    <ul className="navbar">
                        <li><a href="/">Home</a></li>
                        <li><a href="/store">Store</a></li>
                        <li><a href="/items/1">Start Shopping</a></li>
                        <li><a href="/order">History Order</a></li>

                        {/* Render Login and Logout links conditionally */}
                        {isLoggedIn ? (
                         <li><Link to="/logout" onClick={handleClick}>Logout</Link></li>   
                        ) : (
                            <>
                                <li><Link to="/login">Login</Link></li>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <li><Link to="/signup">Sign up</Link></li>  
                            </>
                        )}
                    </ul>
                </nav>
            </div>
            <Outlet />
        </>
    )
};

export default Layout;