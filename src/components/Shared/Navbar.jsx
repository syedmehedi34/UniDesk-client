import { Link } from "react-router";
import { useAuth } from "../../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useAuth();
  // console.log(user);

  return (
    <div className="mb-4 text-center">
      <Link to="/" className="mx-2">
        Home
      </Link>
      <Link to="/colleges" className="mx-2">
        Colleges
      </Link>
      <Link to="/admission" className="mx-2">
        Admission
      </Link>

      {user ? (
        <>
          <Link to="/my-college" className="mx-2">
            My College
          </Link>
          <button onClick={logOut} className="mx-2">
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="mx-2">
            Login
          </Link>
          <Link to="/register" className="mx-2">
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
