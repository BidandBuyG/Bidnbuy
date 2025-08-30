import { useEffect, useState } from "react";
import type { ShippingMethod } from "./types/shipping";

export const useShippingMethods = () => {

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

  return { setSelectedMethod, formatShippingLabel }

}