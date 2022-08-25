

export class LoginProfileUpdateRequest {

    public activationCode?: any;
    public password?: any;
    public id?: any;
    public emailId?: any;
    public memberId?: any;
    public phoneNumber?: any;
    public status?: any;
    public userId?: any;
    public userName?: any;

    constructor() {
    }
}

export class RegisterRequest {
    public email?: string;
    public langKey?: string;
    public login?: string;
    public password?: string;
}

export class SignUpRequest {

    public parentname ?: any;
    public langKey?: string;

    public username?: any;
    public password?: any;
    public phoneNumber?: any;
    public emailId?: any;
    public activated?: any;
    public activationCode?: any;
    public type?: any;
    constructor() {
        this.parentname = '';
    }
}

export class SignUpJHRequest {

    public email: string;
    public langKey?: string;
    public login?: string;
    public password?: any;
    constructor() {
    }
}

export class SignUpResult{
       public activationCode: string;
       public emailId: string;
       public active: string;
       public id: string;
       public password: string;
       public phoneNumber: string;
       public status: string;
       public username: string;
       public userId : string;

       constructor(){
       }
    }






export class GetBioProfileRequest{
    public username?: any;
    public profileId?: any;
}


export class GetLoginProfileRequest{
    public username?: any;
    public profileId?: any;
}


export class BioProfileAddRequest {
    public id?: any;
    public userId?: any;
    public firstName?: any;
    public lastName?: any;
    public dob?: any;
    public imageUrl?: any;
    public gender?: any;
    constructor() {}
  
}


export class BioProfileAddResult{
    public profileId?: any;
    public firstname?: any;
    public lastname?: any;
    public dob?: any;
    public imgUrl?: any;
    public gender?: any;
}



export class ActivationCodeSubmitRequest{
    public username?: any;
    public activationCode?: any;
    public userId? : any;
}

export class ActivationCodeSubmitResult{
    public username?: any;
    public password?: any;
    public phoneNumber?: any;
    public emailId?: any;
    public activated?: any;
    public activationCode?: any;
}

export class ActivationCodeRequest{
    public username?: any;
    public password?: any;
    public phoneNumber?: any;
    public emailId?: any;
    public activated?: any;
    public activationCode?: any;
    public type?: any;
}

export class ActivationCodeRequestResult{
    public username?: any;
    public password?: any;
    public phoneNumber?: any;
    public emailId?: any;
    public activated?: any;
    public activationCode?: any;
    public type?: any;
}

export class CheckUserNameRequest{
    public login?: any;
    public password?: any;
}

export class CheckUserNameResult{
    public errorCode?: any;
    public errorMesg?: any;

}


