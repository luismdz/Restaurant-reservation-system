import { AbstractControl } from '@angular/forms';

export function ConfirmPasswordValidator(control: AbstractControl) {

    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;

    if (password !== confirmPassword) {
        control.get('confirmPassword').setErrors({
            MatchPassword: true
        });
    } else {
        return null;
    }
}