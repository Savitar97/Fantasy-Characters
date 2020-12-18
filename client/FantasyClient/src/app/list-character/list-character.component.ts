import { Component, OnInit } from '@angular/core';
import {CharacterService} from '../character.service';
import {Observable, Subject} from 'rxjs';
import {Character} from '../character';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Creator} from '../creator';

@Component({
  selector: 'app-list-character',
  templateUrl: './list-character.component.html',
  styleUrls: ['./list-character.component.css']
})
export class ListCharacterComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  characters: Observable<Character[]>;
  character: Character = new Character();
  deleteMessage = false;
  characterTemp: any;
  isUpdated = false;

  get CharacterFirstName(){
    return this.characterUpdateForm.get('first_name');
  }

  get CharacterLastName(){
    return this.characterUpdateForm.get('last_name');
  }

  get CharacterStory(){
    return this.characterUpdateForm.get('story');
  }

  get CharacterId(){
    return this.characterUpdateForm.get('character_id');
  }

  constructor(private characterService: CharacterService) { }

  characterUpdateForm = new FormGroup({
    character_id: new FormControl(),
    first_name: new FormControl('' , [Validators.required , Validators.minLength(3) ] ),
    last_name: new FormControl('' , [Validators.required , Validators.minLength(3) ] ),
    story: new FormControl()
  });

  ngOnInit(): void {
    this.isUpdated = false;
    this.dtOptions = {
      pageLength: 10,
      stateSave: true,
      lengthMenu: [[10, 20, 50, -1], [10, 20, 50, 'All']],
      processing: true
    };
    this.characterService.getCharacterList().subscribe(data => {
      this.characters = data;
      console.log(data);
      this.dtTrigger.next();
    });
  }
  deleteCharacter(id: number) {
    this.characterService.deleteCharacter(id)
      .subscribe(
        data => {
          console.log(data);
          this.deleteMessage = true;
          this.characterService.getCharacterList().subscribe(data => {
            this.characters = data;
          });
        },
        error => console.log(error));
  }

  updateChar(updchar) {
    this.character = new Character();
    this.character.id = this.CharacterId.value;
    this.character.firstName = this.CharacterFirstName.value;
    this.character.lastName = this.CharacterLastName.value;
    this.character.story = this.CharacterStory.value;
    this.characterService.updateCharacter(this.character.id, this.character).subscribe(
      data => {
        this.isUpdated = true;
        this.characterService.getCharacterList().subscribe(data => {
          this.characters = data;
        });
      },
      error => console.log(error));
  }

  updateCharacter(id: number){
    this.characterService.getCharacter(id)
      .subscribe(
        data => {
          this.characterTemp = data;
          this.characterUpdateForm.patchValue({
            character_id:data['id'],
            first_name: data['firstName'],
            last_name: data['lastName'],
            story: data['story']
          });
        },
        error => console.log(error));
  }
  changeIsUpdate(){
    this.isUpdated = false;
  }

  readStory(id: number){
    this.characterService.getCharacter(id)
      .subscribe(
        data => {
          this.characterTemp = data;
        },
        error => console.log(error));
  }
}
