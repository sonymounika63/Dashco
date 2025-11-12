/**
 * PageHeader Component - Tailadmin Style
 * Updated: Removed date widget (sparkline charts) as per requirements
 * Displays page title and breadcrumb navigation only
 * @param {Object} props - Component props
 * @param {string} props.HeaderText - The main page heading text
 * @param {Array<{name: string, navigate?: string}>} props.Breadcrumb - Array of breadcrumb items
 */
import { useMemo } from "react";

const PageHeader = ({ HeaderText = "", Breadcrumb = [] }) => {


  // Memoize breadcrumb items to prevent unnecessary re-renders
  const breadcrumbItems = useMemo(
    () =>
      Breadcrumb.map((item, index) => (
        <li
          key={`breadcrumb-${item.name}-${index}`}
          className="breadcrumb-item active"
        >
          {item.navigate ? (
            <a href={item.navigate} className="dark:text-gray-400 dark:hover:text-white transition-colors duration-200">{item.name}</a>
          ) : (
            <span className="dark:text-white/90 transition-colors duration-200">{item.name}</span>
          )}
        </li>
      )),
    [Breadcrumb]
  );

  return (
    <div className="block-header dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200 mb-6">
      <div className="row">
        <div className="col-12">
          <h2 className="dark:text-white/90 transition-colors duration-200 text-2xl font-semibold mb-2">
            {HeaderText}
          </h2>
          <nav aria-label="Breadcrumb">
            <ul className="breadcrumb flex items-center gap-2">
              <li className="breadcrumb-item">
                <a href="/dashboard" className="dark:text-gray-400 dark:hover:text-white transition-colors duration-200" aria-label="Home">
                  <i className="fa-solid fa-home" aria-hidden="true"></i>
                </a>
              </li>
              {breadcrumbItems}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
