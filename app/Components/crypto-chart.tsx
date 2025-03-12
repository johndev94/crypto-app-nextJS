import { useEffect, useState } from "react";
import { useAllCryptos } from "../hooks/useAllCryptos";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CryptoComboBox } from "./coin-combobox";

export function CryptoChart() {
  const { data: cryptos, isLoading, isError } = useAllCryptos();
  const [value, setValue] = useState<string>("");
  const [formattedPrice, setFormattedPrice] = useState("");

  const [selectedPeriod, setSelectedPeriod] = useState<string>("7D");
  const [comboBoxCoins, setComboBoxCoins] = useState<CryptoComboBox[]>([]);
  const selectedCoin = comboBoxCoins.find((coin) => coin.value === value);

  useEffect(() => {
    if (cryptos) {
      const formattedData: CryptoComboBox[] = (cryptos as unknown[])
        .map((crypto: unknown) => {
          if (
            typeof crypto === "object" &&
            crypto !== null &&
            "id" in crypto &&
            "image" in crypto &&
            "name" in crypto &&
            "current_price" in crypto &&
            "price_change_percentage_24h" in crypto
          ) {
            return {
              value: crypto.id as string,
              label: crypto.name as string,
              icon: crypto.image as string,
              price: crypto.current_price.toString(), // Convert to string correctly
              change: (crypto.price_change_percentage_24h as number).toFixed(4), // No need for ternary
            };
          }
          return undefined;
        })
        .filter((coin): coin is CryptoComboBox => coin !== undefined); // Remove undefined values

      setComboBoxCoins(formattedData);
    }
  }, [cryptos]); // Ensure useEffect runs when cryptos change

  return <div>{/* Add your UI elements here */}</div>;
}

export interface CryptoComboBox {
  value: string;
  label: string;
  icon: string;
  price: string;
  change: string;
}
