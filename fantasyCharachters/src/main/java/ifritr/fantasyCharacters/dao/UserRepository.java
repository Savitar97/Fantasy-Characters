package ifritr.fantasyCharacters.dao;

import ifritr.fantasyCharacters.model.User;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

public interface UserRepository extends CrudRepository<User, Integer> {

    boolean existsByUsername(String username);

    User findByUsername(String username);

    @Transactional
    void deleteByUsername(String username);

}
