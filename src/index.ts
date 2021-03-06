/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)
    // WA.chat.sendChatMessage('Hello world', 'Mr Robot');
    
    WA.room.onEnterLayer('clockZone').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup","It's " + time,[]);
    })

    WA.room.onLeaveLayer('clockZone').subscribe(closePopUp)


    WA.room.onEnterLayer('WelcomeCSZone').subscribe(() => {
        currentPopup = WA.ui.openPopup("WelcomePopup","Welcome to Computer Science Department",[]);
    })

    WA.room.onLeaveLayer('WelcomeCSZone').subscribe(closePopUp);


    WA.room.onEnterLayer('WelcomePhysicsZone').subscribe(() => {
        currentPopup = WA.ui.openPopup("WelcomePopup","Welcome to Physics Department",[]);
    })

    WA.room.onLeaveLayer('WelcomePhysicsZone').subscribe(closePopUp);

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));
    
}).catch(e => console.error(e));

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}
