"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {useState} from "react";
import { useToast } from "@/components/ui/use-toast";
import { hiddenAnimation } from "@/utils/framer-motion-utils";
import {motion} from 'framer-motion'
export function InputWithButton() {
    const [inputValue, setInputValue] = useState("");
    const { toast } = useToast();


// function to trigger the toast component based on the input value
    function inputChangeHandler(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      if (inputValue.length > 0) {
        toast({
          description: "Succesfully subscribed",
        });
        setInputValue("");
      }
    }
  return (
    <motion.form  variants={hiddenAnimation}  onSubmit={inputChangeHandler} className="w-full gap-2 flex-wrap flex items-center justify-center ">
      <Input
        type="email"
        placeholder="Email"
        required
        value={inputValue}
        className="max-w-sm w-1/2 min-w-[200px]"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
      />
      <Button type="submit">
        Subscribe
      </Button>
    </motion.form>
  );
}
