export class MessageDTO {
    messageContent: string;
    from: string;
    to: string;

    constructor(){}
}

export class ReceivedNotification {
    title: string;
    from: string;
    to: string;
    type: string;
    imageUrl: string;
    message: string;
    unreadNotificationCount: number;

    constructor(){}
}
export class Account{
    activated?: any;
    authorities: Array<string>;
    createdBy?: any;
    createdDate?: any;
    email?: any;
    firstName?: any;
    id?: any;
    imageUrl?: any;
    langKey?: any;
    lastModifiedBy?: any;
    lastModifiedDate?: any;
    lastName?: any;
    login?: any;


    constructor(){
        this.authorities = [];
        this.id = "";
    }

}

export class LoginProfile{
    id?: string;
    userId: string;
    userName: string;
    memberId: string;
    phoneNumber: string;
    emailId: string;
    password: string;
    status: string;
    activationCode: string;

    constructor(){}
}

export class LoginProfile_JH{
    public account: Account;
    public userType?: any; /* Parent / Children / Teacher / Counsiler */
    public phoneNumber?: any;      /* admin/user */
    public password?: any;
    constructor(){
        this.account = new Account();
    }
}

export class BioProfile {
    public id?: any;
    public userId?: any;
    public userName: string;
    public memberId: string;
    public firstName?: any;
    public lastName?: any;
    public title?: any;
    public summary?: any;
    public dob?: any;
    public gender?: any;
    public imageUrl?: any;

    constructor() {
    }
}



export class Profile {
    public account: Account;
    public login: LoginProfile;
    public bio: BioProfile;

    constructor() {
        this.account = new Account();
        this.bio = new BioProfile();
        this.login = new LoginProfile();
    }

}
