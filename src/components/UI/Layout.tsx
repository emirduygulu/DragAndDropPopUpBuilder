import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="w-full max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            DragDropBuilder
          </Link>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary-600">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-gray-600 hover:text-primary-600">
                  Şablonlar
                </Link>
              </li>
              <li>
                <Link to="/templates/popup" className="text-gray-600 hover:text-primary-600">
                  Popup'lar
                </Link>
              </li>
              <li>
                <Link to="/templates/banner" className="text-gray-600 hover:text-primary-600">
                  Bannerlar
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
        <div className="w-full max-w-7xl mx-auto px-4 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} DragDropBuilder. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 