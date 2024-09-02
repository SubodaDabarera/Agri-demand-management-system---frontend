import React, { useState } from "react";

const ROLES = {
  ADMIN: "admin",
  FARMER: "farmer",
  BUYER: "buyer",
};

const roles = [
  {
    id: "1",
    role: "admin",
  },
  {
    id: "2",
    role: "farmer",
  },
  {
    id: "3",
    role: "buyer",
  },
];

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [NIC, setNIC] = useState("")
  const [ShopName, setShopName] = useState('')
  const [gender, setGender] = useState('')
  const [address, setAddress] = useState('')
  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')
  const [contactNumber, setContactNumber] = useState(0)
  const [categories, setCategories] = useState([])
  const [hectare, setHectare] = useState(0)

  const onSignIn = () => {
    console.log(fullName, email, password, role);

    switch (role) {
      case ROLES.ADMIN:
        // userName,password,role
        console.log("Adming");
        break;
      case ROLES.BUYER:
        // fullName,NIC,ShopName,gender, address,province, district,  email, contactNumber,userName,password,role
        console.log("buyer");
        break;
      case ROLES.FARMER:
        console.log("farmer");
        // fullName,NIC,gender, address,province, district,  email, contactNumber,   userName, password, categories, hectare,role
        break;
      default:
        console.log("Not a valud role!");
        return;
    }
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div>
      <div className="px-4 py-8 sm:px-10">
        <p className="text-sm font-medium text-gray-700">Sign in</p>

        <div className="mt-6">
          <div className="space-y-6">
            <div>
              <select onChange={handleRoleChange}>
                {roles.map((role, index) => (
                  <option>{role.role}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="name" className="sr-only">
                Full name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                placeholder="Full name"
                required
                className="block w-full shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm border-gray-300 rounded-md"
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="mobile-or-email" className="sr-only">
                Mobile number or email
              </label>
              <input
                type="text"
                name="mobile-or-email"
                id="mobile-or-email"
                autoComplete="email"
                placeholder="Mobile number or email"
                required
                className="block w-full shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm border-gray-300 rounded-md"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                required
                className="block w-full shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm border-gray-300 rounded-md"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                onClick={onSignIn}
              >
                Create your account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
