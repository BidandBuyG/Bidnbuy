type EscrowProductCardProps = {
  escrowHeight: string;
  image: string;
};

const EscrowProductCard = ({escrowHeight, image}: EscrowProductCardProps) => {
  return (
    <div
        className="rounded-lg p-4 mb-6 border w-full"
        style={{
          backgroundColor: "#01212E",
          borderColor: "#00707B",
          height: escrowHeight,
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={image}
            alt="Hermes Birkin Bag"
            width={183}
            height={183}
            className="object-contain"
          />
        </div>
      </div>
  )
}

export default EscrowProductCard