import { Component } from 'react';
import Searchbar from './searchbar';
import { AppContainer } from './App.styled';

export class App extends Component {
  state = {
    items: [],
    page: 1,
    query: '',
  };

  formSubmitHandler = query => {
    this.setState({
      items: [],
      page: 1,
      query,
    });
  };
  render() {
    return (
      <AppContainer>
        <Searchbar onSubmitForm={this.formSubmitHandler} />
      </AppContainer>
    );
  }
}
