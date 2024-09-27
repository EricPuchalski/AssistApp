package ar.assist.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173") // Cambia esto a la URL de tu frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Permite los métodos necesarios
                .allowedHeaders("*") // Permite todos los encabezados
                .allowCredentials(true); // Permite las credenciales (cookies, autenticación)
    }
}
