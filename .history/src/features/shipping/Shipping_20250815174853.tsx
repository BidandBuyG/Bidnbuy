// Shipping.tsx
import { useEffect, useState } from "react";

import { ShippingMethod } from "./types/sH"



const Shipping = () => {
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState("Standard");

  const selectedShipping = shippingMethods.find(
    (method) => method.name === selectedMethod
  );
  
  const formatShippingLabel = (provider: string) => `Ship via ${provider}`;

  useEffect(() => {
    const fetchShippingMethods = async () => {
      try {
        const response = await fetch(
          "https://67d8ebee00348dd3e2a8b9f0.mockapi.io/api/v1/shipping-methods"
        );
        const data: ShippingMethod[] = await response.json();

        setShippingMethods(data);
      } catch (error) {
        console.error("Error fetching shipping methods", error);
      }
    };

    fetchShippingMethods();
  }, []);


  return (
    <>
      <div className="mx-auto p-4 border rounded-lg w-80 shadow-md bg-white">
        <h3 className="text-lg font-semibold mb-3">Shipping</h3>
        <div className="flex flex-col gap-2">
          {shippingMethods.map((method) => (
            <label key={method.id} className="flex items-center gap-2">
              <input
                type="radio"
                name="shipping"
                value={method.name}
                checked={selectedMethod === method.name}
                onChange={() => setSelectedMethod(method.name)}
              />
              <span>{method.name}</span>
            </label>
          ))}
        </div>

        <div className="mt-4 p-3 border rounded-lg bg-gray-100">
          <h4 className="text-md font-medium mb-2">Order Summary</h4>
          <p>
            <strong>Selected Shipping:</strong> {selectedMethod}
          </p>
          <p>
            <strong>Shipping Cost:</strong> ${selectedShipping ? selectedShipping.amount : "0.00"}
          </p>
          <p>
            <strong>Total:</strong> ${selectedShipping ? selectedShipping.amount : "0.00"}
          </p>
        </div>

        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg w-full">
          Confirm Shipping
        </button>
      </div>
    </>
  );
};

export default Shipping;
