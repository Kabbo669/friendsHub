import React, { createRef, useEffect, useRef, useState } from "react";
import Image from "./Image";
import Profile from "../assets/nishat2.jpg";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { LuLogOut, LuMessageCircleMore } from "react-icons/lu";
import { RiNotification3Line } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { userInfo } from "../slices/userInfoSlice";
import { FaCloudUploadAlt } from "react-icons/fa";
import Button from "./Button";
import { current } from "@reduxjs/toolkit";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";

const Sidebar = () => {
  const storage = getStorage();
  const auth = getAuth();
  let uiRef = useRef(null);
  let [activeValue, setActiveValue] = useState("");
  let [profileUi, setProfileUi] = useState(false);

  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();


  const dispatch = useDispatch();
  const userData = useSelector((state) => state.activeUser.value);
  // console.log(userData);
  let navigate = useNavigate();
  let location = useLocation();

  

  let handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Sign Out successfull", {
          className:
            "bg-blue-500 text-xl text-white rounded-lg font-bold font-nunito",
          progressClassName: "bg-white",
        });
        dispatch(userInfo(null));
        localStorage.removeItem("userInfo");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setActiveValue(location.pathname.replace("/pages/", ""));
  }, [location.pathname]);
  console.log(activeValue);

  let handleUpdateProfile = () => {
    setProfileUi(true);
  };

  let handleProfileBack = () => {
    setProfileUi(false);
    setCropData("")
    setImage(null)
  };


  let handleOverlayUi = (e) => {
    if (!uiRef.current.contains(e.target)) {
      setProfileUi(false);
      setCropData("")
      setImage(null)
    }
    // console.log(ref.current.contains(e.target));
  };

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
      console.log(files);
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      // console.log(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

   const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());

      // console.log(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());

      const storageRef = ref(storage, auth.currentUser.uid);
      // console.log(auth.currentUser.uid);

      const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, 'data_url').then((snapshot) => {
      console.log('Uploaded a data_url string!');
     });
      getDownloadURL(storageRef).then((downloadURL) => {
      console.log('File available at', downloadURL);

      updateProfile(auth.currentUser, {
      photoURL: downloadURL
      
     }).then(()=>{
      dispatch(userInfo({...userData,photoURL:downloadURL}))
      
      localStorage.setItem("userInfo", JSON.stringify({...userData,photoURL:downloadURL}))

      setProfileUi(false)
      setCropData("")
      setImage(null)
     
     })
    })

    // console.log(auth.currentUser.uid);

    //  console.log(cropperRef.current?.cropper.getCroppedCanvas().toDataURL()); 
    }
  };
 



  return (
    <div className="w-full h-screen flex items-center">
      <div className="bg-[#5F35F5] h-[95%] rounded-2xl w-[80%] mx-auto flex flex-col items-center justify-between py-10 box-border">
        <div className="relative w-[120px] h-[120px] flex-shrink-0 rounded-full overflow-hidden min-w-0 min-h-0 group">
          {/* here flex-shrink keep image in the box and without flex-shrink-0 the image will be disappeared while zooming in */}
          <Image
            src={userData.photoURL}
            alt="Profile Image"
            className="w-full h-full object-cover "
          />
          <div className="absolute flex items-center justify-center inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <FaCloudUploadAlt
              className="text-white text-[30px]"
              onClick={handleUpdateProfile}
            />
          </div>
        </div>
        <h3 className="absolute top-[200px] text-white flex items-center justify-center font-bold font-nunito text-xl">{userData.displayName}</h3>
        {profileUi && (
          <div
            onClick={handleOverlayUi}
            className="absolute inset-0 flex justify-center items-center bg-black/70 z-20"
          >
            <div ref={uiRef} className="w-[600px] max-h-[90vh]  bg-white rounded-2xl">
              <h1 className="text-[50px] font-nunito font-bold flex justify-center items-center mt-[30px] text-blue-500">
                Update Your Profile
              </h1>

              <input
                onChange={onChange}
                type="file"
                className="mx-[150px] text-[25px] mt-5 mb-2 inline-block"
              />
              

              {
              image
              &&
              <div className=" mt-7 ">
              <Cropper
              ref={cropperRef}
              style={{ height: 350, width: "75%" }}
              initialAspectRatio={1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              guides={true}
              />
              </div>
              }
               {
              image &&
              <div className="img-preview absolute min-h-[100px] min-w-[100px] overflow-hidden ml-[475px]   rounded-full max-h-[100px] max-w-[100px] top-[400px] ">
               </div>
               }

              <div className="flex gap-6 items-center justify-center mb-[40px] ">
                <Button
                  text="Upload"
                  className="rounded-lg bg-purple-600 h-[50px] w-[150px] mt-[50px] text-[28px] font-nunito"
                  onClick={getCropData}
                />
                <Button
                  text="Back"
                  className="rounded-lg bg-purple-600 h-[50px] w-[150px] mt-[50px] text-[28px] font-nunito"
                  onClick={handleProfileBack}
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center justify-between text-white text-[50px] gap-y-[60px]">
          <SidebarLink
            name="home"
            icon={IoHomeOutline}
            activeValue={activeValue}
          />
          <SidebarLink
            name="message"
            icon={LuMessageCircleMore}
            activeValue={activeValue}
          />
          <SidebarLink
            name="notification"
            icon={RiNotification3Line}
            activeValue={activeValue}
          />
          <SidebarLink
            name="setting"
            icon={IoSettingsOutline}
            activeValue={activeValue}
          />
        </div>

        <div className="text-white flex items-center text-[70px]">
          <LuLogOut onClick={handleLogout} />
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </div>
  );
};

export default Sidebar;
