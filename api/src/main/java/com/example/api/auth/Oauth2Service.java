package com.example.api.auth;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.json.JSONObject;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.jar.JarException;

@Service
public class Oauth2Service {
    @Value("${spring.security.oauth2.google.userInfoEndPoint}")
    private String googleUserInfoEndpoint;

    public JSONObject fetchUserData(String accessToken) throws IOException, InterruptedException {
HttpClient httpClient =HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(googleUserInfoEndpoint))
                .header("Authorization", "Bearer " + accessToken)
                .build();
        HttpResponse<String> response = httpClient.send(request,
                HttpResponse.BodyHandlers.ofString());
        int responseCode = response.statusCode();
        if(responseCode==200){
            String responseBody = response.body();
            JSONObject result =null;

            try {
                result = new JSONObject(responseBody);
            } catch (JSONException err) {
                System.out.println("Error" + err.toString());
            }
            return result;
        }

        return null;
    }
}