import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            newTitle: "",
            newBody: ""
        };

        this.listAllNotes = this.listAllNotes.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios
            .get('http://localhost:3001/api/notes/list')
            .then((response) => {
                this.setState({
                    notes: response.data.note
                });
                //console.log(response.data.note)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    listAllNotes() {
        const notesList = this.state.notes.map((elem, index) =>
            <table key={index}>
                <tbody>
                <tr>
                    <td>&nbsp;<b>{elem.title}</b></td>
                    <td rowSpan="2" className={"delete"} onClick={() => this.deleteNote(elem.title)}>X</td>
                </tr>
                <tr>
                    <td>&nbsp;{elem.body}</td>
                </tr>
                </tbody>
            </table>
        );
        return <div>{notesList}</div>;
    }

    deleteNote(noteTitle) {
        //console.log(noteTitle);
        axios
            .all([
            axios.get('http://localhost:3001/api/notes/delete', {
                params: {
                    title: noteTitle
                }
            }),
            axios.get('http://localhost:3001/api/notes/list')
            ])
            .then((response) => {
                this.setState({
                    notes: response[1].data.note
                });
                //console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    handleChange(event) {
        this.setState({ [event.target.name] : event.target.value});
    }

    //add a new note
    handleSubmit(event) {
        //console.log(this.state.newTitle, this.state.newBody);
        event.preventDefault();
        axios
            .all([
                axios.get('http://localhost:3001/api/notes/add', {
                    params: {
                        title: this.state.newTitle,
                        body: this.state.newBody
                    }
                }),
                axios.get('http://localhost:3001/api/notes/list')
            ])
            .then((response) => {
                this.setState({
                    //"note" is an array containing objects (with "title" and "text")
                    notes: response[1].data.note,
                    newTitle: "",
                    newBody: ""
                });
                //console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    //sayBla() { return "bla" }
    //sayBla = () => { return "bla" };

    render() {
        /* ok
        const notesList = this.state.notes.map((elem, index) => (
            <div key={index}>
                <p>Title: {elem.title}, Body: {elem.body}</p>
            </div>
            )
        );
        */

        return (
            <div>
                <h1>Simple Note Maker</h1>
                &nbsp; &nbsp;
                {/* <button>Add a Note</button> */}

                <div>{ this.listAllNotes() }</div>
                {/* ok <div>{notesList}</div> */}

                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="newTitle" placeholder="Type title of new note here." required={true}
                           value={this.state.newTitle} onChange={this.handleChange} /><br/>
                    <input type="text" name="newBody" placeholder="Type text of new note here."
                           value={this.state.newBody} onChange={this.handleChange} /><br/>
                    <input type="submit" value="Create a new note."/>
                </form>
            </div>
        );
    }
}

export default App;
