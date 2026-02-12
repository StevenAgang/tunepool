import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PlaylistValidation {
  static linkValidation(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const patterns = [
      /^https:\/\/(?:www.)?youtube\.com\/playlist/i,
      /^https:\/\/music\.youtube\.com\/playlist/i,
      /^https:\/\/open\.spotify\.com\/playlist/i,
      /^https:\/\/(?:www.)?soundcloud/i,
      /^https:\/\/music\.apple\.com(?:\/[a-z]{2})?\/playlist/i,
      /^https:\/\/(?:www.)?deezer\.com(?:\/[a-z]{2})?\/playlist/i,
      /^https:\/\/(?:www.)?tidal\.com\/playlist/i,
      /^https:\/\/music\.amazon\.com\/user-playlist/i,
    ];
    for (let pattern = 0; pattern < patterns.length; pattern++) {
      if (patterns[pattern].test(control.value)) {
        return null;
      }
    }
    return { linkValidation: true };
  }

  static titleShouldnoNotExceed20Character(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    if (control.value.length > 30) return { titleShouldnoNotExceed30Character: true };

    return null;
  }
}
