import './globals.css';
import Image from 'next/image';


export const metadata = {
  title: 'MediaForge - AI Image & Video Generator',
  description: 'A simple web app to generate images and videos using the Runware API.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body style={{minHeight:'100vh',margin:0,padding:0,display:'flex',flexDirection:'column',background:'#f8f2fc'}}>
        
        <main>
          {children}
        </main>
        <footer style={{width:'100vw',background:'#f6defdff',boxShadow:'0 -2px 16px #0001',marginTop:60,padding:0,position:'relative',left:0,bottom:0}}>
          <div style={{
            width:'100%',
            maxWidth:900,
            margin:'0 auto',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            gap:16,
            padding:'14px 8px',
            fontSize:14,
            color:'#444',
            flexWrap:'wrap',
            boxSizing:'border-box'
          }}>
            <span style={{display:'flex',alignItems:'center',gap:6}}>
              Powered by
              <span style={{display:'inline-flex',alignItems:'center',height:24,verticalAlign:'middle',margin:'0 4px',gap:6}}>
                {/* I sourced the Runware logo SVG from the official runware.ai website */}
                <svg xmlSpace="preserve" viewBox="0 0 1238 228" height="24" style={{verticalAlign:'middle'}}>
                  <linearGradient id="a" x1="145.2" x2="195.8" y1="137.1" y2="240.8" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#6332ff"></stop>
                    <stop offset="1" stopColor="#a37eff"></stop>
                  </linearGradient>
                  <path fill="url(#a)" fillRule="evenodd" d="M228 228h-76l-38-76h76z" clipRule="evenodd"></path>
                  <linearGradient id="b" x1="15.4" x2="211.4" y1="36.2" y2="115.4" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#ccb3ff"></stop>
                    <stop offset=".2" stopColor="#c9afff"></stop>
                    <stop offset=".5" stopColor="#c1a2ff"></stop>
                    <stop offset=".7" stopColor="#b28eff"></stop>
                    <stop offset="1" stopColor="#9f71ff"></stop>
                    <stop offset="1" stopColor="#9e70ff"></stop>
                  </linearGradient>
                  <path fill="url(#b)" fillRule="evenodd" d="M76 76H0l38 76h76L76 76zm152 0h-76L114 0h76l38 76zM114 0H38l38 76h76L114 0z" clipRule="evenodd"></path>
                  <linearGradient id="c" x1="152.5" x2="188.8" y1="76" y2="150.5" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#6332ff"></stop>
                    <stop offset="1" stopColor="#a37eff"></stop>
                  </linearGradient>
                  <path fill="url(#c)" fillRule="evenodd" d="M228 76h-76l-38 76h76z" clipRule="evenodd"></path>
                </svg>
                <span style={{fontWeight:'bold',color:'#111',fontSize:18,marginLeft:-100,letterSpacing:'-0.5px'}}>Runware</span>
              </span>
            </span>
            <span style={{color:'#bbb'}}>|</span>
            <span style={{display:'flex',alignItems:'center',gap:4}}>
              Created by
              <a href="https://github.com/mr-ice-web" target="_blank" rel="noopener noreferrer" style={{color:'#007bff',fontWeight:'bold',display:'inline-flex',alignItems:'center',gap:4}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{marginRight:2,verticalAlign:'middle'}} xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.49 2.87 8.3 6.84 9.64.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" fill="#181717"/>
                </svg>
                Manan Agarwal
              </a>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}