package ifritr.fantasyCharacters.service;

import ifritr.fantasyCharacters.dao.CreatorRepository;
import ifritr.fantasyCharacters.model.Creator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class CreatorService {
    @Autowired
    private CreatorRepository creatorRepository;

    public Iterable<Creator> getAll() {
        return creatorRepository.findAll();
    }

    public Creator getOne(int id) {
        Optional<Creator> creator = creatorRepository.findById(id);

        if (!creator.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Creator Not Found");
        }

        return creator.get();
    }

    public Creator createOne(Creator creator) {
        try {
            creator = creatorRepository.save(creator);
            return creator;
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, " Unknown server error!");
        }
    }

    public Creator getByAuthorName(String name) {
        Optional<Creator> creator = creatorRepository.findByAuthorName(name);

        if (!creator.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Creator Not Found");
        }
        return creator.get();
    }

    public Creator updateOne(int id, Creator creator) {
        Creator currentCreator = getOne(id);

        currentCreator.setFirstName(creator.getFirstName());
        currentCreator.setLastName(creator.getLastName());
        currentCreator.setAuthorName(creator.getAuthorName());
        currentCreator = creatorRepository.save(currentCreator);
        return currentCreator;
    }

    public void deleteOne(int id) {
        Creator creator = getOne(id);

        creatorRepository.delete(creator);
    }
}
