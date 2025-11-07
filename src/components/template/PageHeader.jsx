import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import * as echarts from "echarts";
import {
  visitorsSparcalOption,
  visitsSparcalOption,
} from "../../assets/js/chartData.js";

const PageHeader = ({ HeaderText = "", Breadcrumb = [] }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const visitorsChartRef = useRef(null);
  const visitsChartRef = useRef(null);

  useEffect(() => {
    const chartPlace = () => {
      const chartDom = document.getElementById("visitorsSparcalChart");
      if (chartDom && !visitorsChartRef.current) {
        try {
          visitorsChartRef.current = echarts.init(chartDom);
          visitorsChartRef.current.setOption(visitorsSparcalOption);
        } catch (error) {
          console.error("Error initializing visitors chart:", error);
        }
      }
    };

    const chartPlace1 = () => {
      const chartDom = document.getElementById("visitsSparcalChart");
      if (chartDom && !visitsChartRef.current) {
        try {
          visitsChartRef.current = echarts.init(chartDom);
          visitsChartRef.current.setOption(visitsSparcalOption);
        } catch (error) {
          console.error("Error initializing visits chart:", error);
        }
      }
    };

    chartPlace();
    chartPlace1();

    return () => {
      if (visitorsChartRef.current) {
        try {
          visitorsChartRef.current.dispose();
        } catch (error) {
          console.error("Error disposing visitors chart:", error);
        }
        visitorsChartRef.current = null;
      }
      if (visitsChartRef.current) {
        try {
          visitsChartRef.current.dispose();
        } catch (error) {
          console.error("Error disposing visits chart:", error);
        }
        visitsChartRef.current = null;
      }
    };
  }, []);

  const onToggleMenu = useCallback((e) => {
    e.preventDefault();
    setToggleMenu((prevToggleMenu) => {
      const newToggleState = !prevToggleMenu;
      if (newToggleState) {
        document.body.classList.add("layout-fullwidth");
      } else {
        document.body.classList.remove("layout-fullwidth");
      }
      return newToggleState;
    });
  }, []);

  const iconClassName = useMemo(
    () => (!toggleMenu ? "fa fa-arrow-left" : "fa fa-arrow-right"),
    [toggleMenu]
  );

  return (
    <div className="block-header">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full lg:w-5/12 md:w-1/2 px-3">
          <h2>
            <button
              type="button"
              className="inline-flex items-center justify-center p-1 text-xs text-blue-600 hover:text-blue-800 hover:underline bg-transparent border-0 cursor-pointer btn-toggle-fullwidth"
              onClick={onToggleMenu}
              aria-label={toggleMenu ? "Collapse sidebar" : "Expand sidebar"}
            >
              <i className={iconClassName} aria-hidden="true"></i>
            </button>{" "}
            {HeaderText}
          </h2>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 p-0 m-0 list-none text-sm">
              <li className="flex items-center">
                <a
                  href="/dashboard"
                  aria-label="Home"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="icon-home" aria-hidden="true"></i>
                </a>
              </li>
              {Breadcrumb.map((item, index) => (
                <li key={`${item.name}-${index}`} className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  {item.navigate ? (
                    <a
                      href={item.navigate}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <span className="text-gray-700">{item.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
        <div className="w-full lg:w-7/12 md:w-1/3 sm:w-full px-3 text-right">
          <div className="inline-block text-center mr-4 ml-4 hidden sm:inline-block">
            <div
              id="visitorsSparcalChart"
              className="sparkline text-left w-[12vh] h-[25px]"
              role="img"
              aria-label="Visitors chart"
            ></div>
            <span>Visitors</span>
          </div>
          <div className="inline-block text-center mr-4 ml-4 hidden sm:inline-block">
            <div
              id="visitsSparcalChart"
              className="sparkline text-left w-[12vh] h-[25px]"
              role="img"
              aria-label="Visits chart"
            ></div>
            <span>Visits</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
