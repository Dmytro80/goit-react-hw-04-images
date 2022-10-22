import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormInput,
  SearchFormButton,
  SearchFormButtonLabel,
  Error,
} from './Searchbar.styled';
import { AiOutlineSearch } from 'react-icons/ai';

const initialValues = {
  query: '',
};

const schema = Yup.object().shape({
  query: Yup.string()
    .trim()
    .min(1, 'Enter query!')
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Search query may contain only letters, apostrophe, dash and spaces.'
    ),
});

const Searchbar = ({ onSubmitForm }) => {
  const handleSubmit = ({ query }, { resetForm }) => {
    const normalizedQuery = query.trim();

    onSubmitForm(normalizedQuery);

    resetForm();
  };
  return (
    <SearchbarHeader>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ isSubmitting }) => {
          return (
            <SearchForm>
              <SearchFormButton type="submit" disabled={isSubmitting}>
                <AiOutlineSearch size={'2rem'} />
                <SearchFormButtonLabel>Search</SearchFormButtonLabel>
              </SearchFormButton>

              <SearchFormInput
                type="text"
                name="query"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
              />

              <Error name="query" component="span" />
            </SearchForm>
          );
        }}
      </Formik>
    </SearchbarHeader>
  );
};
export default Searchbar;
