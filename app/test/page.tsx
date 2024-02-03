"use client";
import { InputGap } from '@/components/ui/input';
import { useState } from 'react';

const NoteCompletionForm = () => {
  const [sentence, setSentence] = useState('');
  const [blanks, setBlanks] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSentence(e.target.value);
  };

  const handleSubmit = () => {
    // Parse the sentence to identify blanks
    const blankIndices: string[] = [];
    const modifiedSentence = sentence.replace(/___/g, (_, index) => {
      blankIndices.push(index.toString());
      return '___';
    });

    // Set blanks state with the indices of blanks
    setBlanks(blankIndices);

    console.log('Modified Sentence:', modifiedSentence);
    // You can now store or process the modified sentence as needed
  };

  const handleBlankChange = (index: string, value: string) => {
    // Update the sentence with the user's input for the blank
    const updatedSentence = sentence.slice(0, +index) + value + sentence.slice(+index + 3);
    setSentence(updatedSentence);
  };

  return (
    <div>
      <h1>Create Note Completion Question</h1>
      <textarea
        rows={4}
        cols={50}
        placeholder="Enter the sentence with '___' for blanks, e.g., 'The capital of France is ___.'"
        value={sentence}
        onChange={handleInputChange}
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>

      {blanks.map((index) => (
        <InputGap
          key={index}
          type="text"
          value={sentence.slice(+index, +index + 3)}
          onChange={(e) => handleBlankChange(index, e.target.value)}
        />
      ))}
    </div>
  );
};

export default NoteCompletionForm;
