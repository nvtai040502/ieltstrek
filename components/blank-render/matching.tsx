import { DragEvent, useState } from 'react';
import { cn } from '@/lib/utils';
import { css } from '@emotion/css';
import { Droppable } from '@hello-pangea/dnd';
import { QuestionType } from '@prisma/client';

export function TestReadOnlyMatchingBlankRender({
  questionNumber
}: {
  questionNumber: number;
}) {
  const [isOver, setIsOver] = useState(false);
  const [content, setContent] = useState('');
  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    console.log('Destination:', event.target);
    const data = JSON.parse(event.dataTransfer?.getData('text/plain') || '');
    const content = data.content;

    console.log('Dropped matching choice ID:', content);
    setContent(content);
  };
  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    setIsOver(true);
  };
  const handleDragLeave = (event: DragEvent) => {
    event.preventDefault();
    setIsOver(false);
  };
  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        // ref={questionRefs[item.question!.questionNumber - 1]}
        className={cn(
          'border border-secondary-foreground w-full p-4',
          isOver ? 'bg-red-500' : ''
        )}
      >
        {content}
      </div>
    </div>
  );
}
export function ReadOnlyMatchingBlankRender({
  questionNumber
}: {
  questionNumber: number;
}) {
  return (
    <Droppable
      type={QuestionType.MATCHING}
      droppableId={String(questionNumber)}
    >
      {(provided, snapshot) => (
        <div
          ref={
            // questionRefs[item.question!.questionNumber - 1] &&
            provided.innerRef
          }
          {...provided.droppableProps}
          className="border border-secondary-foreground w-full p-4"
        >
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

const InlineChromiumBugfix = () => (
  <span
    contentEditable={false}
    className={css`
      font-size: 0;
    `}
  >
    {String.fromCodePoint(160) /* Non-breaking space */}
  </span>
);

export const EditMatchingBlankRender = ({ attributes, children }) => {
  return (
    /*
      Note that this is not a true button, but a span with button-like CSS.
      True buttons are display:inline-block, but Chrome and Safari
      have a bad bug with display:inline-block inside contenteditable:
      - https://bugs.webkit.org/show_bug.cgi?id=105898
      - https://bugs.chromium.org/p/chromium/issues/detail?id=1088403
      Worse, one cannot override the display property: https://github.com/w3c/csswg-drafts/issues/3226
      The only current workaround is to emulate the appearance of a display:inline button using CSS.
    */
    <span
      {...attributes}
      onClick={(ev) => ev.preventDefault()}
      // Margin is necessary to clearly show the cursor adjacent to the button
      className={css`
        margin: 0 0.1em;

        background-color: #efefef;
        padding: 2px 6px;
        border: 1px solid #767676;
        border-radius: 2px;
        font-size: 0.9em;
      `}
    >
      <InlineChromiumBugfix />
      {children}
      <InlineChromiumBugfix />
    </span>
  );
};
