package ifritr.fantasyCharacters.dao;

import ifritr.fantasyCharacters.model.Creator;
import ifritr.fantasyCharacters.model.FantasyCharacter;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CharacterRepository extends PagingAndSortingRepository<FantasyCharacter, Integer> {
    Iterable<FantasyCharacter> findByCreatorAuthorName(String name);
}
