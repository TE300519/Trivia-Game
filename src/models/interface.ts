export interface IAnswer{
   questionId: number;
   answerId: string;
}

export interface IQuiz{
   question: string;
   answers: string[];
   correctAnswer: string;
 }
