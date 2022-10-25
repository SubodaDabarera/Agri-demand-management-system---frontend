import React, { useEffect, useState } from "react";
import axios from "axios";
import storage from "./firebaseConfig.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AiFillPlusCircle, AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillCaretLeftFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function UpdateFarmerProfile() {
  const [id, setID] = useState("");
  const [fullName, setName] = useState("");
  const [address, setAddress] = useState("");
  const [NIC, setNIC] = useState("");
  const [contactNumber, setTelephone] = useState("");
  const [hectare, setHectares] = useState("");
  const [district, setDistrict] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [province, setProvince] = useState("");
  const [percent, setPercent] = useState(0);
  // State to store uploaded file
  const [file, setFile] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [imgPreview, setImgPreview] = useState();
  const [show, setShow] = useState(false);
  const [showFemale, setShowFemale] = useState(false);




  //Error check
  const [isNameError, setIsNameError] = useState(false)
  const [isAddressError, setIsAddressError] = useState(false)
  const [isHectaresError, setIsHectaresError] = useState(false)
  const [isEmamilError, setIsEmamilError] = useState(false)
  const [isMobileError, setIsMobileError] = useState(false)
  const [isNICError, setIsNICError] = useState(false)

  // if(gender === "Male"){
  //   setShow(true);
  // }

  useEffect(() => {
    setID(localStorage.getItem("user"));
    setName(localStorage.getItem("fullName"));
    setAddress(localStorage.getItem("address"));
    setNIC(localStorage.getItem("NIC"));
    setTelephone(localStorage.getItem("contactNumber"));
    setHectares(localStorage.getItem("hectare"));
    setDistrict(localStorage.getItem("district"));
    setImgPreview(localStorage.getItem("profileImg"));
    setEmail(localStorage.getItem("email"));
    setProvince(localStorage.getItem("province"));
    setGender(localStorage.getItem("gender"));


  }, []);

  const handleSubmit = async (event) => {

    let emailValidation = false;
    let mobileValidation = false;
    let nicValidation = false;

    function validations() {
      if(fullName.length <=0){
        setIsNameError(true)
      } else {
        setIsNameError(false)
      }

      if(address.length <=0){
        setIsAddressError(true)
      } else {
        setIsAddressError(false)
      }

      if(hectare <=0 ){
        setIsHectaresError(true)
      }else {
        setIsHectaresError(false)
      }

      let validEmailRegrex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

      if(!email.match(validEmailRegrex)){
        setIsEmamilError(true)
        emailValidation  = true;
      }else{
        setIsEmamilError(false)
        emailValidation = false;
      }

      let mobileNoRegex = /^([0-9]{9,10})$/

      if(!contactNumber.match(mobileNoRegex)){
        setIsMobileError(true);
        mobileValidation = true;
      }
      else {
        setIsMobileError(false)
        mobileValidation = false;
      }

      let niCRegex = /^([0-9]{10}[v/V])$/
      if(!NIC.match(niCRegex)){
        setIsNICError(true)
        nicValidation = true;
      }
      else{
        setIsNICError(false)
        nicValidation = false;
      }
    }

    await validations();

    const updateProfile = {
      fullName,
      address,
      NIC,
      contactNumber,
      hectare,
      province,
      district,
      gender,
      email,
      profileImg
    };

    if(address.length > 0 && fullName.length > 0 && hectare > 0 && emailValidation == false && mobileValidation == false && nicValidation == false) {

        axios
            .put("http://localhost:8000/api/farmers/" + id, updateProfile)
            .then(() => {
              toast.success("Profile updated successfully !", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              // window.location.href = '/farmer/profile';
            })
            .catch(() => {
              toast.error("Something went wrong!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            });
    }
    else {
      toast.error("Please enter valid informations", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  //image upload
  function handleUploadImg() {
    if (!file) {
      alert("Image is not selected");
    }

    const storageRef = ref(storage, `/Profile/farmer/` + id);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);

        if (percent === 100) {
          toast.success("Profile Picture uploaded successfully !", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        // update progress
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then(async(url) => {
          console.log(`Image URl ${url}`)
          const proImgURL= {
            url
          }
          await axios.put('http://localhost:8000/api/farmers/profile/'+id, proImgURL)
              .then(()=>{
                  // toast.success("Profile image updated successfully !", {
                  //   position: "top-right",
                  //   autoClose: 3000,
                  //   hideProgressBar: false,
                  //   closeOnClick: true,
                  //   pauseOnHover: true,
                  //   draggable: true,
                  //   progress: undefined,
                  // });
          // window.location.href = '/farmer/profile';
        }).catch((err) => {
              // toast.error("Something went wrong!", {
              //   position: "top-right",
              //   autoClose: 3000,
              //   hideProgressBar: false,
              //   closeOnClick: true,
              //   pauseOnHover: true,
              //   draggable: true,
              //   progress: undefined,
              // });

            console.log(err)
            });



          console.log(url);
          setProfileImg(url);
        });
      }
    );
  }

  // Handle file upload event and update state
  function handleChange(event) {
    setFile(event.target.files[0]);
    setImgPreview(URL.createObjectURL(event.target.files[0]));
  }

  function deleteUser(id) {
    if (window.confirm(`Are you want to delete the profile  ${fullName}`)) {
      axios
        .delete("http://localhost:8000/api/farmers/" + id)
        .then(() => {
          alert(`${fullName} user deleted Successfully`);
          window.location.href = "/";
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  return (
    <div className=" mx-8  md:mx-32 lg:mx-52">
      <div className="my-16">
        <p className="font-semibold text-2xl text-center">Edit Profile</p>
        <br />

        <Link to={"/farmer/profile"}>
          <button className="flex min-w-fit bg-gray-400 text-white py-1 px-2 rounded-lg hover:bg-emerald-500 transition-colors">
            <BsFillCaretLeftFill
              className="mt-0 mr-0 md:mt-1 md:mr-1"
              size={18}
            />
            Back
          </button>
        </Link>
        <div>
          <center>
            <img
              src={imgPreview}
              alt="Profile Picture"
              style={{ borderRadius: 10000, width: 120, height: 120 }}
            />
          </center>
        </div>
        <br />

        <div className="grid grid-cols-3 ">
          <div className="col-start-2 col-span-20 justify-end flex">
            <input
              type="file"
              // style={{display:'none'}}
              onChange={handleChange}
              accept=""
            />
          </div>
        </div>

        <div
          className="flex items-center justify-center mt-10"
          style={{ marginTop: 10 }}
        >
          <div
            className="px-4 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-emerald-500 hover:bg-emerald-600
                        transition-colors cursor-pointer"
          >
            {/*<AiFillPlusCircle/>*/}
            <button id={"upload"} onClick={() => handleUploadImg()}>
              Upload Image {percent}%
            </button>
          </div>
        </div>

        <h3 className="text-lg leading-6 font-medium text-gray-900 mt-10">
          Personal Information
        </h3>

        <label
          htmlFor="category"
          className="block text-base font-medium text-gray-700 mt-6"
        >
          Name
        </label>

        <input
          type="text"
          name="fullName"
          id="fullName"
          autoComplete="given-name"
          className="mt-2 focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 block w-full shadow-sm sm:text-sm text-gray-600 border-gray-300 rounded-md"
          value={fullName}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        {isNameError && (
            <div className="text-red-500 mt-1 text-sm bg-red-100 pl-2 p-1 font-medium rounded-sm">
              Please enter your full name
            </div>
        )}

        <label
          htmlFor="category"
          className="block text-base font-medium text-gray-700 mt-6"
        >
          NIC
        </label>

        <input
          type="text"
          name="NIC"
          id="NIC"
          autoComplete="given-name"
          className="mt-2 focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 block w-full shadow-sm sm:text-sm text-gray-600 border-gray-300 rounded-md"
          value={NIC}
          onChange={(event) => {
            setNIC(event.target.value);
          }}
        />

        {isNICError && (
            <div className="text-red-500 mt-1 text-sm bg-red-100 pl-2 p-1 font-medium rounded-sm">
              Please enter valid NIC
            </div>
        )}

        <label
          htmlFor="category"
          className="block text-base font-medium text-gray-700 mt-6"
        >
          Gender
        </label>
        <div className="mt-4 space-y-4 ">
          <div className="flex items-center">
            <input
              id="push-male"
              name="push-gender"
              type="radio"
              value="Male"
              checked={show}
              className="focus:ring-emerald-400 h-4 w-4 text-emerald-600 border-gray-300"
              onChange={(e) => setGender(e.target.value)}
            />
            <label className="ml-3 block text-sm font-medium text-gray-700">
              Male
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="push-female"
              name="push-gender"
              type="radio"
              value="Female"
              className="focus:ring-emerald-400 h-4 w-4 text-emerald-600 border-gray-300"
              onChange={(e) => setGender(e.target.value)}
            />
            <label className="ml-3 block text-sm font-medium text-gray-700">
              Female
            </label>
          </div>
        </div>

        <hr className="mt-10" />

        <h3 className="text-lg leading-6 font-medium text-gray-900 mt-5">
          Location Details
        </h3>

        <label
          htmlFor="category"
          className="block text-base font-medium text-gray-700 mt-6"
        >
          Address
        </label>

        <input
          type="text"
          name="address"
          id="address"
          autoComplete="given-name"
          className="mt-2 focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 block w-full shadow-sm sm:text-sm text-gray-600 border-gray-300 rounded-md"
          value={address}
          onChange={(event) => {
            setAddress(event.target.value);
          }}
        />

        {isAddressError && (
            <div className="text-red-500 mt-1 text-sm bg-red-100 pl-2 p-1 font-medium rounded-sm">
              Please enter your  address
            </div>
        )}

        <div className="sm:col-span-6">
          <label
            htmlFor="category"
            className="block text-base font-medium text-gray-700 mt-6"
          >
            District
          </label>
          <div className="mt-1">
            <select
              id="district"
              name="district"
              value={district}
              className="shadow-sm focus:ring-emerald-400 focus:border-emerald-400 block w-full sm:text-sm border-gray-300 rounded-md"
              onChange={(e) => setDistrict(e.target.value)}
            >
              <option>Colombo</option>
              <option>Gampaha</option>
              <option>Kalutara</option>
              <option>Kandy</option>
              <option>Matale</option>
              <option>Nuwara Eliya</option>
              <option>Galle</option>
              <option>Matara</option>
              <option>Hambantota</option>
              <option>Jaffna</option>
              <option>Kilinochchi</option>
              <option>Mannar</option>
              <option>Vavuniya</option>
              <option>Mullaitivu</option>
              <option>Batticaloa</option>
              <option>Ampara</option>
              <option>Trincomalee</option>
              <option>Kurunegala</option>
              <option>Puttalam</option>
              <option>Anuradhapura</option>
              <option>Polonnaruwa</option>
              <option>Moneragala</option>
              <option>Ratnapura</option>
              <option>Kegalle</option>
            </select>
          </div>
        </div>

        <div className="sm:col-span-6">
          <label
            htmlFor="category"
            className="block text-base font-medium text-gray-700 mt-6"
          >
            Province
          </label>
          <div className="mt-1">
            <select
              id="province"
              name="province"
              placeholder="Farmer's province"
              value={province}
              className="shadow-sm focus:ring-emerald-400 focus:border-emerald-400 block w-full sm:text-sm border-gray-300 rounded-md"
              onChange={(e) => setProvince(e.target.value)}
            >
              <option>Western</option>
              <option>Central</option>
              <option>Southern</option>
              <option>Northern</option>
              <option>Eastern</option>
              <option>North Western</option>
              <option>North Central</option>
              <option>Uva</option>
              <option>Sabaragamuwa</option>
            </select>
          </div>
        </div>

        <hr className="mt-10" />

        <h3 className="text-lg leading-6 font-medium text-gray-900 mt-5">
          Contact Details
        </h3>

        <label
          htmlFor="category"
          className="block text-base font-medium text-gray-700 mt-6"
        >
          Telephone
        </label>

        <input
          type="text"
          name="contactNumber"
          id="contactNumber"
          autoComplete="given-name"
          className="mt-2 focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 block w-full shadow-sm sm:text-sm text-gray-600 border-gray-300 rounded-md"
          value={contactNumber}
          onChange={(event) => {
            setTelephone(event.target.value);
          }}
        />

        {isMobileError && (
            <div className="text-red-500 mt-1 text-sm bg-red-100 pl-2 p-1 font-medium rounded-sm">
              Please enter valid mobile number
            </div>
        )}

        <label
          htmlFor="category"
          className="block text-base font-medium text-gray-700 mt-6"
        >
          Email
        </label>

        <input
          type="text"
          name="email"
          id="email"
          autoComplete="given-name"
          className="mt-2 focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 block w-full shadow-sm sm:text-sm text-gray-600 border-gray-300 rounded-md"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        {isEmamilError && (
            <div className="text-red-500 mt-1 text-sm bg-red-100 pl-2 p-1 font-medium rounded-sm">
              Please enter valid email
            </div>
        )}

        <hr className="mt-10" />

        <h3 className="text-lg leading-6 font-medium text-gray-900 mt-5">
          Crop Details
        </h3>

        <label
          htmlFor="category"
          className="block text-base font-medium text-gray-700 mt-6"
        >
          Hectares
        </label>

        <input
          type="text"
          name="hectare"
          id="hectare"
          autoComplete="given-name"
          className="mt-2 focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 block w-full shadow-sm sm:text-sm text-gray-600 border-gray-300 rounded-md"
          value={hectare}
          onChange={(event) => {
            setHectares(event.target.value);
          }}
        />

        {isHectaresError && (
            <div className="text-red-500 mt-1 text-sm bg-red-100 pl-2 p-1 font-medium rounded-sm">
              Hectare must have positive value
            </div>
        )}

        <div
          className="grid grid-cols-5 "
          style={{ marginBottom: 40, marginTop: 35 }}
        >
          <div className="col-start-1 col-span-2 justify-end flex">
            <button
              className="flex min-w-fit bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition-colors"
              onClick={() => deleteUser(id)}
            >
              <RiDeleteBin6Line
                className="mt-0 mr-0 md:mt-1 md:mr-1"
                size={18}
              />
              <p className="hidden md:block">Delete</p>
            </button>
          </div>
          <div className="col-span-3 justify-center flex">
            <button
              className="flex w-fit text-white bg-green-500 py-1 px-4 rounded-lg hover:bg-green-600 transition-colors"
              onClick={() => handleSubmit()}
            >
              <AiOutlineEdit className="mt-0 mr-0 md:mt-1 md:mr-1" size={18} />
              <p className="hidden md:block"> Update</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
