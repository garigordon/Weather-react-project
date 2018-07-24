import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { API_TOKEN } from '../../settings'
import { URL }  from '../../settings'

const networkInterface = createNetworkInterface({uri: URL});

networkInterface.use([{
    applyMiddleware(request, next) {
        const currentApiToken = localStorage.getItem(API_TOKEN);
        if (!currentApiToken) {
            next();
            return;
        }
        if (!request.options.headers) {
            request.options.headers = new Headers();
        }
        delete request.options.headers.map;
        request.options.headers.Authorization = `Bearer ${currentApiToken}`;
        next();
    }
}]);

const client = new ApolloClient({
    networkInterface,
    // other stuff...
});