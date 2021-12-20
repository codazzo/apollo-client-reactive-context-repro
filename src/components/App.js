import React from 'react'
import { gql, ApolloProvider, useQuery, ApolloClient, makeVar, InMemoryCache, createHttpLink, useReactiveVar } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import logo from '../logo.svg'
import '../styles/App.css'
import InputName from './InputName'

const HELLO_QUERY = gql`
  query HelloQuery($name: String) {
    hello(name: $name)
  }
`
const nameVar = makeVar('test');

const httpLink = createHttpLink({
  fetch: (uri, options) => {
    return fetch(`http://localhost:4000/`, options)
  }
})

const contextLink = setContext(() => {
  return {
    headers: {
      name: nameVar()
    },
  }
})

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link: contextLink.concat(httpLink)
})

nameVar.attachCache(cache)

function Content() {
  const { loading, error } = useQuery(HELLO_QUERY)
  const nameState = useReactiveVar(nameVar)

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>An unexpected error occurred</div>
  }

  return (
    
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <div>
              <p>What's your name?</p>
              <InputName
                onSubmit={name => {
                  nameVar(name)
                }}
              />
            </div>

            nameState: {nameState}
        </div>
      </div>
  )
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Content />
    </ApolloProvider>
  );
}