import { Check } from "lucide-react"
import { Button } from "../ui/button"
import QuestionPalette from "./question-palette"

const SectionsNavigator = () => {
  return (
    <div className="flex justify-between">
      <QuestionPalette />
      <QuestionPalette />
      <QuestionPalette />
      <Button size="xl" variant="ghost">
        <Check />
      </Button>
    </div>
  )
}
export default SectionsNavigator