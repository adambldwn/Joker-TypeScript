import React,{useState} from 'react'
import {Wrapper,Row,Header,Image,Form,Search,Button} from "./components/styled"
import owl from "./images/owl.svg"
import axios from "axios";
import {JokeItem} from "./components/JokeItem";
import { Flag, Category, Joke} from "./common/types";

export const App = () => {

  const [search,setSearch] = useState<string>("")
  const [error,setError] = useState(false);
  const [jokes,setJokes] = useState<Joke[]>([])

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }
  const BASE_URL = "https://v2.jokeapi.dev/joke/Any";

  const getJokes = async(event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ENDPOINT = `${BASE_URL}?contains=${search}&amount=10`;
    const {data} = await axios.get(ENDPOINT);
    if(data.error){
      setError(true);
      setJokes([]);
    }else{
      setError(false)
      setJokes(data.jokes)
    }
    setSearch("")
  }
  return (
    <div>
      <Wrapper>
        <Row>
          <Header>Joker</Header>
          <Image src={owl} alt="Baykus"/>
        </Row>
        <Form onSubmit={getJokes}>
          <Search 
            type="text" 
            placeholder="Search.." 
            value={search}
            onChange={handleChange}
          />
          <Button type="submit">Submit</Button>
        </Form>
        <div>
          {error && <p>Sorry, no jokes found.</p>}
          {jokes.length > 0 &&  // @ts-ignore
           jokes.map(joke => <JokeItem key={joke.id} joke={joke}/>)}
        </div>
      </Wrapper>
    </div>
  )
}
