import { Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class AppConstants {
    public JWT_TOKEN: string;
    public CONFIG_URL:string;
    public BASE_API_URL: string;

    constructor() {
        this.CONFIG_URL = 'assets/config/web.config.json';
        this.JWT_TOKEN = '';
        this.BASE_API_URL = 'http://localhost:8080';
    }
}