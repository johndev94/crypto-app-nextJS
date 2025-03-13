import { Skeleton } from "@/components/ui/skeleton";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { ChevronsUpDown } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export interface CryptoComboBox {
    value: string;
    label: string;
    icon: string;
    price: string;
    change: string;
}   

interface CoinComboBoxProps {
  coins: CryptoComboBox[] | undefined;
  isLoading: boolean;
  isError: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export function CoinComboBox({ coins, isLoading, isError, value, setValue }: CoinComboBoxProps) {
    const [open, setOpen] = React.useState<boolean>(false);

    if (isLoading) {
        return (
            <div className="flex flex-col gap-2">
                <Skeleton className="h-11 w-36" />
                <Skeleton className="h-7 w-32" />
            </div>
        );
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between h-11"
              disabled={isLoading}
            >
              {value ? (
                <div className="flex gap-2 items-center">
                  {coins?.find((coin) => coin.value === value)?.icon ? (
                    <Image
                      src={coins.find((coin) => coin.value === value)?.icon as string}
                      alt={`${coins.find((coin) => coin.value === value)?.label || "coin"} icon`}
                      className="w-5 h-5 mr-2"
                      width={20}
                      height={20}
                    />
                  ) : null}
                  <span>{coins?.find((coin) => coin.value === value)?.label}</span>
                </div>
              ) : (
                <span>Select a coin</span>
              )}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>

          {/* This is where the dropdown content should be */}
          <PopoverContent className="w-[200px] bg-white shadow-md p-2 rounded-md">
            {coins?.map((coin) => (
              <div 
                key={coin.value}
                className="flex items-center gap-2 p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => setValue(coin.value)}
              >
                <Image src={coin.icon} alt={coin.label} width={20} height={20} className="w-5 h-5" />
                <span>{coin.label}</span>
              </div>
            ))}
          </PopoverContent>
        </Popover>
    );
}
