import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
// Components
import QuestionCard from './components/QuestionCard';
import Stats from './components/Stats';

// types
import { QuestionsState, Difficulty } from './API';
// Styles
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};


const App: React.FC = () => {
  //switches
  const [loading, setLoading] = useState(false);
  const [hintIsInUse, setHintIsInUse] = useState(false);
  const [showStats, setShowStats] = useState(false);

  //data
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  //counters
  const [number, setNumber] = useState(0);
  const [correctUserAnswers, setCorrectUserAnswer] = useState(0);
  const [incorrectUserAnswers, setIncorrectUserAnswer] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  //view
  const [userInput, setUserInput] = useState('');
  const [currentQuestion, setQurrentQuestion] = useState('');
  const [currentHint, setCurrentHint] = useState('');

  const startTrivia = async () => {
    setLoading(true);
    const newQuestions = await fetchQuizQuestions(
     10,
      Difficulty.EASY
    );
    setShowStats(false);
    setHintIsInUse(false);
    setQuestions(newQuestions);
    setCorrectUserAnswer(0);
    setIncorrectUserAnswer(0);
    setNumber(0);
    setHintsUsed(0);
    if(!!newQuestions[0]) setViewData(newQuestions[0]);
    setLoading(false);
    
  };

  const setDataForNextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;
    setNumber(nextQ);
    setViewData(questions[nextQ]);
  };

  const setViewData = (question: QuestionsState) => {
    //reset display data for new question
    
    const newQuestion = createQuestion(question.correct_answer);
    setQurrentQuestion(() => newQuestion);
    setCurrentHint(()=>question.category);
    setHintIsInUse(()=>false);
  }

  const createQuestion = (movieName: string): string => {
    const stringInCharacters = Array.from(movieName);
    
   return stringInCharacters.reduce((backToString,single_character)=>{
     if(single_character === ' ') return backToString + ' ';
     return backToString + (Math.random()<0.6?single_character:'_')
    });
  };

  const HandleUserInput = (e:string) => {
    setUserInput(e);
  }

  const checkAnswer = (e: any) => {
      // User's answer
      const answer = e.currentTarget.value.trim();
      // Check answer against correct answer
      const correct = questions[number].correct_answer.toLowerCase() === answer.toLowerCase();
      // Add score if answer is correct
      if (correct) {
        setCorrectUserAnswer((prev) =>  prev + 1);
        setDataForNextQuestion();
      }
      else {  
        setIncorrectUserAnswer((prev) => prev + 1)
      };
      setUserInput((prev) => '');
  };

  const useHint = () => {
    setHintIsInUse(()=>true);
    setHintsUsed((prev)=> prev + 1);
  };

  const toggleStats = () => {
    setShowStats((prev)=>!prev);
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>TV Trivia</h1>
        {questions.length === 0 && !loading ? (
          <button className='start' onClick={startTrivia}>
            Start
          </button>
        ) : null}
        
        {loading ? <p>Loading Questions...</p> : null}
        {questions.length === 0 ||!loading && (
          <QuestionCard
            questionNr={number + 1}
            question={currentQuestion}
            callback={checkAnswer}
            HandleOnChange={HandleUserInput}
            userInput={userInput}
          />
        )}
        {!loading &&  !!questions[number] && !hintIsInUse? (
          <button className='next' onClick={useHint}>
            ?
          </button>
        ) : null}
        {hintIsInUse? (
             <p dangerouslySetInnerHTML={{ __html: currentHint }} />
        ) : null}
        {!loading &&  !showStats && questions.length > 0? (
          <button className='next' onClick={toggleStats}>
            Show Statistics
          </button>
        ) : null}
        {showStats && <Stats
          correctAnswers={correctUserAnswers}
          hints={hintsUsed}
          incorrectAnswers={incorrectUserAnswers}
          HandleOnClose={toggleStats}
          isClosed={!showStats}
        />}
      </Wrapper>
    </>
  );
};

export default App;
