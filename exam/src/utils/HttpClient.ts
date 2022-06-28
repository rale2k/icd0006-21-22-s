import IdentityService from '../services/IdentityService';
import axios from "axios";

export const HTTPClient = axios.create({
    baseURL: "https://localhost:7279/api",
    headers: {
        "Content-type": "application/json"
    }
});

HTTPClient.interceptors.request.use(function (config: any) {
    let idStore = IdentityService.getStoredIdentity();

    if (idStore != null) {
        config.headers!.Authorization = "Bearer " + idStore.jwt;
    }
    return config;
  }
);

let beingRefreshed = false;

HTTPClient.interceptors.response.use((response: any) => {
    return response
  }, async function (error: any) {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry && !beingRefreshed) {
        beingRefreshed = true;
        originalRequest._retry = true;
        // kinda bad but idk
        await IdentityService.refresh();  

        beingRefreshed = false;
        return HTTPClient(originalRequest);
    }
    
    // Ghetto solution to the problem, where multiple requests sent in parallel
    // while token is outdated all perform a token refresh.
    // "beingrefreshed" works as a mutex type thing so only the first request
    // performs the token refresh (above) and the rest wait
    if (beingRefreshed && !originalRequest._retry && error.response.status != 400) {
        let waited = 0; 
        while (waited < 5000 && beingRefreshed) {
            console.log(`gotta wait ${waited} ${beingRefreshed}`)
            await new Promise(f => setTimeout(f, 500));
            waited = waited + 500;
        }
        console.log("done waiting, sending original request again")
        originalRequest._retry = true;
        return HTTPClient(originalRequest);
    }

    return Promise.reject(error);
  });

export default HTTPClient;
