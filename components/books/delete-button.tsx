import { Delete, Edit } from "lucide-react"
import { Button } from "../ui/button"

export const DeleteButton = ({
  setIsUpdating
}: {
  setIsUpdating: () => void
}) => {
  return (
    <Button 
      variant="destructive"
      size="sm"
      onClick={setIsUpdating}
    >
      <Delete />
    </Button>

  )
}