import TodoHeader from '../todo-header/TodoHeader';
import * as React from 'react';
import './App.css';
import {IState} from "./types/IState";
import {IProps} from "./types/IProps";
import {connect} from "react-redux";
import {IAppState} from "../../store/AppStore";
import firebase from '../../firebase';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

class App extends React.Component<IProps, IState> {
    public state: any;
    public unsubscribe: any;
    public columns: any;
    private ref: any;

    constructor(props: IProps, context: any) {
        super(props, context);
        this.ref = firebase.firestore().collection('users');
        this.state = {
            users: []
        }
        this.columns = [
            {
                Header: "Name",
                accessor: "name"
            },
            {
                Header: "Email",
                accessor: "email"
            },
            {
                Header: "Age",
                accessor: "age"
            },
            {
                Header: "Phone",
                accessor: "phone"
            }
        ];
    }

    public onCollectionUpdate = (querySnapshot: any) => {
        const users: any = [];
        querySnapshot.forEach((doc: any) => {
          const { name, email, age, phone } = doc.data();
          users.push({
            name,
            email,
            age,
            phone
          });
        });
        this.setState({
          users
        });
    }
    
    public componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    public renderReactTable = (users: any) => {
        return (
            <ReactTable
                columns={this.columns}
                defaultPageSize={5}
                showPaginationBottom={true}
                className="-striped -highlight"
                data={users}
                filterable={true}
            />
        );
    }

    public render() {
        return (
            <div className="App">
                <TodoHeader name={this.props.name} />
                {/* {this.state.users.map((user: any) =>
                  <tr key={user.key}>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.phone}</td>
                  </tr>
                )} */}
                {this.renderReactTable(this.state.users)}
            </div>
        );
    }
}

const mapStateToProps = (state: IAppState) => ({
    tasks: state.tasks,
    name: state.name.name
})

export default connect(mapStateToProps)(App);
