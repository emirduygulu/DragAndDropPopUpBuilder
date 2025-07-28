import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            DragDropBuilder
          </Link>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/templates/popup" className="text-gray-600 hover:text-primary-600">
                  Popups
                </Link>
              </li>
              <li>
                <Link to="/templates/banner" className="text-gray-600 hover:text-primary-600">
                  Banners
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} DragDropBuilder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 