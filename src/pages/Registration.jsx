import React, { useState } from "react";
import Flex from "../components/Flex";
import Image from "../components/Image";
import RegistrationImage from "../assets/regi.jpg";
import Button from "../components/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import InputAdornment from "@mui/material/InputAdornment";
import { FaExclamationCircle } from "react-icons/fa";

const Registration = () => {
  let [showPassword, setShowPassword] = useState(false);
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");

  let [emailError, setEmailError] = useState("")
  let [nameError, setNameError] = useState("")
  let [passwordError, setPasswordError] = useState("")

  let handleEye = () => {
    setShowPassword(!showPassword);
  };

  let handleEmail = (event) => {
    setEmail(event.target.value);
    setEmailError("")
  };

  let handleName = (event) => {
    setName(event.target.value);
    setNameError("")
  };

  let handlePassword = (event) => {
    setPassword(event.target.value);
    setPasswordError("")
  };

  let handleSignUp = (e) => {
    // Have to write function e.preventDefault() if onclick button placed inside a form. If button is used without form or outside the form then no need to write on this way and if the button is used as a Component then need {...props} for onClick function inside that component. And {...props} have to send as props inside the component}.
    e.preventDefault();

    if (!email) {
      setEmailError("Email is required");
    }else{
      if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        setEmailError("Enter a valid email with manner")
      }
    }

    if(!name){
      setNameError("name is required");


    }if(!password){
      setPasswordError("Password is required ");
    }else if((password.length <8 || password.length>16)){
      setPasswordError(("Password must be 8-16 charecters"));
    }else if(!/(?=.*[a-z])/.test(password)){
      setPasswordError("Atleast one lowerCase letter (a-z).")
    }else if(!/(?=.*[A-Z])/.test(password)){
      setPasswordError("Atleast one uppercase letter (A-Z).")
    }else if(!/(?=.*\d)/.test(password)){
      setPasswordError("At least a number (0-9).");
    }else if(!/(?=.*[@$!%*?&])/.test(password)){
      setPasswordError("Must include one special charecter");
    }else{
      setPasswordError("")
    }

    // console.log(email);
    // console.log(name);
    // console.log(password);
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
                      id="outlined-basic"
                      placeholder="example@gmail.com"
                      variant="outlined"
                      sx={{ width: "65%" }}
                      onChange={handleEmail}
                    />
                    {
                      emailError
                      &&
                       
                    <div className="flex items-center absolute bg-red-600 px-2 py-[6px] top-[-35px] left-[20px] translate-x-1/2 text-white text-base font-semibold font-poppins border rounded shadow-lg">
                      <FaExclamationCircle className="pr-1 text-xl"/>
                      {emailError}
                      {/*upper div is arrow tooltip */}

                      <div className="absolute top-[36px] right-1/2 translate-x-1/2 border-t-[10px] border-t-red-600 border-x-[10px] border-x-transparent"></div>
                     {/*this div is for upper arrow */}
                    </div>
                      
                     }
                  </div>

                  <div className="relative inline-block">
                    <TextField
                      label="Full Name"
                      id="outlined-basic"
                      placeholder="Abcd"
                      variant="outlined"
                      sx={{ width: "65%" }}
                      onChange={handleName}
                    />
                    {
                      nameError
                      &&
                       <div className="flex items-center absolute bg-red-600 px-1 py-[6px] top-1/2 -translate-y-1/2 right-[10px] text-white text-base font-semibold font-poppins border rounded">
                        <FaExclamationCircle className="pr-1 text-xl"/>
                       {nameError}
                      {/*upper div is arrow tooltip */}

                      <div className="absolute top-1/2 -left-[9px] -translate-y-1/2 border-y-[10px] border-y-transparent border-r-[10px] border-r-red-600"></div>
                     {/*this div is for left arrow */}
                    </div>
                    }
                  </div>

                  <div className="relative">
                    <TextField
                      label="Password"
                      id="outlined-basic"
                      type={showPassword ? "text" : "password"}
                      placeholder="Abcde12@#"
                      variant="outlined"
                      sx={{ width: "65%" }}
                      onChange={handlePassword}
                    />
                   {
                    passwordError
                    &&
                     <div className="flex flex-auto items-center absolute bg-red-600 px-1 py-[6px] text-base text-white font-semibold font-poppins rounded shadow-lg">
                      {/*upper div is arrow tooltip */}
                      <FaExclamationCircle className="pr-1 text-xl"/>
                      {passwordError}

                      <div className="absolute border-x-[10px] border-x-transparent border-b-[10px] -top-[9px] left-1/2 -translate-x-1/2 border-b-red-600 shadow-lg"></div>
                      {/*this div is for upper arrow */}
                    </div>
                   }

                    <div
                      onClick={handleEye}
                      className="flex absolute top-1/2 -translate-y-1/2 right-[190px] cursor-pointer"
                    >
                      {showPassword ? <IoEye /> : <IoEyeOff />}
                    </div>
                  </div>
                </div>

                <div className="mt-12 mb-9 mr-[150px]">
                  <Button
                    text="Sign Up"
                    className="w-[330px] py-[20px] box-border bg-[#5F35F5] font-bold text-[20px] font-nunito rounded-full hover:border-blue-900"
                    onClick={handleSignUp}
                  />
                </div>

                <div className="flex pl-[70px]">
                  <p className="text-sm font-open font-normal text-[#03014C]">
                    Already have an account?
                    <span className="text-[#EA6C00] text-base font-semibold ml-1">
                      <Link to="/login">Sign In</Link>
                    </span>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Flex>
    </section>
  );
};

export default Registration;
