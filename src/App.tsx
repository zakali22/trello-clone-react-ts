import React, {useContext, Fragment} from 'react';
import {AppContainer} from "./styles/styles"
import Column from "./components/Column"
import Card from "./components/Card"
import AddItem from "./components/AddItem"
import {useAppState} from "./utils/useAppState"

function App() {
  const {lists} = useAppState()
  
  if(lists.length === 0) {
    return (
      <AppContainer>
        <AddItem buttonText="+ Add new list" dark onAdd={(task) => console.log(task)}/>
      </AppContainer>
    )
  }

  return (
    <AppContainer>
      {lists.map(list => (
        <Column title={list.text} key={list.id} id={list.id}/>
      ))}    
      <AddItem buttonText="+ Add new list" dark onAdd={(task) => console.log(task)}/>
    </AppContainer>
  );
}

export default App;
