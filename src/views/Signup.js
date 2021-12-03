// Import CSS
import "./css/Signup.css";
// Import major dependencies
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
// import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";
// Import components
import Banner from "../components/Banner";
import Button from "../components/Button";
import TextBox from "../components/TextBox";
import Upload from "../components/Upload";
import LoadSpinner from "../components/LoadSpinner";
import Auth from "../components/Auth";
// Import icons
import { BsFillPersonLinesFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaUserAlt, FaLock, FaChevronRight, FaUpload } from "react-icons/fa";
// Import API
import api from "../static/api";

const Signup = (props) => {
  const { register, handleSubmit } = useForm();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [image, setImage] = useState(null);
  const [isImageNull, setIsImageNull] = useState(true);
  const [error, setError] = useState(false);

  const [bannerShow, setBannerShow] = useState(false);
  const [bannerText, setBannerText] = useState("An error has occurred.");

  const onImageChange = (e) => {
    const file = e.target.files[0];
    setIsImageNull(false);
    setImage(file);
  };
  const onFullNameChange = (e) => {
    let value = e.target.value;
    setFullName(value);
    setError(false);
  };
  const onUsernameChange = (e) => {
    let value = e.target.value;
    setUsername(value);
    setError(false);
  };
  const onPasswordChange = (e) => {
    let value = e.target.value;
    setPassword(value);
    setError(false);
  };
  const onConfirmPasswordChange = (e) => {
    let value = e.target.value;
    setConfirmPassword(value);
    setError(false);
  };
  const onCodeChange = (e) => {
    let value = e.target.value;
    setCode(value);
    setError(false);
  };
  const onEmailChange = (e) => {
    let value = e.target.value;
    setEmail(value);
    setError(false);
  };
  const handleUpload = async () => {
    try {
      const key = `${username}`;
      let fileData = new FormData();
      fileData.append("FileKey", image);
      fileData.append("ImageName", key);
      console.log(image);
      console.log(fileData);
      const result = await api.post_upload(fileData, key);
      console.log(result);
    } catch {
      //   setBannerText("A specific error has occurred here.");
      //   setBannerShow(true);
      console.log("Error");
    }
  };
  const handleRegistration = (data) => {
    const user = {
      name: fullName,
      username: username,
      password: password,
      code: code,
      email: email,
      signature: image,
    };

    console.log(user);
  };
  const onErrors = (errors) => {
    console.log(errors);
  };
  return (
    <>
      <Helmet>
        <title>Welcome</title>
      </Helmet>
      <Banner
        show={bannerShow}
        dismiss={() => {
          setBannerShow(false);
        }}
      >
        {bannerText}
      </Banner>
      <div className="auth-background">
        <div className="auth-window">
          <div className="auth-logo">
            <img
              alt="Slidedeck logo"
              src="/assets/slidedeck-logo.svg"
              className="w-52"
            />
          </div>
          <form onSubmit={handleSubmit(handleUpload, onErrors)}>
            <div className="auth-columns">
              <div className="auth-col">
                <span>
                  <TextBox
                    onChange={onFullNameChange}
                    icon={BsFillPersonLinesFill}
                    className="w-full"
                    type="text"
                    placeholder="Full Name"
                  />
                  <TextBox
                    onChange={onEmailChange}
                    icon={MdEmail}
                    className="w-full"
                    type="text"
                    placeholder="Email"
                  />
                </span>
                {isImageNull ? (
                  <div>
                    <Upload
                      onImageChange={onImageChange}
                      register={register}
                      name={"image"}
                      title="Upload Signature"
                      subtitle="Attach Image"
                    />
                  </div>
                ) : (
                  <div className="mt-20 p-8">
                    <p>{image.name} has been Uploaded!</p>
                    <div
                      onClick={(e) => setIsImageNull(true)}
                      className="m-4 bg-theme p-1 rounded flex px-2 cursor-pointer max-w-sm"
                    >
                      <FaUpload className="text-white mt-1 mr-1" />
                      <p className="text-white">Upload Signature Again</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="auth-col">
                <span>
                  <TextBox
                    onChange={onUsernameChange}
                    icon={FaUserAlt}
                    className="w-full"
                    type="text"
                    placeholder="Username"
                  />
                  <TextBox
                    onChange={onPasswordChange}
                    icon={FaLock}
                    className="w-full"
                    type="password"
                    placeholder="Password"
                  />
                </span>
                <TextBox
                  onChange={onConfirmPasswordChange}
                  icon={FaLock}
                  className="w-full"
                  type="password"
                  placeholder="Confirm Password"
                />
                <div className="flex-grow" />
                <TextBox
                  onChange={onCodeChange}
                  icon={FaLock}
                  className="w-full"
                  type="password"
                  placeholder="One Time Code"
                />
                <Button icon={FaChevronRight} className="special">
                  SIGN UP
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
