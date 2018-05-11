import { Injectable } from '@angular/core';
import { Http, Request, RequestOptions, Headers } from "@angular/http";
import { Config } from '~/shared/config';
import * as  base64 from "base-64";
import * as utf8 from "utf8";
import { isIOS, isAndroid } from 'tns-core-modules/ui/page/page';


@Injectable()
export class HttpHelperService {
  private mobilePlatform: string = "Mobile";
  
  constructor() {
    if(isAndroid){
      this.mobilePlatform = "Android";
    }
    else if(isIOS){
      this.mobilePlatform = "iOS";
    }
    else{
      this.mobilePlatform = "Mobile";
    }
   }

  getCommonHeaders():RequestOptions {
    const options = new RequestOptions();        
        options.headers = new Headers();
        options.headers.append("Content-Type", "application/json");
        options.headers.append("Pragma", "no-cache");   
        options.headers.append('Source', this.mobilePlatform);     
        options.headers.append("ApplicationCode", Config.applicationCode);

        return options
  }

  getLoginHeaders(username:string, password:string):RequestOptions {
    
    const options = new RequestOptions();        
    options.headers = new Headers();
    options.headers.append("Content-Type", "application/json");
    options.headers.append("Pragma", "no-cache");
    options.headers.append('Source', this.mobilePlatform);
    options.headers.append("Authorization", this.makeAuthHeader(username, password));
    options.headers.append("ApplicationCode", Config.applicationCode);

    return options
  }

  getCommonAuthHeaders():RequestOptions {
    const options = new RequestOptions();    
    options.headers = new Headers();                            
    options.headers.append("Content-Type", "application/json");
    options.headers.append('Source', this.mobilePlatform);
    options.headers.append("Authorization", "Bearer " + Config.token);
    options.headers.append("ApplicationCode", Config.applicationCode);

    return options;
  }

  private makeAuthHeader(userId:string, password:string):string {
    const str = (userId || "") + ":" + (password || "");
    const bytes = utf8.encode(str);
    const encodedStr = base64.encode(bytes);

    return "Basic " + encodedStr;
}
}