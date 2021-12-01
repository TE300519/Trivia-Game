import React, { useEffect }from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Navigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import DashBoard from './components/DashBoard';
import Result from './components/Result';
import { Provider } from 'react-redux';
import store from './store';
import { useAppDispatch } from './store/hooks';
import { fetchTodoCollectionAsync } from './store/triviaSlice';


export const AppWithRouting: React.FC = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchTodoCollectionAsync());
	}, [dispatch]);

return(
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='trivia' />} />
          <Route path='summary' element={<Result />} />
          <Route path='trivia' element={<App />}>
          <Route path=':id' element={<DashBoard />} />
          </Route>
        </Routes>
      </BrowserRouter>
);
};

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<AppWithRouting />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();
