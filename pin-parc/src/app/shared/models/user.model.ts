export class UserModel {
    id: number;
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
        return res;
    }
}