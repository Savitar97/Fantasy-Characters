package ifritr.fantasyCharacters;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.modelmapper.ModelMapper;

@SpringBootApplication()
public class FantasyCharactersApplication {

    public static void main(String[] args) {
        SpringApplication.run(FantasyCharactersApplication.class, args);
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }




}
