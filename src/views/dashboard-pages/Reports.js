// Import CSS
// Import major dependencies
import React, { useState, useContext, useEffect } from "react";
// Import components
import Page from "../../components/Page";
import Button from "../../components/Button";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import Auth from "../../components/Auth";
// Import icons
import { FaThumbsUp } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
// Import API and static content
import storage from "../../static/storage";
import Header from "../../components/Header";
import FileBrowser from "../../components/FileBrowser";
import PickDate from "../../components/PickDate";
import api from "../../static/api";

const MappingSlide = (props) => {
  return props.slide.map((item, i) => (
    <td key={i} className="p-4 whitespace-nowrap text-sm font-normal">
      <span className="font-semibold">{item}</span>
    </td>
  ));
};

const Reports = (props) => {
  const AuthContext = useContext(Auth.Context);
  const [showReport, setShowReport] = useState(false);
  const [report, setReport] = useState({ headers: [], slides: [], url: "" });
  const [date, setDate] = useState({});
  const [showPickDate, setShowPickDate] = useState(false);
  const [currentLogFile, setCurrentLogFile] = useState(null);
  useEffect(() => {
    if (date !== {}) {
      onGenerateReport();
    }
  }, [date]);
  const clearLocalStorage = () => {
    storage.removeAll();
    window.location.reload();
  };

  const onLogSelect = (logFile) => {
    //console.log(logFile);
    setCurrentLogFile(logFile);
    setShowPickDate(true);
  };

  const onSelectingDate = (date) => {
    setDate(date);
  };

  const onGenerateReport = async () => {
    try {
      const report_info = {
        token: AuthContext.user.token,
        log_name: currentLogFile.name,
        year: date.year,
        month: date.month,
        day: date.day,
      };
      //console.log(report_info);
      const response = await api.put_report(report_info);
      const result = response.data.result;
      const headers = result.headers.map((header) => {
        return header[0];
      });
      const slides = result.slides.map((s) => {
        const slide = s.fields.map((item) => {
          return item[1];
        });
        return slide;
      });
      //console.log(slides);
      setReport({
        headers,
        slides,
        url: result.url,
      });
      setShowReport(true);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <>
      <Header>
        <p className="h-8 flex items-center font-bold text-lg">Reports</p>
      </Header>
      <Page className="with-header">
        <FileBrowser onSelect={onLogSelect} type="log" from="all" />
        {showPickDate && (
          <div className="backdrop mt-5">
            <PickDate
              onSelectingDate={onSelectingDate}
              onGenerateReport={onGenerateReport}
            />
          </div>
        )}
        {showReport && (
          <>
            <div className="mb-4 mt-4 flex items-center justify-between">
              <p>
                Reports for log: {currentLogFile.name} created:{" "}
                {`${date.month}/${date.day}/${date.year}`}
              </p>
              {/* <div>
          <h3 className="text-xl font-bold mb-2">Active users</h3>
          <span className="text-base font-normal ">
            This is a list of all active users and their information.
          </span>
        </div> */}
            </div>

            <div className="mt-4 float-rightflex flex-col">
              <div className="overflow-x-auto">
                <div className="align-middle inline-block min-w-full">
                  <div className="shadow overflow-hidden">
                    <table className="min-w-full rounded overflow-hidden">
                      <thead className="bg-theme h-10">
                        <tr>
                          {report.headers.map((header, i) => (
                            <th
                              key={i}
                              scope="col"
                              className="px-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {report.slides.map((slide, i) => (
                          <tr key={i} className="active-user-row">
                            <MappingSlide slide={slide} />
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="flex justify-center items-center text-center float-right">
                      <a
                        className=" mt-4 h-10 w-48 flex "
                        href={report.url}
                        download
                      >
                        <button
                          className="text-white bg-theme hover:bg-carolina focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 float-right"
                          type="button"
                        >
                          <FaFileDownload className="mr-1 " />
                          Click to Donwload
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Page>
    </>
  );
};

export default Reports;
