package ifritr.fantasyCharacters.service;

import ifritr.fantasyCharacters.dao.CharacterRepository;
import ifritr.fantasyCharacters.dao.CreatorRepository;
import ifritr.fantasyCharacters.model.Creator;
import ifritr.fantasyCharacters.model.FantasyCharacter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class CharacterService {
    @Autowired
    private CharacterRepository characterRepository;

    @Autowired
    private CreatorRepository creatorRepository;

    public Iterable<FantasyCharacter> getAll() {
        return characterRepository.findAll();
    }


    public Iterable<FantasyCharacter> getAllByAuthorName(String name) {
        return characterRepository.findByCreatorAuthorName(name);
    }

    public FantasyCharacter getOne(int id) {
        Optional<FantasyCharacter> character = characterRepository.findById(id);

        if (!character.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Character Not Found");
        }

        return character.get();
    }

    public FantasyCharacter createOne(String name, FantasyCharacter fantasyCharacter) {
        return creatorRepository.findByAuthorName(name).map(creator -> {
            fantasyCharacter.setCreator(creator);
            return characterRepository.save(fantasyCharacter);
        }).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.INTERNAL_SERVER_ERROR, " Unknown server error!"));
    }

    public FantasyCharacter updateOne(int id, FantasyCharacter character) {
        FantasyCharacter currentCharacter = getOne(id);

        currentCharacter.setFirstName(character.getFirstName());
        currentCharacter.setLastName(character.getLastName());
        currentCharacter.setStory(character.getStory());
        currentCharacter = characterRepository.save(currentCharacter);
        return currentCharacter;
    }

    public void deleteOne(int id) {
        FantasyCharacter character = getOne(id);
        characterRepository.delete(character);
    }
}
