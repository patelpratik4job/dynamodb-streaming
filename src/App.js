import React, {useEffect, useState} from 'react';
import './App.css';
// import { FiRefreshCcw } from 'react-icons/fi';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Amplify, {API} from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';
import * as mutations from './graphql/mutations';
import * as queries from './graphql/queries';
import toast from "light-toast"
import {
  /*Sector*/ Cell, Legend, Tooltip, Label, text,BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line,
} from 'recharts';
Amplify.configure(awsconfig);
library.add(fas)

function App() {
  const [mylist, setMyList] = useState([]);
  const [loop, setLoop] = useState(10);

  useEffect(() => {
    updateVals();
  }, []);

  const updateVals = async() =>{
      const result = await API.graphql({
        query: queries.listWindspeeds,
        fetchPolicy: "no-cache",
      });
      setMyList(result.data.listWindspeeds.items);
      // console.log(result.data.listWindspeeds.items);
    };

  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  async function genValues () {
    // alert("Data generator started");
    for (let i = 0; i < loop; i++) {
    const generateValues = { value: Math.floor(Math.random() * 35) + 25};
    await API.graphql({ query: mutations.createWindspeed, variables: { input: generateValues}});
    // updateVals();
    // sleep(3000);
    }
  }

  function generate () {
    toast.success('Generating values...', 5000, () => {
        alert("Generated 10 values")
    }); 
    genValues();
    // updateVals();
  }

  const refresh = () => {
    // alert("refreshing");
    toast.success('Refreshing...');
    updateVals();
  }
  
  const generateKeyValePairs = (arraytoupdated) => {
    mylist.map((item, index) => {
    var objNeeded = { name: 'init', value: -1};
    objNeeded['name'] = index+1;
    objNeeded['value'] = item.value;
    arraytoupdated.push(objNeeded);
    });
  }

  // generateKeyValePairs();

  function CustomizedLabel(props) {
    const { x, y, stroke, value } = props;
    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
        {value}
      </text>
    );
  }
  const myChartArray = [];
  generateKeyValePairs(myChartArray);

  function CreateLineChart(val){
    // console.log("unsort->",val.data);
    return(
      <LineChart
        width={1000}
        height={500}
        data={val.data}
        margin={{
          top: 20, right: 20, left: 20, bottom: 10,
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" height={60} tick />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" label={<CustomizedLabel />} />
      </LineChart>
      )
  }


  return (
    <div className="App">
      <AmplifySignOut />
      <header className="App-header">

        <h1>Wind turbine data</h1>
        <div className="App-buttons">
        <button className="App-buttonsYes" onClick={generate}>Generate</button>
        {/* <button className="App-buttonsNo" onClick={updateNo}>Stop</button> */}
        <button className="App-buttonsNo" onClick={refresh}>Refresh</button>
        {/* <FontAwesomeIcon icon={['fas', 'sync']} className="fa-spin"></FontAwesomeIcon> */}
        {/* <FontAwesomeIcon icon={faHome} /> */}
        {/* <FiRefreshCcw onClick={refresh} /> */}
        </div>
        <CreateLineChart data={myChartArray} />
        {/* <ul>
        <h3>DATA</h3>
        {mylist.map((item, index) => (
          <p key={index}>{item.value}</p>
        ))}
      </ul> */}
      </header>
    </div>
  );
}

export default withAuthenticator(App);
