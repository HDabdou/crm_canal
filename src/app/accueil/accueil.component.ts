import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HandlerService } from '../service/handler.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  modalRef: BsModalRef;
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  constructor(private modalService: BsModalService,public _activation:HandlerService) { }
  listeAbonner:any=[];
  listeAlert:any = [];
  playNotif:number=0;
  audio:any;
  abonnementChoisie:any;
  requete:number=0;
  indiceGlobale:number;
  getAbonnement(i){
    this.indiceGlobale = i;
    this.abonnementChoisie = this.listeAlert[i];
    this.requete = this.getInfo1(this.abonnementChoisie.requete,"requete");
    this.playNotif = 0;
  }
  abonner(id){
    this._activation.remonter(id).then( res =>{
        console.log(res);
    });
    this.listeAlert[this.indiceGlobale].handled = 1;
  }
  ngOnInit() {
    setInterval(() => {
      this._activation.alert().then( res => {
        this.listeAbonner =JSON.parse(res['_body']);
        //this.getInfo1(this.listeAbonner['requete'],'nom')
        //console.log(JSON.parse(this.listeAbonner['requete']));
        
    
        if(this.listeAbonner['code'] == 1){
          this.listeAlert = this.listeAbonner['message'];
          
          this.playNotif = 1;
          for(let l of this.listeAlert){
            //this.listeAlert.push(JSON.parse(l.requete),l.id,l.activer,l.dateAbonnement);
            let r =JSON.parse(l.requete)
            console.log(r);
          }
          console.log(this.listeAlert);
          
        }
        if(this.playNotif == 1){
          this.audio = new Audio();
          this.audio.src ='./assets/windows-8-sms.mp3';
          this.audio.play();  
        }
        
       //console.log(this.listeAbonner);
    });
      
    }, 10000);
    
   
  }
  getInfo1(requete,nom){
    let req = JSON.parse(requete);
    if(nom == "requete"){
      let r = req.infosClient;
      return r.operation;
    } 
    if(nom == "nom"){
      let r = req.infosClient;
      return r.nomclient;
     // return op.prenom;
    }
    if(nom == "service"){
      return req.service ;
    }
    if(nom == "prenom"){
      let r = req.infosClient;
      return r.prenom;   
    }
    if(nom == "tel"){
      let r = req.infosClient;
      return r.tel;   
        }
    if(nom == "NumAbonner"){
      let r = req.infosClient;
      return r.numAbo;   
    }
    if(nom == "NumDecoudeur"){
      let r = req.infosClient;
      return r.numDec;
    }
    if(nom == "Formule"){
      let r = req.infosClient;
      return r.formule; 
    }
    if(nom == "prix"){
      let r = req.infosClient;
      return r.montant; 
    }
    if(nom == "nombreMois"){
      let r = req.infosClient;
      return r.nbreMois; 
    }
    if(nom == "charme"){
      return req.charme ;
    }
    if(nom == "numCarte"){
      let r = req.infosClient;
      return r.numCarte;
    }
    if(nom == "pvr"){
      let r = req.infosClient;
      return r.pvr ;
    }
    if(nom == "deuxiemeEcran"){
      let r = req.infosClient;
      return r.deuxiemeEcran ;
    }
    if(nom == "titre"){
      let r = req.infosClient;
      return r.titre ;
    }
    if(nom == "cni"){
      let r = req.infosClient;
      return r.cni ;
    }
    if(nom == "ville"){
      let r = req.infosClient;
      return r.ville ;
    }
    if(nom == "adresse"){
      let r = req.infosClient;
      return r.adresse ;
    }
    if(nom == "email"){
      let r = req.infosClient;
      return r.email ;
    }
    
    

    return "null";
  }


}
