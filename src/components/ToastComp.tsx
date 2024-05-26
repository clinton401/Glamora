import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
function ToastComp() {
  const { toast } = useToast()
 
  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          description: "Your message has been sent.",
        })
      }}
    >
      Show Toast
    </Button>)
}

export default ToastComp;
