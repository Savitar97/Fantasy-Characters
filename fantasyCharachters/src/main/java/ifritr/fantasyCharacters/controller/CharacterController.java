package ifritr.fantasyCharacters.controller;

import ifritr.fantasyCharacters.model.Creator;
import ifritr.fantasyCharacters.model.FantasyCharacter;
import ifritr.fantasyCharacters.service.CharacterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping(value="/api")
public class CharacterController {
    @Autowired
    private CharacterService characterService;

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    @GetMapping("character-list")
    public Iterable<FantasyCharacter> getAll() {
        return characterService.getAll();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    @GetMapping("characters/{id}")
    public FantasyCharacter getOne(@PathVariable String id) {
        try {
            int _id = Integer.parseInt(id);
            return characterService.getOne(_id);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Id is not a number!");
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    @GetMapping("character-list/{authorName}")
    public Iterable<FantasyCharacter> getAllByCreatorAuthorName(@PathVariable String authorName){
        try {
            return characterService.getAllByAuthorName(authorName);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Id is not a number!");
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    @PostMapping("characters/{authorName}")
    public FantasyCharacter saveCharacter(@RequestBody FantasyCharacter character, @PathVariable String authorName) {
            return characterService.createOne(authorName,character);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    @PutMapping("characters/{id}")
    public FantasyCharacter updateCharacter(@PathVariable int id, @RequestBody FantasyCharacter character) {
        return characterService.updateOne(id,character);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("characters/{id}")
    public void deleteCreator(@PathVariable int id) {
        characterService.deleteOne(id);
    }
}
