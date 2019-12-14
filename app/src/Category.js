import React, { Component } from 'react';
import AppNav from './AppNav'



class  Category extends Component {
    //Internal storage of a component 
    //Equivalent to private fields in java 
    state = { 
        isLoading : true,
        Categories :[]
     }
     //Async function 
     //when the component is mounted , make this async calll the spring boot
     //React app is on 3030 port or spring boot app turns on 8080 port 
     //so in order to resolve this problem , we use a Proxy 
     async componentDidMount(){
        const response = await fetch('/api/categories');
        const body=await response.json();
        this.setState({Categories:body , isLoading:false})
     } 

    render() { 
        const {Categories,isLoading} = this.state;
        if(isLoading){
            return (<div>
                <AppNav></AppNav>Loading ...</div>)
        }
        return ( 
            <div>
                <AppNav></AppNav>
                <h2>Categories</h2>
                {
                    Categories.map(Category =>
                        <div id={Category.id}>
                            {Category.name}
                        </div>
  )
                }
            </div>

         );
    }
}
 
export default Category;