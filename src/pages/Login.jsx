import React, { useState } from "react";
import Flex from "../components/Flex";
import Image from "../components/Image";
import LoginImage from "../assets/login.jpg";
import Button from "../components/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Login = () => {

  let [showPassword, setShowPassword] = useState(false)


  return (
    <section className="min-h-screen block">
      <Flex className="h-screen">
        <div className="w-1/2 overflow-hidden">
          <Image src={LoginImage} className=" w-full h-full object-cover" />
        </div>

        <div className="w-1/2 flex flex-col items-start justify-center pl-[70px] box-border h-screen">
          <form action="" className="max-w-[550px] ">
            <div className=" ">
              <h3 className="text-[35px] font-bold font-nunito text-primary w-[100%]">
                Login to your account!
              </h3>
              <div className="w-[220px] h-[62px] border border-darkBlue rounded-lg flex items-center justify-center my-8 cursor-pointer">
                <div className="flex items-center">
                  <FcGoogle className="text-[25px]" />
                  <p className="text-darkBlue text-sm font-semibold font-open pl-3">
                    Login with google
                  </p>
                </div>
              </div>

              <div className=" flex flex-col gap-y-9">
                <div className="">
                  <TextField
                    id="standard-basic"
                    label="Email Address"
                    variant="standard"
                    placeholder="youraddress@gmail.com"
                    sx={{ width: "70%" }}
                  />
                </div>

                <div className="relative">
                  <TextField
                    id="standard-basic"
                    type= {showPassword ? "text" : "password"}
                    label="Password"
                    variant="standard"
                    placeholder="Enter your password"
                    sx={{ width: "70%" }}
                  />
                  <div onClick={()=>setShowPassword(!showPassword)}
                  className=" absolute top-1/2 right-[160px] ">
                    {
                      showPassword
                      ?
                      <IoEye />
                      :
                      <IoEyeOff />
                    }
                  </div>
                </div>
              </div>

              <div className="mt-12 mb-9 mr-[150px]">
                <Button
                  text="Login to Continue"
                  className="w-[350px] py-[20px] box-border bg-[#5F35F5] font-bold text-[20px] font-nunito rounded-lg hover:border-blue-900"
                />
              </div>

              <div className="flex pl-[70px]">
                <p className="text-sm font-open font-normal text-[#03014C]">
                  Don't have an account?
                  <span className="text-[#EA6C00] text-sm font-semibold ml-1">
                    <Link to="/">Sign Up</Link>
                  </span>
                </p>
              </div>
            </div>

            {/* or border design without before after start */}
            {/* <div className="flex max-w-[350px] items-center mt-5">
              <div className="flex-grow border-t border-darkBlue"></div>
              <span className="text-lg text-darkBlue font-bold font-nunito mx-2">
                Or
              </span>
              <div className="flex-grow border-t border-darkBlue"></div>
            </div> */}
            {/* Or border design without before after end */}

            {/* Or border design using before and after start */}
            {/* <div className="text-darkBlue text-base pl-[165px] font-bold font-nunito px-2 relative 
          before:absolute before:content-[''] before:top-1/2 before:w-[31%] before:border-b before:border-darkBlue before:right-[150px]

          after:absolute after:content-[''] after:top-1/2 after:w-[31%] after:border-t after:border-darkBlue after:left-0">
          Or
          </div> */}
            {/* Or border design using before and after end */}
          </form>
        </div>
      </Flex>
    </section>
  );
};

export default Login;
