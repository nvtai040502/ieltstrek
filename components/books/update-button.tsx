import { Delete, Edit, XCircle } from "lucide-react"
import { Button } from "../ui/button"
import { useEditHook } from "@/global/use-edit-hook"
import { EditData, EditType } from "@/global/edit-context"

export const UpdateButton = ({
  type,
  data
}: {
  type: EditType
  data: EditData  
}) => {
  const {onOpen} = useEditHook()
  return (
    <Button 
      variant="ghost"
      size="xs"
      onClick={() => onOpen({type, data})}
    >
      <Edit />
    </Button>

  )
}

export const DeleteButton = ({
  type,
  data
}: {
  type: EditType
  data: EditData  
}) => {
  const {onOpen} = useEditHook()
  return (
    <Button 
      variant="destructive"
      size="sm"
      onClick={() => onOpen({type, data})}
    >
      <Delete />
    </Button>

  )
}

export const CloseButton = () => {
  const {onClose} = useEditHook()
  return (
    <Button 
      variant="ghost"
      size="xs"
      onClick={onClose}
    >
      <XCircle />
    </Button>

  )
}