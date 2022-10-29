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

        counterHits === 0 && setCounterHits(totalHits);

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
  }, [query, page, counterHits]);

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

// export class OldApp extends Component {
//   state = {
//     items: [],
//     page: 1,
//     query: '',
//     error: false,
//     counterHits: 0,
//     isLoading: false,
//   };

//   async componentDidUpdate(_, prevState) {
//     const { page, query, counterHits } = this.state;
//     if (prevState.page !== page || prevState.query !== query) {
//       try {
//         this.setState({ isLoading: true });
//         const { hits, totalHits } = await getPictures(this.state);

//         counterHits === 0 && this.setState({ counterHits: totalHits });

//         hits.length === 0
//           ? this.setState({ error: true })
//           : this.setState(prevState => ({
//               items: [...prevState.items, ...hits],
//             }));
//       } catch (error) {
//         console.log(error);
//         this.setState({
//           error: true,
//         });
//       } finally {
//         this.setState({ isLoading: false });
//       }
//     }
//   }

//   formSubmitHandler = query => {
//     this.setState({
//       items: [],
//       page: 1,
//       query,
//       error: false,
//       counterHits: 0,
//       isLoading: false,
//     });
//   };

//   buttonClickHandler = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//       counterHits: prevState.counterHits - 12,
//     }));
//   };

//   render() {
//     const { error, items, counterHits, isLoading } = this.state;
//     return (
//       <AppContainer>
//         <Searchbar onSubmitForm={this.formSubmitHandler} />
//         {error && <Error>Invalid request, please try again</Error>}
//         {items.length > 0 && <ImageGallery items={items} />}
//         {isLoading && <Loader />}
//         {items.length !== 0 && counterHits > 12 && (
//           <Button onButtonClick={this.buttonClickHandler} />
//         )}
//       </AppContainer>
//     );
//   }
// }
