// "use client"
// import Link from "next/link";

// import { MultipleChoiceExtended, QuestionExtended } from "@/types/db";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { Fragment, useState } from "react";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { UpdateButton } from "../../update-button";
// import { UpdateSummaryCompletionForm } from "./update-form";

// interface SummaryCompletionRenderProps {
//   question: QuestionExtended
// };
// export const SummaryCompletionRender = ({
//   question
// }: SummaryCompletionRenderProps) => {
//   const [isEdittingQuestion, setEdittingQuestion] = useState(false)
//   if (question.summaryCompletion === undefined || question.summaryCompletion === null) {
//     return null
//   }
//   const words = question.summaryCompletion.sentence.split(' ');
//   return (
//     <div className="flex flex-wrap">
//       <Dialog open={isEdittingQuestion} onOpenChange={setEdittingQuestion}>
//         <DialogContent>
//           <UpdateSummaryCompletionForm summaryCompletion={question.summaryCompletion} setIsEditting={setEdittingQuestion} />
//         </DialogContent>
//       </Dialog>
//       <div className="flex">
//         {words.map((word, index) => (
//           <Fragment key={index}>
//             {word === '___' ? (
//               <input type="text" placeholder="Enter a word" />
//             ) : (
//               <span>{word}</span>
//             )}
//             {index < words.length - 1 && <span>&nbsp;</span>} {/* Add space between words */}
//           </Fragment>
//         ))}
//       </div>
//     </div>
    
//   );
// };