import React from 'react';

// Styles
import { Wrapper, ButtonWrapper } from './Stats.styles';

type Props = {
  correctAnswers: number;
  incorrectAnswers: number;
  hints: number;
  HandleOnClose: () => void;
  isClosed:boolean;
};




const Stats: React.FC<Props> = ({
    correctAnswers,
    hints,
  incorrectAnswers,
  HandleOnClose,
  isClosed
}) =>  (
  <Wrapper>
    <p className='number'>
       Correct Guesses: {correctAnswers}
    </p>
    <p className='number'>
       Wrong Guesses: {incorrectAnswers}
    </p>
    <p className='number'>
       Hints used: {hints}
    </p>
        <ButtonWrapper
          key={'Hide'}
          userClicked={isClosed}
        >
          <button onClick={HandleOnClose}>
          <span dangerouslySetInnerHTML={{ __html: 'Hide Statisrics' }} />
          </button>
        </ButtonWrapper>
      
    

    
   
  </Wrapper>
);

export default Stats;