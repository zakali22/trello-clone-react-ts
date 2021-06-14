import React, {useContext, Fragment, useEffect} from 'react';
import {AppContainer} from "./styles/styles"
import Column from "./components/Column"
import Card from "./components/Card"
import AddItem from "./components/AddItem"
import {useAppState} from "./utils/useAppState"
import {addLists} from "./state/appStateActions"
import {CustomDragLayer} from "./components/CustomDragLayer"
import {useMutation, useQuery} from "@apollo/client"
import {ADD_TODO_LIST} from "./graphql/mutations/addTodoList"
import {GET_ALL_LISTS} from "./graphql/queries/getAllLists"
import {v4} from "uuid"

function App() {
  const {state: {lists}, dispatch} = useAppState()
  const {data, loading} = useQuery(GET_ALL_LISTS, {fetchPolicy: 'cache-and-network'})
  const [addTodoList] = useMutation(ADD_TODO_LIST, {
    // refetchQueries: [{query: GET_ALL_LISTS}],
    update(cache: any, {data: {addList}}: any){
      console.log(addList)
      let data = cache.readQuery({query: GET_ALL_LISTS})
      const newData = {
        ...data, 
        getAllLists: [...data.getAllLists, addList]
      }
      cache.writeQuery({ query: GET_ALL_LISTS, data: newData});
    }
  })

  const handleAddList = (task: string) => {
    addTodoList({
      variables: {listTitle: task},     
      optimisticResponse: {
        addList: {
          tasks: [],
          text: task,
          __typename: "List",
          _id: "temp-id"
        }
      }
    })
  }

  useEffect(() => {
    if(data){
      let newList = data.getAllLists.map(({_id, text, tasks}: any) => {
        return {
          _id,
          text,
          tasks
        }
      })
        dispatch(addLists(newList))
    }

    return () => {
      console.log("Unmounted")
    }
  }, [loading])

  if(loading) return <p>Loading</p>
  
  if(lists.length === 0) {
    return (
      <AppContainer>
        <AddItem buttonText="+ Add new list" dark onAdd={(task) => handleAddList(task) }/>
      </AppContainer>
    )
  }

  return (
    <AppContainer>
      <CustomDragLayer />
      {lists.map(list => (
        <Column title={list.text} key={list._id} id={list._id} tasks={list.tasks}/>
      ))}    
      <AddItem buttonText="+ Add new list" dark onAdd={(task) => handleAddList(task)}/>
    </AppContainer>
  );
}

export default App;
