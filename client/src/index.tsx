import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import reportWebVitals from './reportWebVitals';
import {AppStateProvider} from "./state/context/AppStateContext"
import {DndProvider} from "react-dnd"
import {HTML5Backend as Backend} from "react-dnd-html5-backend"
import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client"

// Create client to initialize and connect to React
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000/graphql'
})


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <DndProvider backend={Backend}>
        <AppStateProvider>
          <App />
        </AppStateProvider>
      </DndProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
