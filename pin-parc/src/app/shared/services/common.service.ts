import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CommonService {

    public loadAppJs() {       
        this.loadScript('../assets/js/app.js');
    }

    public loadScript(url: string) {
        const body = <HTMLDivElement>document.body;
        const script = document.createElement('script');
        script.innerHTML = '';
        script.src = url;
        script.async = false;
        script.defer = true;
        body.appendChild(script);
    }

} 