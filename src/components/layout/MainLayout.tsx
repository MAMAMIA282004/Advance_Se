
import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, hideFooter = false }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
