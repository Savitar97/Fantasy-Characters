package ifritr.fantasyCharacters.controller;

import ifritr.fantasyCharacters.model.Creator;
import ifritr.fantasyCharacters.service.CreatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping(value = "/api")
public class CreatorController {
    @Autowired
    private CreatorService creatorService;

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    @GetMapping("creators-list")
    public Iterable<Creator> getAll() {
        return creatorService.getAll();
    }


    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    @GetMapping("creators/{id}")
    public Creator getCreator(@PathVariable String id) {
        try {
            int _id = Integer.parseInt(id);
            return creatorService.getOne(_id);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Id is not a number!");
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    @PostMapping("creators")
    public Creator saveCreator(@RequestBody Creator creator) {
        return creatorService.createOne(creator);

    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    @PutMapping("creators/{id}")
    public Creator updateCreator(@PathVariable int id, @RequestBody Creator creator) {
        return creatorService.updateOne(id, creator);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("creators/{id}")
    public void deleteCreator(@PathVariable int id) {
        creatorService.deleteOne(id);
    }
}
