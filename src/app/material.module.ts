import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatCardModule,
        MatSnackBarModule
    ],
    exports: [
        MatButtonModule,
        MatCardModule,
        MatSnackBarModule
    ]
})
export class MaterialModule {}