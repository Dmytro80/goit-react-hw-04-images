import { useState, useEffect } from 'react';
import Searchbar from './searchbar';
import { AppContainer, Error } from './App.styled';
import { getPictures } from './api/Api';
import ImageGallery from './imageGallery';
import Button from './button';
import Loader from './loader';

export const App = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(false);
  const [counterHits, setCounterHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const paramsRequest = {
      page,
      query,
      controller,
    };

    async function fetchPictures() {
      try {
        if (query === '') {
          return;
        }

        setIsLoading(true);

        const { hits, totalHits } = await getPictures(paramsRequest);

        page === 1 && setCounterHits(totalHits);

        hits.length === 0
          ? setError(true)
          : setItems(prevState => [...prevState, ...hits]);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPictures();

    return () => {
      controller.abort();
    };
  }, [query, page]);

  function formSubmitHandler(query) {
    setItems([]);
    setPage(1);
    setQuery(query);
    setError(false);
    setCounterHits(0);
    setIsLoading(false);
  }

  function buttonClickHandler() {
    setPage(state => state + 1);
    setCounterHits(state => state - 12);
  }

  return (
    <AppContainer>
      <Searchbar onSubmitForm={formSubmitHandler} />
      {error && <Error>Invalid request, please try again</Error>}
      {items.length > 0 && <ImageGallery items={items} />}
      {isLoading && <Loader />}
      {items.length !== 0 && counterHits > 12 && (
        <Button onButtonClick={buttonClickHandler} />
      )}
    </AppContainer>
  );
};
