package com.example.api.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info =@Info(
                contact = @Contact(
                        name = "Tarus",
                        email = "victortarus6@gmail.com"
                ),
                description = "OpenApi documentation for an ecommerce website",
                title = "1.0"
        ),
        servers = {
                @Server(
                        description = "local Env",
                        url = "http://localhost:8080"
                ),
                @Server(
                        description = "Prod Env",
                        url = "http://localhost:8080"
                )
        }

)
@SecurityScheme(
        name = "bearerAuth",
        description = "JWT auth description",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        in= SecuritySchemeIn.HEADER
)
public class OpenApiConfig {
}
