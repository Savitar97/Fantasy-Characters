import {Component, OnInit} from '@angular/core';
import {CreatorService} from '../creator.service';
import {Observable, Subject} from 'rxjs';
import {Creator} from '../creator';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-list-creator',
  templateUrl: './list-creator.component.html',
  styleUrls: ['./list-creator.component.css']
})
export class ListCreatorComponent implements OnInit {

  constructor(private creatorService: CreatorService) {
  }

  get CreatorFirstName() {
    return this.creatorUpdateForm.get('first_name');
  }

  get CreatorLastName() {
    return this.creatorUpdateForm.get('last_name');
  }

  get CreatorAuthorName() {
    return this.creatorUpdateForm.get('author_name');
  }

  get CreatorId() {
    return this.creatorUpdateForm.get('creator_id');
  }

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  creators: Observable<Creator[]>;
  creator: Creator = new Creator();
  deleteMessage = false;
  creatorTemp: any;
  isUpdated = false;

  creatorUpdateForm = new FormGroup({
    creator_id: new FormControl(),
    first_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    last_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    author_name: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  ngOnInit(): void {
    this.isUpdated = false;
    this.dtOptions = {
      pageLength: 10,
      stateSave: true,
      lengthMenu: [[10, 20, 50, -1], [10, 20, 50, 'All']],
      processing: true
    };
    this.creatorService.getCreatorList().subscribe(data => {
      this.creators = data;
      this.dtTrigger.next();
    });
  }

  deleteCreator(id: number) {
    this.creatorService.deleteCreator(id)
      .subscribe(
        data => {
          console.log(data);
          this.deleteMessage = true;
          this.creatorService.getCreatorList().subscribe(data => {
            this.creators = data;
          });
        },
        error => console.log(error));
  }

  updateCreator(id: number) {
    this.creatorService.getCreator(id)
      .subscribe(
        data => {
          this.creatorTemp = data;
          this.creatorUpdateForm.patchValue({
            creator_id: data['id'],
            first_name: data['firstName'],
            last_name: data['lastName'],
            author_name: data['authorName']
          });
        },
        error => console.log(error));
  }

  updateCrea(updcrea) {
    this.creator = new Creator();
    this.creator.id = this.CreatorId.value;
    this.creator.firstName = this.CreatorFirstName.value;
    this.creator.lastName = this.CreatorLastName.value;
    this.creator.authorName = this.CreatorAuthorName.value;

    this.creatorService.updateCreator(this.creator.id, this.creator).subscribe(
      data => {
        this.isUpdated = true;
        this.creatorService.getCreatorList().subscribe(data => {
          this.creators = data;
        });
      },
      error => console.log(error));
  }

  changeIsUpdate() {
    this.isUpdated = false;
  }
}
