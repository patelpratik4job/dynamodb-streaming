import React, {useEffect} from 'react';
import './App.css';
import Amplify, {API} from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';
import Toast from 'light-toast';
import * as mutations from './graphql/mutations';
import * as queries from './graphql/queries';
Amplify.configure(awsconfig);


function App() {

  const todoUpdateYes = {
    name: 'Subscribe',
    value: 'Yes'
  };
  
  const todoUpdateNo = {
    name: 'Subscribe',
    value: 'No'
  };

  useEffect(() => {
    async function fetchData() {
    const newTodo = await API.graphql({ query: queries.listTodos});
    // console.log(newTodo);
    const temp = Math.floor(Math.random() * 6) + 1 
    console.log(temp);
  }
  fetchData();
  }, []);

  async function updateYes () {
    await API.graphql({ query: mutations.createTodo, variables: {input: todoUpdateYes}});
    Toast.success('Subscribed' );
  }

  async function updateNo () {
    await API.graphql({ query: mutations.createTodo, variables: {input: todoUpdateNo}});
    Toast.success('Unsubscribed');
  }

  return (
    <div className="App">
      <AmplifySignOut />
      <header className="App-header">
        
        <h1>Would you like to subscribe emails?</h1>
        <div className="App-buttons">
        <button className="App-buttonsYes" onClick={updateYes}>Subscribe</button>
        <button className="App-buttonsNo" onClick={updateNo}>Unsubscribe</button>
        </div>

        {/* <h1>Send IoT Data</h1>
        <div className="App-buttons">
        <button className="App-buttonsYes" onClick={updateYes}>Start</button>
        <button className="App-buttonsNo" onClick={updateNo}>Stop</button>
        </div> */}
      </header>
    </div>
  );
}

export default withAuthenticator(App);
