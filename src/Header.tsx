import './styles/Header.css'
import { Outlet } from "react-router";

function Header() {
  return(
    <div id="wrapper">
      <header id="top-bar">
        <ul>
          <li><a href="./">作曲家PDチェッカー (トップ)</a></li>
          <li><a href="./about">このツールについて (About)</a></li>
        </ul>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Header;