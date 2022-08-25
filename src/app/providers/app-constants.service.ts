import { Injectable } from '@angular/core';

export const APP_CONTEXT:string = ''
export const BASE_AWS_S3_API_URL = 'https://gurusamaya.s3.us-east-2.amazonaws.com';
      


export class SnackTypes {
    public SUCCESS: string;
    public ERROR: string;
    public INFO: string;
    public WARNING: string;

    constructor() {
      this.ERROR = 'error';
      this.SUCCESS = 'success';
      this.INFO = 'info';
      this.WARNING = 'warning';
    }
  }



@Injectable({ providedIn: 'root' })
export class AppConstants {
    public JWT_TOKEN: string;
    public CONFIG_URL:string;
    public TEST_CONNECTION : string;
    public BASE_API_URL: string;
    public BASE_AWS_API_URL: string;
    public BASE_AWS_S3_API_URL: string;
    public SIGN_IN_URL: string;
    public SIGN_IN_PRE_URL: string;
    public ACCOUNT_URL: string;
    public TOKEN_REFRESH_URL: string;

    public SIGNUP_URL: string;
    public SUBMIT_ACTIVATION_CODE_URL: string;
    public GET_ACTIVATION_CODE_URL: string;
    public GET_PASSWORD_URL: string;

    public CHECK_USER_NAME_URL: string;

    public GET_LOGIN_PROFILE_URL: string;
    public SAVE_LOGIN_PROFILE_URL: string;

    public GET_BIO_PROFILE_URL: string;
    public SAVE_BIO_PROFILE_URL: string;

    public MESSAGES_GET: string;
    public MESSAGE_REMOVE: string;

    public YOUTUBE_API_KEY:string;
    public YOUTUBE_CHANNEL_ID: string;
    public YOUTUBE_MAX_RESULTS: string;
    public YOUTUBE_API_URL: string;
    public SEND_MESSAGE_TO_USER_URL:string;
    public SEND_BROADCAST_MESSAGE_URL:string;

    public snackbarType: SnackTypes;

    constructor() {
        this.CONFIG_URL = 'assets/config/web.config.json';
        this.JWT_TOKEN = '';
        this.BASE_API_URL = 'http://localhost:8080';
        this.BASE_AWS_API_URL = 'http://97.74.93.142:8080';

        // this.SIGN_IN_URL = APP_CONTEXT ? '/' : '' + APP_CONTEXT + '/api/authenticate';
        this.SIGN_IN_PRE_URL = APP_CONTEXT ? '/' : '' + APP_CONTEXT + '/api/six-login';
        this.SIGN_IN_URL = APP_CONTEXT ? '/' : '' + APP_CONTEXT + '/api/authenticate';
        this.ACCOUNT_URL = APP_CONTEXT ? '/' : '' + APP_CONTEXT + '/api/account';
        this.SIGNUP_URL = APP_CONTEXT ? '/' : '' + APP_CONTEXT + '/api/six-register';
        // this.SIGNUP_URL = APP_CONTEXT ? '/' : '' + APP_CONTEXT + '/user-security/ns/register-user';
        // this.SUBMIT_ACTIVATION_CODE_URL = APP_CONTEXT ? '/' : '' + APP_CONTEXT + '/api-ext/ActivateUser';
        this.SUBMIT_ACTIVATION_CODE_URL = APP_CONTEXT ? '/' : '' + APP_CONTEXT + '/api/six-activate';
        this.GET_ACTIVATION_CODE_URL = APP_CONTEXT ? '/' : '' + APP_CONTEXT + '/api/six-send-activation-code';
        this.GET_PASSWORD_URL = APP_CONTEXT ? '/' : '' + APP_CONTEXT + '/getPassword';
        this.TOKEN_REFRESH_URL = APP_CONTEXT ? '/' : '' + APP_CONTEXT +  '/api/account/refreshToken';

        this.CHECK_USER_NAME_URL = APP_CONTEXT ? '/' : '' + APP_CONTEXT +  '/api/six-check-user-name';

        this.GET_LOGIN_PROFILE_URL = APP_CONTEXT ? '/' : '' + APP_CONTEXT +  '/api/login-profile-by-name';
        this.SAVE_LOGIN_PROFILE_URL = APP_CONTEXT ? '/' : '' + APP_CONTEXT +  '/api/login-profiles';
        
        this.GET_BIO_PROFILE_URL = APP_CONTEXT ? '/' : '' + APP_CONTEXT +  '/api/bio-profile-by-name';
        this.SAVE_BIO_PROFILE_URL = APP_CONTEXT ? '/' : '' + APP_CONTEXT +  '/api/bio-profiles';


        this.BASE_AWS_S3_API_URL = 'https://gurusamaya.s3.us-east-2.amazonaws.com/';

        this.MESSAGES_GET = APP_CONTEXT ? '/' : '' + APP_CONTEXT + '/api/getMessagesByUserName';
        this.MESSAGE_REMOVE = APP_CONTEXT ? '/' : '' + APP_CONTEXT + '/api/removeMessage';

        this.SEND_MESSAGE_TO_USER_URL = APP_CONTEXT ? '/' : '' + APP_CONTEXT +  '/api/send-private-message/';
        this.SEND_BROADCAST_MESSAGE_URL = APP_CONTEXT ? '/' : '' + APP_CONTEXT +  '/api/send-broad-message';

        this.snackbarType = new SnackTypes();
    }
}