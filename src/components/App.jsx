import { Component } from 'react';
import Searchbar from './searchbar';
import { AppContainer, Error } from './App.styled';
import { getPictures } from './api/Api';
import ImageGallery from './imageGallery';

export class App extends Component {
  state = {
    items: [],
    page: 1,
    query: '',
    error: false,
  };

  async componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (prevState.page !== page || prevState.query !== query) {
      try {
        const { hits } = await getPictures(this.state);
        console.log(hits);

        hits.length === 0
          ? this.setState({ error: true })
          : this.setState(prevState => ({
              items: [...prevState.items, ...hits],
            }));
      } catch (error) {
        console.log(error);
        this.setState({
          error: true,
        });
      }
    }
  }

  formSubmitHandler = query => {
    this.setState({
      items: [],
      page: 1,
      query,
      error: false,
    });
  };
  render() {
    const { error, items } = this.state;
    return (
      <AppContainer>
        <Searchbar onSubmitForm={this.formSubmitHandler} />
        {error && <Error>Invalid request, please try again</Error>}
        <ImageGallery items={items} />
      </AppContainer>
    );
  }
}
