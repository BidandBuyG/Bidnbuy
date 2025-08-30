import { Link } from "react-router-dom";

import ShoppingImage from '@/assets/shopping-person.jpg'

import { useNavigate } from "react-router-dom"

const MobileHome = () => {
  const navigate = useNavigate()

  const handleNavigate = () => navigate('/account-type')

  return (
    <div className="lg:hidden relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={ShoppingImage}
          alt="Person with shopping bags"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-300/30 via-blue-800/50 to-blue-900/80"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full px-6 pb-8 pt-16">
        <div className="flex-grow"></div>

        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-bold text-white leading-tight">
            Welcome to Africa's Most Innovative Digital Economy
          </h1>
          <p className="text-gray-200 text-lg">
            Your Next Favorite Find is One Bid Away
          </p>
        </div>

        <div className="flex justify-center space-x-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-teal-400"></div>
          <div className="w-2 h-2 rounded-full bg-white/40"></div>
          <div className="w-2 h-2 rounded-full bg-white/40"></div>
        </div>

        <div className="space-y-4">
          <button
          onClick={handleNavigate}
            className="w-full py-4 bg-[#00707B] hover:bg-[#00636D] cursor-pointer text-white font-medium rounded-md transition-colors">
            Create an account
          </button>
          <p className="text-center text-white">
            Already have an account?{" "}
            <Link to="/login" className="text-teal-300 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileHome;
