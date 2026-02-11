import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { TagsInterface } from '../../Interface/Playlist/PlaylistInterface';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PlaylistValidation } from '../../Shared/Validation/Playlist/PlaylistValidation';
import { PlaylistService } from '../../Service/Playlist/PlaylistService';
import { ToastrService } from 'ngx-toastr';
import { ApiResponseInterface } from '../../Interface/ApiResponse/ApiResponseInterface';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './Modal.html',
  styleUrl: './Modal.css',
})
export class Modal {
  maxTags: number = 0;
  isLoading = signal(false);

  form = new FormGroup({
    playList_Urls: new FormControl('', [Validators.required, PlaylistValidation.linkValidation]),
    title: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    tags: new FormArray([], [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.maxLength(30)]),
  });

  @Input('visible') visible: boolean = true;
  @Input('tags') tags!: TagsInterface[];
  @Output('close') close = new EventEmitter<void>();
  @Output('playlist') playlist = new EventEmitter<void>();

  constructor(
    private client: PlaylistService,
    private toast: ToastrService,
  ) {}

  toggleTag(id: number) {
    const arr = this.form.get('tags') as FormArray;
    const index = arr.value.indexOf(id);

    if (index <= -1) {
      arr.push(new FormControl(id));
      this.maxTags += 1;
    } else {
      arr.removeAt(index);
      this.maxTags -= 1;
    }
  }

  getPlaylistLink() {
    return this.form.get('playList_Urls');
  }

  getTitle() {
    return this.form.get('title');
  }

  getDescription() {
    return this.form.get('description');
  }

  getSelectedTags() {
    const arr = this.form.get('tags') as FormArray;
    return arr.value;
  }

  submitPlaylist() {
    this.isLoading.set(true);
    if (this.form.valid) {
      this.client.addPlaylist(this.form.value).subscribe({
        next: (response: ApiResponseInterface<object>) => {
          this.toast.success(response.message);
          this.closed();
          this.updatePlaylist();
          this.form.reset();
          const tags = this.form.get('tags') as FormArray;
          tags.clear();
          this.maxTags = 0;
          this.isLoading.set(false);
        },
        error: (err) => {
          this.toast.error(err.originalError.error.message);
          this.isLoading.set(false);
        },
      });
    } else {
      this.isLoading.set(false);
    }
  }

  updatePlaylist() {
    this.playlist.emit();
  }

  closed() {
    this.close.emit();
  }
  ngOnInit() {
    console.log(this.tags);
  }
}
