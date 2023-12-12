import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigator/RootNavigator';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client';

const LOCAL_SYSTEM_IP_ADDRESS = '192.168.192.119';
const PORT = '5001';

const client = new ApolloClient({
  // uri: ' https://meredith.stepzen.net/api/honorary-octopus/',
  link: createHttpLink({
    uri: `http://${LOCAL_SYSTEM_IP_ADDRESS}:${PORT}/api/honorary-octopus/`,
  }),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    //@ts-ignore - TailwindProvider is missing a type definition
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>

  );
}

