import { Check } from "lucide-react"
import { Button } from "../ui/button"
import QuestionPalette from "./question-palette"
import { Part } from "@prisma/client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Card, CardHeader } from "../ui/card"
import ResizePannelGroup from "./resize-pannel-group"

const PartsNavigator = ({
  parts
}: {
  parts: Part[]
}) => {
  return (
    <div className="flex justify-between">
      <QuestionPalette />
        <QuestionPalette />
        <QuestionPalette />
        <QuestionPalette />
        <QuestionPalette />
        <QuestionPalette />

    </div>
  )
}
export default PartsNavigator