import React, { useState } from "react";
import Flex from "../components/Flex";
import Image from "../components/Image";
import LoginImage from "../assets/login.jpg";
import Button from "../components/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const auth = getAuth();

  let [showPassword, setShowPassword] = useState(false)
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let [emailError, setEmailError] = useState("");
  let [passwordError, setPasswordError] = useState("");
  let [loader, setLoader] = useState(false)

  let navigate = useNavigate()


  

  let handleLogin=(e)=>{
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
  // console.log(userCredential);

    setEmail("")
    setPassword("")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    
    // Error code from console.log(userCredential)
    if(errorCode === "auth/user-not-found"){
      toast.error("No account with this email", {
        className: "bg-[#8e44ad] text-lg text-white font-semibold font-nunito",
        progressClassName: "bg-white"
      })
    }else if(errorCode === "auth/invalid-email"){
      toast.error("Please Enter a valid Email", {
       className: "bg-[#8e44ad] text-lg text-white font-semibold font-nunito",
        progressClassName: "bg-white" 
      })
    }else if(errorCode === "auth/invalid-credential"){
     toast.error("Please Enter a valid Email", {
       className: "bg-[#8e44ad] text-lg text-white font-semibold font-nunito",
        progressClassName: "bg-white" 
      }) 
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
                    value={email}
                    variant="standard"
                    placeholder="youraddress@gmail.com"
                    sx={{ width: "70%" }}
                    onChange={()=>setEmail(event.target.value)}
                  />
                </div>

                <div className="relative">
                  <TextField
                    id="standard-basic"
                    type= {showPassword ? "text" : "password"}
                    label="Password"
                    value={password}
                    variant="standard"
                    placeholder="Enter your password"
                    sx={{ width: "70%" }}
                    onChange={()=>setPassword(event.target.value)}
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
                  onClick= {handleLogin}
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
      </Flex>
    </section>
  );
};

export default Login;
