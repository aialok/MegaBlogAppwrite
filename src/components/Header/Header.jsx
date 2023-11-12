import React from "react";
import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { login } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Container } from "../index";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Posts",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-slate-300">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          <ul className="flex">
            {navItems.map(
              (item, index) =>
                item.active && (
                  <li key={index} className="mr-4" onClick={()=>navigate(item.slug)}>
                    {item.name}
                  </li>
                )
            )}
          </ul>
          {authStatus && <LogoutBtn />}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
