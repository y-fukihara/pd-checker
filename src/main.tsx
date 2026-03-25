import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'sanitize.css'
import 'sanitize.css/forms.css'
import 'sanitize.css/assets.css'
import 'sanitize.css/typography.css'
import 'sanitize.css/system-ui.css'
import './index.css'
import './main.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <link rel="preconnect" href="https://fonts.googleapis.com"></link>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"></link>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
    <link href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+Antique:wght@300;400;500;700;900&display=swap" rel="stylesheet"></link>

    <hgroup>
      <h1>作曲家PDチェッカー</h1>
      <p>作曲家の生没年と国籍から、著作権の存続期間を判定します。</p>
    </hgroup>
    <div id="disclaimer">
      <h2>免責事項</h2>
      <p>本ツールは法的なアドバイスを提供するものではありません。あくまで参考情報としてご利用ください。</p>
    </div>
    <main>
      <App />
    </main>
  </StrictMode>,
)
