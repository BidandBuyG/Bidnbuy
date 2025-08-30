type Props = React.SVGProps<SVGSVGElement>

const PlaceBidIcon = (props: Props) => {
  return (
    <>
      <svg
        {...props}
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.50391 15.0022V16.5022H0.503906V15.0022H9.50391ZM9.94266 0.516724L15.7762 6.35022L14.7157 7.41072L13.9199 7.14597L12.0637 9.00222L16.3064 13.245L15.2459 14.3055L11.0032 10.0627L9.20016 11.8657L9.41241 12.7147L8.35116 13.7752L2.51766 7.94172L3.57816 6.88047L4.42716 7.09272L9.14691 2.37297L8.88216 1.57797L9.94266 0.516724ZM10.4729 3.16872L5.16966 8.47122L7.82091 11.1232L13.1242 5.82072L10.4729 3.16872Z"
          fill="white"
        />
      </svg>
    </>
  );
};

export default PlaceBidIcon;
