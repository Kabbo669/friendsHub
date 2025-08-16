import React, { useState } from "react";
import Flex from "../components/Flex";
import Image from "../components/Image";
import RegistrationImage from "../assets/regi.jpg";
import Button from "../components/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FaExclamationCircle } from "react-icons/fa";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { DNA } from "react-loader-spinner";

const Registration = () => {
  const auth = getAuth();

  let [showPassword, setShowPassword] = useState(false);
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");

  let [emailError, setEmailError] = useState("");
  let [nameError, setNameError] = useState("");
  let [passwordError, setPasswordError] = useState("");
  let [loader, setLoader] = useState(false)

  let navigate = useNavigate()

  let handleEye = () => {
    setShowPassword(!showPassword);
  };

  let handleEmail = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  let handleName = (event) => {
    setName(event.target.value);
    setNameError("");
  };

  let handlePassword = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  let handleSignUp = (e) => {
    // Have to write function e.preventDefault() if onclick button placed inside a form. If button is used without form or outside the form then no need to write on this way and if the button is used as a Component then need {...props} for onClick function inside that component. And {...props} have to send as props inside the component}.
    e.preventDefault();
    let valid = true;

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError("Enter a valid email");
      valid = false;
    }

    if (!name) {
      setNameError("name is required");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required ");
      valid = false;
    } else if (password.length < 8 || password.length > 16) {
      setPasswordError("Password must be 8-16 charecters");
      valid = false;
    } else if (!/(?=.*[a-z])/.test(password)) {
      setPasswordError("Atleast one lowerCase letter (a-z).");
      valid = false;
    } else if (!/(?=.*[A-Z])/.test(password)) {
      setPasswordError("Atleast one uppercase letter (A-Z).");
      valid = false;
    } else if (!/(?=.*\d)/.test(password)) {
      setPasswordError("At least a number (0-9).");
      valid = false;
    } else if (!/(?=.*[@$!%*?&])/.test(password)) {
      setPasswordError("Must include one special charecter");
      valid = false;
    }
    if (valid) {
      setLoader(true)
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          // console.log(userCredential);

          setEmail("");
          setName("");
          setPassword("");
          toast.success("New user created, Please verify your email", {
            className:
              "bg-blue-500 text-xl text-white rounded-lg font-bold font-nunito",
               progressClassName: "bg-white"})
          setLoader(false)
          setTimeout(()=>{
           navigate('/login')
          },2000)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            
            // Error code from console.log(userCredential)
             if(errorCode === "auth/invalid-email"){
              toast.error("Please Enter a valid Email", {
               className: "bg-[#8e44ad] text-lg text-white font-semibold font-nunito",
                progressClassName: "bg-white" 
              })
            }else if(errorCode === "auth/email-already-in-use"){
             toast.error("Thsi email is already registered", {
               className: "bg-[#8e44ad] text-lg text-white font-semibold font-nunito",
                progressClassName: "bg-white" 
              })
              setLoader(false) 
            }else if(errorCode === "auth/too-many-requests"){
              toast.error("Too many attempts, please try again later", {
                className: "bg-[#e74c3c] text-lg text-white font-semibold font-nunito",
                progressClassName: "bg-white"
              })
            }else{
              toast.error("An unexpected error occured",{
                className: "bg-[#e74c3c] text-lg text-white font-semibold font-nunito",
                progressClassName: "bg-white"
              })
            }
           });
    }
  };

  return (
    <section className="min-h-screen block">
      <Flex className="h-screen">
        <div className="w-1/2 overflow-hidden">
          <Image
            src={RegistrationImage}
            className=" w-full h-full object-cover"
          />
        </div>

        <div className="w-1/2 flex flex-col items-start justify-center pl-[70px] box-border">
          <div className="">
            <form action="" className="max-w-[550px] overflow-auto">
              <div className=" ">
                <h3 className="text-[35px] font-bold font-nunito text-primary w-[100%]">
                  Get started with easily register
                </h3>
                <p className="text-[20px] font-normal font-nunito text-lightBlack pt-4 pb-10">
                  Free register and you can enjoy it
                </p>

                <div className=" flex flex-col gap-y-9">
                  <div className="relative ">
                    <TextField
                      label="Email Address"
                      value={email}
                      id="outlined-basic"
                      placeholder="example@gmail.com"
                      variant="outlined"
                      sx={{ width: "65%" }}
                      onChange={handleEmail}
                    />
                    {
                    emailError && (
                      <div className="flex items-center absolute bg-red-600 px-2 py-[6px] top-[-35px] left-[20px] translate-x-1/2 text-white text-base font-semibold font-poppins border rounded shadow-lg">
                        <FaExclamationCircle className="pr-1 text-xl" />
                        {emailError}
                        {/*upper div is arrow tooltip */}

                        <div className="absolute top-[36px] right-1/2 translate-x-1/2 border-t-[10px] border-t-red-600 border-x-[10px] border-x-transparent"></div>
                        {/*this div is for upper arrow */}
                      </div>
                    )}
                  </div>

                  <div className="relative inline-block">
                    <TextField
                      label="Full Name"
                      value={name}
                      id="outlined-basic"
                      placeholder="Abcd"
                      variant="outlined"
                      sx={{ width: "65%" }}
                      onChange={handleName}
                    />
                    {nameError && (
                      <div className="flex items-center absolute bg-red-600 px-1 py-[6px] top-1/2 -translate-y-1/2 right-[10px] text-white text-base font-semibold font-poppins border rounded">
                        <FaExclamationCircle className="pr-1 text-xl" />
                        {nameError}
                        {/*upper div is arrow tooltip */}

                        <div className="absolute top-1/2 -left-[9px] -translate-y-1/2 border-y-[10px] border-y-transparent border-r-[10px] border-r-red-600"></div>
                        {/*this div is for left arrow */}
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <TextField
                      label="Password"
                      value={password}
                      id="outlined-basic"
                      type={showPassword ? "text" : "password"}
                      placeholder="Abcde12@#"
                      variant="outlined"
                      sx={{ width: "65%" }}
                      onChange={handlePassword}
                    />
                    {passwordError && (
                      <div className="flex flex-auto items-center absolute bg-red-600 px-1 py-[6px] text-base text-white font-semibold font-poppins rounded shadow-lg">
                        {/*upper div is arrow tooltip */}
                        <FaExclamationCircle className="pr-1 text-xl" />
                        {passwordError}

                        <div className="absolute border-x-[10px] border-x-transparent border-b-[10px] -top-[9px] left-1/2 -translate-x-1/2 border-b-red-600 shadow-lg"></div>
                        {/*this div is for upper arrow */}
                      </div>
                    )}

                    <div
                      onClick={handleEye}
                      className="flex absolute top-1/2 -translate-y-1/2 right-[38%] cursor-pointer"
                    >
                      {showPassword ? <IoEye /> : <IoEyeOff />}
                    </div>
                  </div>
                </div>
               {
                loader
                ?
                <div className="mt-5 mb-5 pl-[110px]">
                  <DNA
                visible={true}
                height="100"
                width="100"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
                />
                </div>
                :
                <div className="mt-12 mb-9 mr-[150px]">
                  <Button
                    text="Sign Up"
                    className="w-[330px] py-[20px] box-border bg-[#5F35F5] font-bold text-[20px] font-nunito rounded-full hover:border-blue-900"
                    onClick={handleSignUp}
                  />
                </div>
               }

                <div className="flex pl-[60px]">
                  <p className="text-sm font-open font-normal text-[#03014C]">
                    Already have an account?
                    <span className="text-[#EA6C00] text-base font-semibold ml-1">
                      <Link to="/login">Sign In</Link>
                    </span>
                  </p>
                </div>
              </div>
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </form>
          </div>
        </div>
      </Flex>
    </section>
  );
};

export default Registration;
