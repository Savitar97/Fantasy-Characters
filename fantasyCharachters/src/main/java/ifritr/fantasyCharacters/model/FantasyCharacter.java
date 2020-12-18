package ifritr.fantasyCharacters.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="fantasy_character")
public class FantasyCharacter {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "character_id")
    Integer id;

    @Column(name = "first_name",nullable = false)
    String firstName;

    @Column(name = "last_name",nullable = false)
    String lastName;

    @Column(name = "published_date")
    private ZonedDateTime publishedDate;


    @PrePersist
    protected void onPersist() {
        publishedDate = ZonedDateTime.now();
    }

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "creator_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Creator creator;

    @Lob
    String story;
}
