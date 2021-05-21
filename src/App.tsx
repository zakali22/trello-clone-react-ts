import React from 'react';
import {AppContainer} from "./styles/styles"
import Column from "./components/Column"
import Card from "./components/Card"
import AddItem from "./components/AddItem"

function App() {
  return (
    <AppContainer>
      <Column title="List 1">
        <Card title="Get started with TS/React" />
      </Column>
      <AddItem buttonText="+ Add new list" dark onAdd={(task) => console.log(task)}/>
    </AppContainer>
  );
}

export default App;
