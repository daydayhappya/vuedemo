//当前登录的用户信息统一管理
import net from './net';
class User {
    userInfo;
    //获取用户信息
    //isFromCatch
    //return promise
    getUser( isFromCatch ) {
        if(isFromCatch){
            return this.resetUser();
        }else{

            
        }
       
    }
    //清除用户信息
    //retrun  true/false
    cleanUser(){
    
    }
    //重置用户信息
    //return promise
    resetUser(){
        this.cleanUser();
        this.getUser();
   
    }
}
export default new User();