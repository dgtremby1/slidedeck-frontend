// Import major dependencies
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

//Import components
import Banner from "../components/Banner";
import LoadSpinner from "../components/LoadSpinner";
import Auth from "../components/Auth";

// Import API
import api from "../static/api";

// Import icons
import { FiLogIn } from "react-icons/fi";
// import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";

const Register = (props) => {
  const AuthContext = useContext(Auth.Context);
  const history = useHistory();
  const [bannerShow, setBannerShow] = useState(false);
  const [bannerText, setBannerText] = useState(false);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    const user = {
      name: fullName,
      username: username,
      password: password,
      code: code,
      email: email,
    };

    if (
      user.name === "" ||
      user.username === "" ||
      user.password === "" ||
      user.code === "" ||
      user.email === ""
    ) {
      setBannerText(
        "All fields are required. Please enter the information as requested."
      );
      setBannerShow(true);
      setLoading(false);
    } else {
      const response = api.post_register(user, onSuccess);
      console.log(response);
      //   if (!response.result) {
      //     setBannerText("Registration failed. Please check your one time code.");
      //   }
    }
  };

  const onSuccess = (data) => {
    setLoading(false);
    //console.log(data);
    if (data.result) {
      const newUser = { ...data.user };
      newUser.loggedIn = true;
      AuthContext.setUser(newUser);
      history.push("/dashboard/home");
    } else {
      AuthContext.setUser(Auth.defaultUser);
      setBannerShow(true);
    }
  };
  return (
    <div>
      <Banner
        show={bannerShow}
        dismiss={() => {
          setBannerShow(false);
        }}
      >
        {bannerText}
      </Banner>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div
          className="
          flex flex-col
          shadow-lg
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          py-8
          w-50
          max-w-md
        "
        >
          <div className="flex justify-center">
            <img
              alt="Slidedeck logo"
              src="/assets/slidedeck-logo.svg"
              className="w-52 light-logo"
            />
            <img
              alt="Slidedeck logo"
              src="/assets/slidedeck-logo-w.svg"
              className="w-52 dark-logo"
            />
          </div>
          <div className="mt-5">
            <div className="font-medium self-center content-center justify-center flex text-lg sm:text-3lg">
              Sign Up
            </div>
            <div className="mb-4 self-center text-xl sm:text-sm">
              Enter your credentials to create account
            </div>
            <form>
              <div className="flex flex-col mb-5">
                <label className="mb-1 text-xs tracking-wide">Name:</label>
                <div className="relative">
                  <div
                    className="
                    inline-flex
                    placeholder-gray-500
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                  "
                  >
                    <RiContactsFill className="fas fa-user text-theme" />
                  </div>

                  <input
                    onChange={(e) => setFullName(e.target.value)}
                    id="name"
                    type="name"
                    name="name"
                    className="
                    text-sm
                    pl-10
                    pr-4
                    rounded
                    text-gray-800
                    border
                    w-full
                    py-2
                  "
                    placeholder="Enter your name"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-5">
                <label className="mb-1 text-xs tracking-wide">
                  E-Mail Address:
                </label>
                <div className="relative">
                  <div
                    className="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                  "
                  >
                    <MdOutlineAlternateEmail className="fas fa-user text-theme" />
                  </div>

                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    type="email"
                    name="email"
                    className="
                    text-sm
                    pl-10
                    pr-4
                    text-gray-800
                    rounded
                    border
                    w-full
                    py-2
                  "
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-5">
                <label className="mb-1 text-xs tracking-wide">Username:</label>
                <div className="relative">
                  <div
                    className="
                    inline-flex
                    placeholder-gray-500
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                  "
                  >
                    <RiContactsFill className="fas fa-user text-theme" />
                  </div>

                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    id="username"
                    type="username"
                    name="username"
                    className="
                    text-sm
                    pl-10
                    pr-4
                    rounded
                    text-gray-800
                    border
                    w-full
                    py-2
                  "
                    placeholder="Enter your name"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label className="mb-1 text-xs sm:text-sm tracking-wide">
                  Password:
                </label>
                <div className="relative">
                  <div
                    className="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    
                  "
                  >
                    <span>
                      <FaLock className="fas fa-user text-theme" />
                    </span>
                  </div>

                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    type="password"
                    name="password"
                    className="
                    text-sm
                    pl-10
                    pr-4
                    rounded
                    text-gray-800
                    border
                    w-full
                    py-2
                  "
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label className="mb-1 text-xs sm:text-sm tracking-wide">
                  One Time Code:
                </label>
                <div className="relative">
                  <div
                    className="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    
                  "
                  >
                    <span>
                      <FaLock className="fas fa-user text-theme" />
                    </span>
                  </div>

                  <input
                    onChange={(e) => setCode(e.target.value)}
                    id="code"
                    type="password"
                    name="code"
                    className="
                    text-sm
                    pl-10
                    pr-4
                    rounded
                    text-gray-800
                    border
                    w-full
                    py-2
                  "
                    placeholder="Enter one time code"
                  />
                </div>
              </div>

              <div className="flex w-full">
                {loading ? (
                  <div className="w-full flex justify-center items-center">
                    <LoadSpinner />
                  </div>
                ) : (
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="
                  flex
                  mt-2
                  items-center
                  justify-center
                  focus:outline-none
                text-sm
                text-white
                  sm:text-base
                  bg-theme
                  hover:bg-carolina
                  rounded-2xl
                  py-2
                  w-full
                  transition
                  duration-150
                  ease-in
                "
                  >
                    <span className="mr-2 uppercase">Sign Up</span>
                    <span>
                      <FiLogIn className="h-6 w-6" />
                    </span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-center items-center mt-6">
          <span className="ml-2">
            You have an account?
            <p
              className="text-xs ml-2 text-carolina font-semibold cursor-pointer justify-center content-center flex"
              onClick={() => {
                //   history.push("/login");
                history.push("login");
              }}
            >
              Login here
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
