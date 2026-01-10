import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  customItems?: { label: string; path: string }[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ customItems }) => {
  const location = useLocation();

  const getBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const pathMap: { [key: string]: string } = {
      '/who-we-are': 'Who We Are',
      '/our-stand': 'Our Stand',
      '/e-membership': 'E-Membership',
      '/election-center': 'Election Center',
      '/media-room': 'Media Room',
      '/contact': 'Contact'
    };

    const paths = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/' }];

    let currentPath = '';
    paths.forEach((path) => {
      currentPath += `/${path}`;
      const label = pathMap[currentPath] || path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
      breadcrumbs.push({ label, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null; // Don't show breadcrumbs on homepage
  }

  return (
    <nav className="bg-gray-50 border-b border-gray-200 py-3" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-6">
        <ol className="flex items-center gap-2 text-sm">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-2">
                {index === 0 ? (
                  <Link
                    to={crumb.path}
                    className="flex items-center gap-1 text-gray-600 hover:text-[#ef8636] transition"
                  >
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </Link>
                ) : (
                  <>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    {isLast ? (
                      <span className="text-sdp-dark font-semibold">{crumb.label}</span>
                    ) : (
                      <Link
                        to={crumb.path}
                        className="text-gray-600 hover:text-[#ef8636] transition"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;





