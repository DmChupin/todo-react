import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css'

export default class App extends Component {
    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch'),
        ],
        term: '',
        filter: 'All',
    };

    createTodoItem(label) {
        return {
            label,
            done: false,
            important: false,
            id: this.maxId++,
        };
    };

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const before = todoData.slice(0, idx);
            const after = todoData.slice(idx + 1);

            return {
                todoData: [...before, ...after],
            }
        })
    }

    addItem = (label) => {
        const item = this.createTodoItem(label);

        this.setState(({todoData}) => {
            return {
                todoData: [...todoData, item],
            };
        });
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        const before = arr.slice(0, idx);
        const after = arr.slice(idx + 1);

        return [...before, newItem, ...after];
    };

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            const newArray = this.toggleProperty(todoData, id, 'important');
            return {
                todoData: newArray
            }
        })
    };

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            const newArray = this.toggleProperty(todoData, id, 'done');
            return {
                todoData: newArray
            }
        })
    };

    onLabelSearch = (term) => {
        this.setState({term});
    }

    search = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter((el) => el.label.toLowerCase().includes(term.toLowerCase()));
    }

    onFilterChange = (filter) => {
        this.setState({filter});
    }

    filter = (items, filter) => {
        switch (filter) {
            case 'All':
                return items;
            case 'Active':
                return items.filter((el) => !el.done);
            case 'Done':
                return items.filter((el) => el.done);
            default:
                return items;
        }
    }

    render() {
        const {todoData, term, filter} = this.state;

        const searchedItems = this.search(todoData, term);

        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        const visibleItems = this.filter(searchedItems, filter);

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel onLabelSearch={this.onLabelSearch}/>
                    <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange}/>
                </div>

                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleDone={this.onToggleDone}
                    onToggleImportant={this.onToggleImportant}
                />
                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
        );
    };
};
