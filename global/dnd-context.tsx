import { Dispatch, SetStateAction, createContext } from 'react';
import { MatchingChoice } from '@prisma/client';

interface DndContextProps {
  questionGroupId: string;
  matchingChoiceList: MatchingChoice[];
  prevContent: string;
  choiceGroupOver: boolean;
  setChoiceGroupOver: Dispatch<SetStateAction<boolean>>;
  // questionIdOver: { [id: string]: boolean };
  // setQuestionIdOver: Dispatch<SetStateAction<{ [id: string]: boolean }>>;
  setPrevContent: Dispatch<SetStateAction<string>>;
  setMatchingChoiceList: Dispatch<SetStateAction<MatchingChoice[]>>;
  setQuestionGroupId: Dispatch<SetStateAction<string>>;
  matchingChoiceId: string;
  setMatchingChoiceId: Dispatch<SetStateAction<string>>;
  questionId: string;
  setQuestionId: Dispatch<SetStateAction<string>>;
}

export const DndContext = createContext<DndContextProps>({
  questionGroupId: '',
  matchingChoiceId: '',
  questionId: '',
  matchingChoiceList: [],
  prevContent: '',
  choiceGroupOver: false,
  // questionIdOver: {},
  // setQuestionIdOver: () => {},
  setChoiceGroupOver: () => {},
  setPrevContent: () => {},
  setMatchingChoiceList: () => {},
  setQuestionId: () => {},
  setMatchingChoiceId: () => {},
  setQuestionGroupId: () => {}
});
