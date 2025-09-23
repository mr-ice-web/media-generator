// src/app/layout.js

// This line imports the global CSS file to apply styles everywhere.
import './globals.css';

// This is metadata for your site (shows up in the browser tab).
export const metadata = {
  title: 'Runware Image Generator',
  description: 'A simple web app to generate images using the Runware API.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        {/* The 'children' prop here will be your page.js component */}
        {children}
      </body>
    </html>
  );
}