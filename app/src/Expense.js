import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Table,FormGroup, Button,Container,Form,Label,Input} from 'reactstrap';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';
class Expense extends Component { 

    emptyItem = {
        expenseDate: new Date(),
        description: "",
        location: "",
        category: {name :'Travel'}
    }  

    async handleSubmit(event){ 
    
        const item =this.state.item;
        await fetch(`api/expense`, {
            method :'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            } ,
            body : JSON.stringify(item),
        });
        console.log(this.props.history);
        event.preventDefault();
        this.props.history.push("/expenses");  
    }

    async componentDidMount(){
        const response =await fetch('api/categories');
        const body= await response.json();
        this.setState({categories :body, isLoading : false})
        const responseExp =await fetch('api/expenses');
        const bodyExp= await responseExp.json();
        this.setState({expenses :bodyExp, isLoading : false})
    }

    async remove(id){
        await fetch(`/api/expense/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
                let updateExpenses = [...this.state.expenses].filter(i => i.id !== id);
                this.setState({expenses : updateExpenses});
            })}

    
 
    constructor(props){
        super(props)
        this.state = {
            isLoading : true,
            expenses :[],
            categories :[],
            item: this.emptyItem
     }
     this.handleSubmit=this.handleSubmit.bind(this);
     this.handleChange=this.handleChange.bind(this);
     this.handleDateChange=this.handleDateChange.bind(this);
    }


    handleChange(event){
        const target= event.target;
        const value= target.value;
        const name= target.name;
        let item={...this.state.item};
        item[name]= value;
        this.setState({item});
        console.log(item)
    }

    handleDateChange(date){
        let item={...this.state.item}
        item.expenseDate=date;
        this.setState({item})
    }
    render() { 
        const title = <h3>Add Expense </h3>
        const {categories} =this.state;
        const {expenses,isLoading}=this.state;

       let categoriesList=
            categories.map(category =>
                <option id={category.id}>
                    {category.name}
              </option>)
        let rows=
            expenses.map(expense=>
             <tr >
                <td>{expense.description}</td>
                <td>{expense.location}</td>
                <td><Moment date={expense.expenseDate} format="YYYY/MM/DD"/> </td>
                <td>{expense.category.name}</td>
                <td><Button size="sm" color="danger" onClick={ () =>this.remove(expense.id)} >Delete</Button></td>  
            </tr>) 
        
        if(isLoading)
            return(<div>Loading...</div>)
        return ( 

            <div>
            <AppNav></AppNav> 
            <Container>
                <p></p>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="description" id="description" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="category">Category</Label>
                        <select onChange={this.handleChange} name="category" id="category" >  
                            {categoriesList} 
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <Label for="expenseDate">Expense Date</Label>
                        <DatePicker selected={this.state.item.expenseDate} onChange={this.handleDateChange}></DatePicker>
                    </FormGroup>
                    <div className="row">
                    <FormGroup className="col-md-4 mb-3">
                        <Label for="location">Location</Label>
                        <Input type="text" name="location" id="location" onChange={this.handleChange}></Input>
                    </FormGroup>
                    </div>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        {' '}
        <Container>
            <h3>Expense List</h3>
            <Table className="mt-4">
                <thead>
                    <tr>
                        <th width="20%">Description</th>
                        <th width="10%">Location</th>
                        <th width="10%">Date</th>
                        <th width="10%">Category</th>  
                        <th width="10%">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>

            </Table>
        </Container>
        </div> );
    }
}
 
export default Expense;