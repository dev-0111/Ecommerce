import { Link, Navigate, useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const userData = JSON.parse(auth)

  const logout = () => {
    localStorage.clear();
    navigate("/login");

    console.warn("LogOut SuccessFully");
  };

  return (
    <div>
        <img src="/logo.svg" alt="logo" className="nav-logo"/>
      {auth ? 
        <ul className="nav-ul">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Product</Link>
          </li>
          <li>
            <Link to="/update">Update Product</Link>
          </li>
          <li></li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>

          {/* <li>{auth?<Link onClick={logout} to = "/sign-in">Logout</Link>:<Link to = "/sign-up">SignUp</Link>}</li>
                <li>{auth?<Link onClick={logout} to = "/sign-in">Logout</Link>:<Link to = "/login">SignIn</Link>}</li> */}

          {auth ? (
            <li>
              <Link onClick={logout} to="/login">
                Logout ({userData.name})
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/sign-up">SignUp</Link>
              </li>
              <li>
                <Link to="/login">SignIn</Link>
              </li>
            </>
          )}
        </ul>
       : 
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/sign-up">SignUp</Link>
          </li>
          <li>
            <Link to="/login">SignIn</Link>
          </li>
        </ul>
      }
    </div>
  );
};

export default Navbar;
