import React, { useEffect } from "react";
import { Outlet ,useLocation} from "react-router";
import Navbar from "../../components/Navbar";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import './styles.css'
import useTheme from "../../hooks/useTheme";
const Layout = () => {
  
   const location= useLocation()
      // console.log(location.pathname);

 let {isDark} = useTheme();

 //dark light mode ပြောင်းတဲ့အခါ
 useEffect(()=> {
   let body = document.body;
   if(isDark){
      body.classList.add ('bg-dbg')
   }else {
      body.classList.remove('bg-dbg')
   }
 },[isDark]);

  return (
    <div  className={isDark ? 'bg-dbg' : 'bg-white'}>
      <Navbar />
      {/* dynamic route changes content */}

      <SwitchTransition>
        <CSSTransition timeout={200} classNames='fade' key={location.pathname} >
          <div className="max-w-6xl mx-auto p-3">
            <Outlet />
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default Layout;
