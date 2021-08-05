import React, {useRef} from 'react';
// Types
import { AnswerObject } from '../App';
// Styles
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

type Props = {
  question: string;
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  questionNr: number;
  HandleOnChange: (input: string) => void;
  userInput: string;
};


const QuestionCard: React.FC<Props> = ({
  question,
  callback,
  questionNr,
  HandleOnChange,
  userInput
}) => {
  const userInputRef = useRef<HTMLInputElement>(null);


  const OnChangeHandler = (e: any) => {
    if(userInputRef!==null){
      const curr = userInputRef.current;
      if(curr!==null){
        const value = curr.value;
        HandleOnChange(value);
      }
    }
  }
  const OnSubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    callback(e);
    if(userInputRef!==null){
      const curr = userInputRef.current;
      if(curr!==null){
        curr.value = '';
      }
    }
  }
  return (
  <Wrapper>
    <p className='number'>
      Question: {questionNr} 
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <form >
        <input type="text"
        placeholder={'Type your answer here'} 
        onChange={OnChangeHandler} 
        id="user_input"
        ref={userInputRef}
        />
         <div>
        <ButtonWrapper
          key={'Check the guess'}
          userClicked={question === userInput}
        >
          <button disabled={userInput.length===0} value={userInput} onClick={OnSubmitHandler}>
            <span dangerouslySetInnerHTML={{ __html: 'Check the guess' }} />
          </button>
        </ButtonWrapper>
      
    </div>
    </form>
    
   
  </Wrapper>
)};

export default QuestionCard;
