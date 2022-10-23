import { Component } from 'react';
import Searchbar from './searchbar';
import { AppContainer, Error } from './App.styled';
import { getPictures } from './api/Api';
import ImageGallery from './imageGallery';
import Button from './button';

export class App extends Component {
  state = {
    items: [],
    page: 1,
    query: '',
    error: false,
    counterHits: 0,
  };

  async componentDidUpdate(_, prevState) {
    const { page, query, counterHits } = this.state;
    if (prevState.page !== page || prevState.query !== query) {
      try {
        const { hits, totalHits } = await getPictures(this.state);
        console.log(hits);
        console.log(totalHits);

        counterHits === 0 && this.setState({ counterHits: totalHits });

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
      counterHits: 0,
    });
  };

  buttonClickHandler = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      counterHits: prevState.counterHits - 12,
    }));
  };

  render() {
    const { error, items, counterHits } = this.state;
    return (
      <AppContainer>
        <Searchbar onSubmitForm={this.formSubmitHandler} />
        {error && <Error>Invalid request, please try again</Error>}
        <ImageGallery items={items} />
        {items.length !== 0 && counterHits > 12 && (
          <Button onButtonClick={this.buttonClickHandler} />
        )}
      </AppContainer>
    );
  }
}
