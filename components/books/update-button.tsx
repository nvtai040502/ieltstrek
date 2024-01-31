import { Edit } from "lucide-react"
import { Button } from "../ui/button"

export const UpdateButton = ({
  setIsUpdating
}: {
  setIsUpdating: () => void
}) => {
  return (
    <Button 
      variant="ghost"
      onClick={setIsUpdating}
    >
      <Edit />
    </Button>

  )
}