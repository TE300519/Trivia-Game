import { createAsyncThunk,createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IAnswer,IQuiz} from '../models/interface';
import { apiStatusEnum } from '../models/apiStatus';
const TRIVIA_ENDPOINT = '/trivia.json';

export const fetchTodoCollectionAsync = createAsyncThunk(
	'todo/fetchCollection',
	async () => {
		const response = await fetch(TRIVIA_ENDPOINT);
		return await response.json();
	}
);


export const triviaSlice = createSlice({
	name: 'trivia',
	initialState: {
		items: new Array<IQuiz>(),
    result: new Array<string>(),
    status: apiStatusEnum.idle,
	},

	reducers: {

  setScore: (state, action: PayloadAction<IAnswer>) =>{
    const calcAnswer = [...state.result]
    calcAnswer[action.payload.questionId] = action.payload.answerId; 
    state.result = calcAnswer; 
  },


  clean: (state) => {
    state.result = [];
  }

    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchTodoCollectionAsync.pending, (state) => {
          state.status = apiStatusEnum.loading;
        })
        .addCase(fetchTodoCollectionAsync.rejected, (state) => {
          state.status = apiStatusEnum.error;
        })
        .addCase(
          fetchTodoCollectionAsync.fulfilled,
          (state, action: PayloadAction<IQuiz[]>) => {
            state.items = action.payload;
            state.status = apiStatusEnum.idle;
          }
        );
    },

});

export const { setScore, clean } = triviaSlice.actions;
export default triviaSlice.reducer;




