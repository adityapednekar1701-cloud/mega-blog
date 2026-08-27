import React from 'react'
import { useSelector } from 'react-redux'
import Container from './container/Container';
import { Link } from 'react-router-dom';
import LogOutBtn from './LogOutBtn';
import Logo from './Logo';

function Header() {

  const authStatus = useSelector((state)=>{
     return state.auth.status;
  })    

  const navItems = [
    {
       name:"Home",
       url:"/",
       active:true 
    },
    {
       name:"Login",
       url:"/login",
       active:!authStatus 
    },
    {
       name:"SignUp",
       url:"/signup",
       active:!authStatus 
    },
    {
       name:"All Posts",
       url:"/all-posts",
       active:authStatus 
    },
    {
       name:"Add Post",
       url:"/add-post",
       active:authStatus 
    },
  ]

  
  return (
   <header className="site-header">
    <Container>
       <nav className="nav">
        <div>
          <Link className="nav-logo-link" to="/">
             <Logo width='100px'></Logo>
          </Link>
        </div>
        <ul className="nav-list">
             {navItems.map((item)=>{return item.active ? (<li key={item.name}><Link className="nav-link" to={item.url}>{item.name}</Link></li>) : null})}
             {authStatus && (
             <li>
               <LogOutBtn />
             </li>
              )}
        </ul>
    </nav>
    </Container>
</header>
  ) 
}

export default Header