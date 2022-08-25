
    export class AccountProfile{
        activated: string
        authorities: Array<string>;
        createdBy: string;
        createdDate:  string;
        email:  string;
        firstName:  string;
        id: string
        imageUrl:  string;
        langKey:  string;
        lastModifiedBy:  string;
        lastModifiedDate:  string;
        lastName:  string;

        constructor(){
            this.authorities = new Array<string>();
        }
    }




    export class LoginResponse {
        id_token: string;
        constructor() {}
    }
    
    /*  API specific objects */
    export class LoginRequest {
        public username?: any;
        public password?: any;
        public rememberMe ? : boolean;
    }

    export class PasswordRequest {
    
        public username?: any;
        public emailId?: any;
    
        constructor() {}
    }
        
       
    export class PasswordResult{
        public username?: any;
        public status?: any;
    }