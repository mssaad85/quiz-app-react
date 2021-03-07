import React, {Component} from 'react';
import Question from './question/Question';
import Answer from './answer/Answer';
// import './QuizMain.css';

export default class Quiz extends Component {

    // initiating the local state
    state = {
        quiestions: {
            1: 'What HTML Stands for"?',
            2: 'What is the capital of Pakistan?',
            3: 'What does CSS stands for?'
        },
        answers: {
            1: {
                1: 'Hyper Text multiple language',
                2: 'Hyper txet mark-up language',
                3: 'Hyper text language'
            },
            2: {
                1: 'Karachi',
                2: 'Lahore',
                3: 'Islamabad'
            },
            3: {
                1: 'Cascade Style Sheet',
                2: 'Chart style sheet',
                3: 'Cheat Style sheet'
            }
        },
        correctAnswers: {
            1: '2',
            2: '3',
            3: '1'
        },
        correctAnswer: 0,
        clickedAnswer: 0,
        step: 1,
        score: 0
    }

    // the method that checks the correct answer
    checkAnswer = answer => {
        const { correctAnswers, step, score } = this.state;
        if(answer === correctAnswers[step]){
            this.setState({
                score: score + 1,
                correctAnswer: correctAnswers[step],
                clickedAnswer: answer
            });
        }else{
            this.setState({
                correctAnswer: 0,
                clickedAnswer: answer
            });
        }
    }

    // method to move to the next question
    nextStep = (step) => {
        this.setState({
            step: step + 1,
            correctAnswer: 0,
            clickedAnswer: 0
        });
    }

    render(){
        let { quiestions, answers, correctAnswer, clickedAnswer, step, score } = this.state;
        return(
            <div className="Content">
                {step <= Object.keys(quiestions).length ? 
                    (<>
                        <Question
                            question={quiestions[step]}
                        />
                        <Answer
                            answer={answers[step]}
                            step={step}
                            checkAnswer={this.checkAnswer}
                            correctAnswer={correctAnswer}
                            clickedAnswer={clickedAnswer}
                        />
                        <button
                        className="NextStep"
                        disabled={
                            clickedAnswer && Object.keys(quiestions).length >= step
                            ? false : true
                        }
                        onClick={() => this.nextStep(step)}>Next</button>
                    </>) : (
                        <div className="finalPage">
                            <h1>You have completed the quiz!</h1>
                            <p>Your score is: {score} of {Object.keys(quiestions).length}</p>
                            <p>Thank you!</p>
                        </div>
                    )
                }
            </div>
        );
    }
}