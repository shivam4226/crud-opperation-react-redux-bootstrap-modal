// App.js
import React from 'react';
import { Provider } from 'react-redux';
import UserList from './components/UserList';
import store from './store/configureStore';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <UserList />
      </div>
    </Provider>
  );
}

export default App;
