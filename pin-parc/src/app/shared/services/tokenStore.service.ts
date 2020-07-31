import { Injectable } from '@angular/core';

interface ITokenStoreService {
    getToken(): string;
    setToken(token: string);
    decodeToken(token: string);
    deleteToken();
}

@Injectable({
    providedIn: 'root'
})

export class TokenStoreService implements ITokenStoreService {

    tokenCookieName: string = "eToken";

    public getToken(): string {
        return this.getCookie(this.tokenCookieName);       
    };

    public setToken(token: string) {
        this.setCookie(this.tokenCookieName, token, 1, 5000);        
    };

    public deleteToken() {
        this.setCookie(this.tokenCookieName, "", 1, 5000);
    }

    public decodeToken(token: string) {
        if (!token) {
            return null;
        }

        let parts = token.split('.');

        if (parts.length !== 3) {
            throw new Error('The inspected token doesn\'t appear to be a JWT. Check to make sure it has three parts and see https://jwt.io for more.');
        }

        let decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error('Cannot decode the token.');
        }

        return JSON.parse(decoded);
    }

    public setCookie(cName, value, exDays, exSeconds) {
        exDays = isNaN(exDays) ? 0 : Number(exDays)
        exSeconds = isNaN(exSeconds) ? 0 : Number(exSeconds)
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exDays);
        exdate.setSeconds(exdate.getSeconds() + exSeconds);
        var cValue = escape(value)
        if (exDays || exSeconds) cValue += "; expires=" + exdate.toUTCString()
        document.cookie = cName + "=" + cValue;
    }

    public getCookie(cName) {
        var i, x, y, arRcookies = document.cookie.split(";");
        for (i = 0; i < arRcookies.length; i++) {
            x = arRcookies[i].substr(0, arRcookies[i].indexOf("="));
            y = arRcookies[i].substr(arRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == cName) {
                return unescape(y);
            }
        }
        return undefined
    }

    private urlBase64Decode(str: string): string {
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
            case 0: {
                break;
            }
            case 2: {
                output += '==';
                break;
            }
            case 3: {
                output += '=';
                break;
            }
            default: {
                throw 'Illegal base64url string!';
            }
        }
        return this.b64DecodeUnicode(output);
    }

    private b64DecodeUnicode(str: any) {
        return decodeURIComponent(
            Array.prototype.map
                .call(this.b64decode(str), (c: any) => {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );
    }

    // credits for decoder goes to https://github.com/atk
    private b64decode(str: string): string {
        let chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        let output: string = '';

        str = String(str).replace(/=+$/, '');

        if (str.length % 4 === 1) {
            throw new Error(
                "'atob' failed: The string to be decoded is not correctly encoded."
            );
        }

        for (
            // initialize result and counters
            let bc: number = 0, bs: any, buffer: any, idx: number = 0;
            // get next character
            (buffer = str.charAt(idx++));
            // character found in table? initialize bit storage and add its ascii value;
            ~buffer &&
                (
                    (bs = bc % 4 ? bs * 64 + buffer : buffer),
                    // and if not first of each 4 characters,
                    // convert the first 8 bits to one ascii character
                    bc++ % 4
                )
                ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
                : 0
        ) {
            // try to find character in table (0-63, not found => -1)
            buffer = chars.indexOf(buffer);
        }
        return output;
    }
} 