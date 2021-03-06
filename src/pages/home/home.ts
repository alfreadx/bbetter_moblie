import { IMember } from './../../model/member';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { JwtHelper, AuthHttp} from "angular2-jwt";
import { SERVER_URL } from "../../config";
import { AuthProvider } from "../../providers/auth/auth";
import {Storage} from "@ionic/storage";
import {Headers} from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //Interpolation (類似實體變數)
  //接收數據物件
  listData: Object;
  user: string;
  message: string;
  
  
  //依賴注入
  constructor(private readonly authProvider: AuthProvider,
    private readonly jwtHelper: JwtHelper,
    private readonly authHttp: AuthHttp,
    private readonly storage: Storage, 
    private http: Http) {

    this.authProvider.authUser.subscribe(jwt => {
      if (jwt) {
        const decoded = jwtHelper.decodeToken(jwt)
        this.user = decoded.sub;
      }
      else {
        this.user = null;
      }
    });

  }

  //畫面載入初始化時
  ionViewDidLoad() {
    //取得該會員資訊，並存在本機端
    this.authHttp.get(`${SERVER_URL}/api/member/self`)
    .subscribe((res: Response) => {
      this.storage.set('memberInfo', res.json())
      console.log("homePage:" + res.json());
    });
  }

  logout() {
    this.authProvider.logout();
  }

  test() {
    // let myHeader = new Headers();
    // myHeader.append('Content-Type', 'application/json');
    // this.authHttp.get(`${SERVER_URL}/api/member/1/friends`)
    //   .subscribe((res: Response) => {
    //     // this.listData = res.json();
    //     console.log(res.json());
    //   });
    let memberInfo = this.storage.get('memberInfo');
    console.log(memberInfo);
  }

  test2() {
    // let myHeader = new Headers();
    // myHeader.append('Content-Type', 'application/json');
  
    // this.authHttp.get(`${SERVER_URL}/api/members`)
    //   .subscribe((res: Response) => {
    //     // this.listData = res.json();
    //     console.log(res.json());
    //   });

    this.authHttp.get(`${SERVER_URL}/api/members`).subscribe(
      data => this.message = data.text(),
      err => console.log(err)
    );
    console.log(this.message);

    // let myHeader = new Headers();
    // myHeader.append('Content-Type', 'application/json');
    // myHeader.append('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI0ZDJhNzVlMi1mOTA1LTRkOTUtYWIzZi04YjkxMTAwZjRiMzQiLCJzdWIiOiJhczEzMDIzMkBnbWFpbC5jb20iLCJpYXQiOjE1MDY2MDgyMTksImV4cCI6MTUwOTIwMDIxOX0.GmXz51pMGmHqE7--8QJMfKFXwlbxoAs0uN6bCnKBdZv8CwlT79yAu740bhG7zeiZVleIm3wnu6-dpFkETCdvzg');
    // let options = new RequestOptions({ headers: headers });
    // this.authHttp.get(`${SERVER_URL}/api/members`, { headers: myHeader })
    //   .subscribe(
    //     data => this.message = data.text(),
    //     err => console.log(err),
    //     () => console.log('Request Complete')
    //   );
  
    // Pass it after the body in a POST request
    // this.authHttp.post('http://example.com/api/thing', 'post body', { headers: myHeader })
    //   .subscribe(
    //     data => this.message = data.text(),
    //     err => console.log(err),
    //     () => console.log('Request Complete')
    //   );

    // this.authHttp.get(`${SERVER_URL}/secret`).subscribe(
    //   data => this.message = data.text(),
    //   err => console.log(err)
    // );
  }
}
