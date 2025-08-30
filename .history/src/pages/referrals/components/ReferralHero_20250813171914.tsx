/**
 * @file components/referral/referral-hero.tsx
 * @description Hero section component for the referral page with illustration and main message.
 */


import ReferralIllustrationImage from "@/assets/bids-and-credits/referral-illustration.png"

const ReferralHero = () => {
  return (
    <div className="mb-8">
      
      <div className="md:hidden">
        <div className="mb-6">
          <h2 className="text-white text-xl font-semibold mb-4">Invite your friends</h2>
          <p className="text-gray-300 text-base leading-relaxed">
            Share your referral code with your friends and get rewarding when they sign up and complete the first order.
          </p>
        </div>

        <div
          className="relative p-6 rounded-lg mb-6 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
          }}
        >
          <div className="relative z-10">
            <h3 className="text-white text-xl font-bold mb-2">Refer a friend, earn 10 BidCredits</h3>
            <p className="text-white/90 text-sm">
              For each friend who signs up and completes their first order, you will both receive 10 bid credits.
            </p>
          </div>

       
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-24 h-24">
            <img
              src={ReferralIllustrationImage}
              alt="Friends giving high five"
              width={96}
              height={96}
              className="object-contain"
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-end pr-6">
            <img
              src={ReferralIllustrationImage}
              alt="Friends giving high five"
              width={150}
              height={150}
              className="object-contain opacity-80"
            />
          </div>
        </div>
      </div>
        </div>
      </div>

    
      <div className="hidden md:block mb-8">
        <h1 className="text-white text-4xl font-bold mb-6">Refer a friend</h1>
        <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
          Invite your friends to join and you'll both get a reward when you sign up and make their first purchase
        </p>
      </div>
    </div>
  )
}


export default ReferralHero;