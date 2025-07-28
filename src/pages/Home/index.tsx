import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

// Temporary Layout component
const Layout = ({ children }: { children: ReactNode }) => (
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

const HomePage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to DragDropBuilder</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create beautiful popups and banners with our easy-to-use drag and drop builder.
            No coding required!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Popup Card */}
          <div className="card overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-primary-500 flex items-center justify-center">
              <div className="bg-white w-3/4 h-3/4 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-xl font-semibold text-gray-800">Popup Example</span>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Popup Builder</h2>
              <p className="text-gray-600 mb-4">
                Create engaging popups for email collection, promotions, announcements and more.
              </p>
              <Link to="/templates/popup" className="btn btn-primary block text-center">
                Create Popup
              </Link>
            </div>
          </div>
          
          {/* Banner Card */}
          <div className="card overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-secondary-500 flex items-center justify-center">
              <div className="bg-white w-full h-1/4 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-xl font-semibold text-gray-800">Banner Example</span>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Banner Builder</h2>
              <p className="text-gray-600 mb-4">
                Design eye-catching banners for your website header, footer, or any section.
              </p>
              <Link to="/templates/banner" className="btn btn-primary block text-center">
                Create Banner
              </Link>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Need help getting started? Check out our documentation.
          </p>
          <a href="#" className="text-primary-600 hover:underline">
            View Documentation
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage; 