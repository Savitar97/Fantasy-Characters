import {Component, OnInit} from '@angular/core';
import {CreatorService} from '../creator.service';
import {CharacterService} from '../character.service';
import {Creator} from '../creator';
import {Character} from '../character';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.css']
})
export class AddCharacterComponent implements OnInit {

  character = new Character();

  submitted = false;

  creators: Observable<Creator[]>;

  constructor(private creatorService: CreatorService, private characterService: CharacterService) {
  }

  characterSaveForm = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    last_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    author_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    story: new FormControl()
  });

  saveCharacter(saveCharacter) {
    this.character = new Character();
    this.character.firstName = this.CharacterFirstName.value;
    this.character.lastName = this.CharacterLastName.value;
    this.character.story = this.CharacterStory.value;
    this.submitted = true;
    this.save();
  }

  save() {
    console.log(this.CreatorAuthorName.value);
    this.characterService.createCharacter(this.CreatorAuthorName.value, this.character)
      .subscribe(data => console.log(data), error => console.log(error));
    this.character = new Character();
  }


  ngOnInit(): void {
    this.submitted = false;
    this.creatorService.getCreatorList().subscribe(data => {
      this.creators = data;
    });
  }

  addCharacterSaveForm() {
    this.submitted = false;
    this.characterSaveForm.reset();
  }

  get CharacterFirstName() {
    return this.characterSaveForm.get('first_name');
  }

  get CharacterLastName() {
    return this.characterSaveForm.get('last_name');
  }

  get CharacterStory() {
    return this.characterSaveForm.get('story');
  }

  get CreatorAuthorName() {
    return this.characterSaveForm.get('author_name');
  }
}
