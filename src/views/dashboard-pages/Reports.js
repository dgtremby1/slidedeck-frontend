// Import CSS
// Import major dependencies
import React, { useState, useContext, useEffect } from "react";
// Import components
import Page from "../../components/Page";
import Button from "../../components/Button";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import Auth from "../../components/Auth";
import LoadSpinner from "../../components/LoadSpinner";
import Banner from "../../components/Banner";
// Import icons
import { FaThumbsUp } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
// Import icons
import { TiUserDelete } from "react-icons/ti";
import { FaTrashAlt } from "react-icons/fa";
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
  const [showError, setShowError] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showLoading, setShowLoading] = useState(false);
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
    const months = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
    ];
    try {
      const report_info = {
        token: AuthContext.user.token,
        log_name: currentLogFile.name,
        year: date.year,
        month: date.month,
        day: date.day,
      };
      const currentYear = new Date().getFullYear();
      if (report_info.day < 0 || report_info.day > 31) {
        setErrorMessage("Invalid day. Please enter a valid day.");
        setShowError(true);
      } else if (report_info.year > currentYear) {
        setErrorMessage("Invalid year. Please enter a valid year.");
        setShowError(true);
      } else if (
        (report_info.day < 0 || report_info.day > 31) &&
        report_info.year > currentYear
      ) {
        setErrorMessage(
          "Invalid day and year. Please enter a valid day and a valid year."
        );
        setShowError(true);
      } else if (
        report_info.month === "" ||
        report_info.day === "" ||
        report_info.year === ""
      ) {
        setErrorMessage(
          "Some date fields are inconplete. PLease enter all date information."
        );
        setShowError(true);
      } else {
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
        setShowMessage(true);
      }
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
            <Banner
              dismiss={() => {
                setShowError(false);
              }}
              show={showError}
            >
              {errorMessage}
            </Banner>
            <PickDate
              onSelectingDate={onSelectingDate}
              onGenerateReport={onGenerateReport}
            />
          </div>
        )}
        {showReport &&
          (report.slides.length === 0 ? (
            showMessage && (
              <div className="bg-opacity-0">
                <div
                  className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
                  id="modal-id"
                >
                  <div className="absolute bg-black opacity-50 inset-0 z-0"></div>
                  <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded shadow-lg  backdrop-bg">
                    <div className="">
                      <div className="text-center p-5 flex-auto justify-center content-center">
                        <h2 className="text-xl font-bold py-4 ">
                          Empty Report
                        </h2>
                        <p className="px-8">
                          The report you query does not contains any records.
                          Please choose a different report.
                        </p>
                      </div>
                      <div className="p-3 flex justify-center items-center mt-2 text-center space-x-4">
                        {/* <button
                className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                onClick={props.onCancel}
              >
                Cancel
              </button>
              <button className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600">
                Delete
              </button> */}
                        <Button onClick={() => setShowMessage(false)}>
                          Close
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : (
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
          ))}
      </Page>
    </>
  );
};

export default Reports;
