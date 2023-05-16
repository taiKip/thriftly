package com.example.api.security;

import com.example.api.user.Role;
import com.example.api.user.Role.*;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;


    /***
     * @desc At startup spring will look for a bean of
     * type SecurityFilterChain which is responsible for configuring all the security of the app
     * @param httpSecurity
     * @return
     */

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf()
                .disable()
                .authorizeHttpRequests()
                .requestMatchers("/api/v1/auth/**","/api/v1/login/**","api/v1/**")
                .permitAll()

                .requestMatchers(HttpMethod.GET,"/api/v1/demo/**").authenticated()
                .requestMatchers(HttpMethod.POST,"/api/v1/demo").hasRole(Role.ADMIN.name())

                .anyRequest()
                .authenticated()
                .and()
//                .oauth2Login()
//                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);





        return httpSecurity.build();
    }

}
