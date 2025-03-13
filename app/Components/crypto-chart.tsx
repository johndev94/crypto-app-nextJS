import { useEffect, useState } from "react";
import { useAllCryptos } from "../hooks/useAllCryptos";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CoinComboBox, CryptoComboBox } from "./coin-combobox";

export function CryptoChart() {
  const { data: cryptos, isLoading, isError } = useAllCryptos();
  const [value, setValue] = useState<string>("");
  const [formattedPrice, setFormattedPrice] = useState("");

  const [selectedPeriod, setSelectedPeriod] = useState<string>("7D");
  const [comboBoxCoins, setComboBoxCoins] = useState<CryptoComboBox[]>([]);
  const selectedCoin = comboBoxCoins.find((coin) => coin.value === value);

  useEffect(() => {
    if (cryptos) {
      const formattedData: CryptoComboBox[] = cryptos
        .map((crypto: any) => ({
          value: crypto.id,
          label: crypto.name,
          icon: crypto.image,
          price: String(crypto.current_price),
          change:
            crypto.price_change_percentage_24h.toFixed(4)[0] !== "-"
              ? `+${crypto.price_change_percentage_24h.toFixed(4)}`
              : crypto.price_change_percentage_24h.toFixed(4),
        }))
        .filter((item): item is CryptoComboBox => item !== undefined); // Ensure items are valid

      setComboBoxCoins(formattedData);
    }
  }, [cryptos]);

  useEffect(() => {
    if (comboBoxCoins.length > 0 && !value) {
      setValue(comboBoxCoins[0].value); // Default to the first coin
    }
  }, [comboBoxCoins, value]);

  useEffect(() => {
    if (selectedCoin) {
      const numericCoinPrice = parseFloat(selectedCoin.price);
      setFormattedPrice(
        numericCoinPrice.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      );
    }
  }, [selectedCoin]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Cryptocurrency Chart</h2>

      {/* Coin ComboBox for selecting a cryptocurrency */}
      <CoinComboBox 
        coins={comboBoxCoins} 
        isLoading={isLoading} 
        isError={isError} 
        value={value} 
        setValue={setValue} 
      />

      {/* Display the formatted price of the selected cryptocurrency */}
      <div className="mt-4">
        {selectedCoin ? (
          <p className="text-lg font-medium">
            {selectedCoin.label}: {formattedPrice}
          </p>
        ) : (
          <p className="text-gray-500">Select a coin to view details</p>
        )}
      </div>

      {/* Future: Chart Component can be placed here */}
    </div>
  );
}
