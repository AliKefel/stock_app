import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://siguidoulou.us-east-a.ibm.stepzen.net/api/winning-penguin/__graphql',
    cache: new InMemoryCache(),
    headers: {
        Authorization: 'Apikey siguidoulou::local.net+1000::6d2d2acb3fed193cde6db60c03240f77f69241e3ced808f80d94b16b5cf5e5ca'
    }
  });


export default client;