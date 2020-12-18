import { Component, OnInit } from '@angular/core';
import {CreatorService} from '../creator.service';
import {Creator} from '../creator';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-creator',
  templateUrl: './add-creator.component.html',
  styleUrls: ['./add-creator.component.css']
})
export class AddCreatorComponent implements OnInit {

  constructor(private creatorService: CreatorService) { }

  creator = new Creator();

  submitted = false;

  creatorSaveForm = new FormGroup({
    first_name: new FormControl('' , [Validators.required , Validators.minLength(3) ] ),
    last_name: new FormControl('' , [Validators.required , Validators.minLength(3) ] ),
    author_name: new FormControl('' , [Validators.required , Validators.minLength(3) ] )
  });

  saveCreator(saveCreator){
    this.creator = new Creator();
    this.creator.firstName = this.CreatorFirstName.value;
    this.creator.lastName = this.CreatorLastName.value;
    this.creator.authorName = this.CreatorAuthorName.value;
    this.submitted = true;
    this.save();
  }

  save() {
    this.creatorService.createCreator(this.creator)
      .subscribe(data => console.log(data), error => console.log(error));
    this.creator = new Creator();
  }

  get CreatorFirstName(){
    return this.creatorSaveForm.get('first_name');
  }

  get CreatorLastName(){
    return this.creatorSaveForm.get('last_name');
  }

  get CreatorAuthorName(){
    return this.creatorSaveForm.get('author_name');
  }

  addCreatorForm(){
    this.submitted = false;
    this.creatorSaveForm.reset();
  }

  ngOnInit(): void {
    this.submitted = false;
  }
}
