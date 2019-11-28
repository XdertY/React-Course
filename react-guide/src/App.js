import React, { Component } from 'react';
import './App.css';
import Person from "./Person/Person";
import styled from "styled-components";

const StyledButton = styled.button`
            background-color: ${props => props.alt ? 'red' : 'green'};
            color: white;
            font: inherit;
            border: 1px solid green;
            padding: 8px;
            cursor: pointer;
      
            &:hover {
                background-color: ${props => props.alt? 'salmon' : 'lightgreen'};
                color: black;
            }
        
`;

class App extends Component {
    state = {
        persons: [
                {id: 1 ,name: 'Alex', age: 20},
                {id: 2 ,name: 'Max', age: 28},
                {id: 3 ,name: 'Vladi', age: 40}
        ],
            otherState: 'Some other value',
            showPersons: false
        };

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        const person = {
            ...this.state.persons[personIndex]
        };

        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({persons: persons});
    };

    ageChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        const changedPerson = {
            ...this.state.persons[personIndex]
        };

        changedPerson.age = event.target.value;

        const changedPersons = [...this.state.persons];
        changedPersons[personIndex] = changedPerson;

        this.setState({persons: changedPersons});
    };



    deletePersonHandler = (personIndex) => {
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    };

    togglePersonHandler = () => {
        this.setState({showPersons: !this.state.showPersons})
    };


    render() {
        let persons = null;

        if (this.state.showPersons) {
            persons = (
                <div>
                    {this.state.persons.map((person, index) => {
                        return <Person
                            click={() => {this.deletePersonHandler(index)}}
                            name={person.name}
                            age={person.age}
                            key={person.id}
                            nameChange={(event) => this.nameChangedHandler(event, person.id)}
                            ageChange={(event) => this.ageChangedHandler(event, person.id)}/>
                    })}
                </div>

            );
            // style.backgroundColor = 'red';
            // style.border = '2px solid red';
            // style[':hover'] = {
            //     backgroundColor: 'salmon',
            // }
        }

        const classes = [];
        if(this.state.persons.length <= 2) {
            classes.push('red');
        }
        if(this.state.persons.length <=1) {
            classes.push('bold');
        }


        return (
               <div className="App" >
                    <h1>Hi, I am a react app</h1>
                    <p className={classes.join(' ')}>This is really working</p>
                   <StyledButton alt={this.state.showPersons} onClick={this.togglePersonHandler}>
                       {this.state.showPersons ? 'Hide names' : 'Show names'}
                   </StyledButton>
                    {persons}
                </div>
        )
    }
}

export default App;

