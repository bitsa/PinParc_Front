export class UserModel {
    id: string;
    UserID: string;
    userName: string;
    email: string;
    //telNo: string;
    //roles: IdValue[];
    role: string;
    public static parseJson(data): UserModel {
        var res = new UserModel();
        res.id = data.id;
        res.userName = data.UserName;
        res.email = data.email;
        res.UserID = data.UserID;
        return res;
    }
}