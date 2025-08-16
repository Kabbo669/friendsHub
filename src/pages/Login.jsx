import React, { useState } from "react";
import Flex from "../components/Flex";
import Image from "../components/Image";
import LoginImage from "../assets/login.jpg";
import Button from "../components/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { FaExclamationCircle } from "react-icons/fa";
import { DNA } from "react-loader-spinner";


const Login = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  let [showPassword, setShowPassword] = useState(false)
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let [emailError, setEmailError] = useState("");
  let [passwordError, setPasswordError] = useState("");
  let [loader, setLoader] = useState(false)
  

  let navigate = useNavigate()

  let handleEmail=(e)=>{
  setEmail(e.target.value);
  setEmailError("")
  }

  let handlePassword=(e)=>{
  setPassword(e.target.value);
  setPasswordError("")
  }

  let handleGoogleLogin=()=>{
    signInWithPopup(auth, provider)
    .then((result) => {
     navigate('/pages/home')
   
  }).catch((error) => {
    const errorCode = error.code; 
    console.log(errorCode);
  });
  }
  

  let handleLogin=(e)=>{
    e.preventDefault()
    let valid = true;

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError("Enter a valid email");
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

    if(valid){
      setLoader(true)
       signInWithEmailAndPassword(auth, email, password)
     .then((user) => {
      if(user.user.emailVerified){
       toast.success("Log in successful", {
      className:
        "bg-blue-500 text-lg text-white rounded-lg font-bold font-nunito",
       progressClassName: "bg-white"})
       setEmail("")
       setPassword("")
       navigate('/pages/home')

      }else{
        toast.error("Please verify your email",{
          className: "bg-red-400 text-white font-nunito font-bold text-lg",
          progressClassName: "bg-white"
        })
      }
    
    })
    .catch((error) => {
    const errorCode = error.code;
    console.log(errorCode);
    
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
     toast.error("Please check your Email and Password ", {
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
}

 let handleForget=()=>{
  console.log("clicked");
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
              <div className="w-[220px] h-[62px] border border-darkBlue rounded-lg flex items-center justify-center my-8 cursor-pointer" onClick={handleGoogleLogin}>
                <div className="flex items-center" >
                  <FcGoogle className="text-[25px]" />
                  <p className="text-darkBlue text-sm font-semibold font-open pl-3" >
                    Login with google
                  </p>
                </div>
              </div>

              <div className=" flex flex-col gap-y-9">
                <div className="relative">
                  <TextField
                    id="standard-basic"
                    label="Email Address"
                    value={email}
                    variant="standard"
                    placeholder="youraddress@gmail.com"
                    sx={{ width: "70%" }}
                    onChange={handleEmail}
                  />
                   {
                    emailError &&
                    <div className="flex items-center absolute bg-red-600 px-2 py-[6px] bottom-[-36px] left-[30px] translate-x-1/2 text-white text-base font-semibold font-poppins border rounded shadow-lg">
                    <FaExclamationCircle className="pr-1 text-xl" />
                    {emailError}
                    {/*upper div is arrow tooltip */}
                  
                    <div className="absolute bottom-[36px] right-1/2 translate-x-1/2 border-b-[10px] border-b-red-600 border-x-[10px] border-x-transparent"></div>
                    {/*this div is for upper arrow */}
                    </div>
                    }
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
                    onChange={handlePassword}
                  
                  />
                  {passwordError && 
                  <div className="flex flex-auto items-center absolute bg-red-600 px-1 py-[6px] left-0 text-base text-white font-semibold font-poppins rounded shadow-lg">
                  {/*upper div is arrow tooltip */}
                  <FaExclamationCircle className="pr-1 text-xl" />
                    {passwordError}
                  
                    <div className="absolute border-x-[10px] border-x-transparent border-b-[10px] -top-[9px] left-1/2 -translate-x-1/2 border-b-red-600 shadow-lg"></div>
                    {/*this div is for upper arrow */}
                    </div>
                    }
                  <div onClick={()=>setShowPassword(!showPassword)}
                  className=" absolute top-1/2 right-[33%] ">
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
                <div className="mt-12 mb-6 mr-[150px]">
                <Button
                  text="Login to Continue"
                  className="w-[350px] h-[65px] box-border bg-[#5F35F5] font-bold text-[20px] font-nunito rounded-lg hover:border-blue-900"
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
              <div>
                <h3 className="text-xl font-poppins text-blue-500 font-semibold pl-[90px] pt-[15px] cursor-pointer" onClick={handleForget}>Forget Password</h3>
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
