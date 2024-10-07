import { FormControl } from "@angular/forms"

// Interface for registration form
export interface RegisterFormInterface {

    vorname: FormControl<string>; 

    nachname: FormControl<string>; 

    email: FormControl<string>; 

    password:FormControl<string>;

    pwcheck:FormControl<string>;
}

