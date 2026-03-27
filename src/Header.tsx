import type React from "react";
import './styles/Header.css'

function Header({ children }: { children: React.ReactNode }) {
  return(
    <div id="wrapper">
      <header id="top-bar">
        <ul>
          <li><a href="./">作曲家PDチェッカー (トップ)</a></li>
          <li><a href="./about">このツールについて (About)</a></li>
        </ul>
      </header>
      <main>
        {children}
      </main>
    </div>
  )
}

export default Header;