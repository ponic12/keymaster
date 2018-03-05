import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class ApplicationService {
    private loader;
    imgPath:any= "../../assets/logo.png";
    
    constructor(
        public loadingCtrl: LoadingController,
        private toastCtrl: ToastController) {
    }

    newAlert(data:any):void{
        alert('Muestra alerta Toolbar');
    }

    /**
     * Function displays a message on the screen
     * 
     * @param  {string} type type of the message (succes / info / warning / error)
     * @param  {string} message text to display
     * @returns void
     */
    message(type: string, message: string, css?: string): void {
        var cl = '';
        if (css) cl = css;
        let toast = this.toastCtrl.create({
            message,
            cssClass:cl,
            duration: 2000,
            position: 'bottom'
        });
        toast.present();
    }

    showLoading(): Promise<any> {
        this.loader = this.loadingCtrl.create({
            //content: "cargando...",
            content: `
                <img class="logo3D" style="background-color:pink" width=108 height=100 src="assets/spinner.svg">
            `,
            cssClass: 'my-loading-class',
            spinner: 'hide',
        });
        return this.loader.present();
    }

    hideLoading() : Promise<any> {
        return this.loader.dismiss();
    }

}