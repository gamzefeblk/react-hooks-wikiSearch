import React, {useEffect,useState } from 'react'
import axios from 'axios'
import {Label,Input,Form} from "semantic-ui-react"
export default function Search() {

    const [term,setTerm]=useState("") 
    const [results,setResults]=useState([])

    useEffect( () => {

      // directly run function with
      //(async()=>{
      //   await axios.get("https://en.wikipedia.org/w/api.php") 
      // }
      // )()
      const search = async () => {
        const {data} = await axios.get("https://en.wikipedia.org/w/api.php",{
          params:{
            action:"query",
            list:"search",
            format:"json",
            origin:"*",
            srsearch:term
          }
        }) 
        console.log(data);
        setResults(data.query.search)
      }
      search()
    }, [term] )

    const renderedResults = results.map((result,index) => (
      <div className='item' key={index}>
        <div className='content'>
            <div className='ui header'>{result.title}</div>
            <span size='large' verticalAlign='middle' dangerouslySetInnerHTML={{__html:result.snippet}}></span>
        </div>
      </div>
    ))
    
    const inputChange = (e) => {
      setTerm(e.target.value)
    }

  return(
  <div>  
      <div className='ui form container'>
        <div className='field'> 
          <Label size="massive" className='label'> Enter Search Term</Label>
          <div className="ui icon input">
            <Input type="text" 
                   value={term} 
                   size="large"
                   onChange={(e) => inputChange(e)} 
                   placeholder="Search..."/>
                     <i aria-hidden="true" className="search icon"></i>
          </div>
       </div>
       <div className='ui celled list'>{renderedResults}</div>
      </div>
  </div>
  )
  
}
