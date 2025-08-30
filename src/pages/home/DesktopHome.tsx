import { Link, useNavigate } from "react-router-dom";

import ShoppingImage from "@/assets/shopping-person.jpg"

const DesktopHome = () => {
  const navigate = useNavigate()

  const handleNavigate = () => navigate('/account-type')
  return (
    <div className="hidden lg:flex flex-1">
     
      <div className="flex-1 relative">
        <img
          src={ShoppingImage}
          alt="Person with shopping bags"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 via-blue-600/40 to-blue-800/60"></div>
      </div>

   
      <div className="flex-1 flex items-center justify-center bg-white p-12">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
              Welcome to Africa's Most Innovative Digital Economy
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your Next Favorite Find is One Bid Away
            </p>
          </div>

          <div className="flex justify-center space-x-2 mb-8">
            <div className="w-3 h-3 rounded-full bg-teal-500"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          </div>

    
          <div className="space-y-4">
            <button
            onClick={handleNavigate}
            className="w-full py-4 bg-[#00707B] hover:bg-[#00636D] cursor-pointer text-white font-medium rounded-lg transition-colors text-lg">
              Create an account
            </button>

            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-teal-600 hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </div>

       
          <div className="pt-8 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span className="text-gray-600">Secure bidding platform</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span className="text-gray-600">Wide variety of products</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span className="text-gray-600">Fast and reliable delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopHome;
