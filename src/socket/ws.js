export class WebsocketHandler {
    constructor(url, game) {
        this.game = game;
        this.socket = new WebSocket(url);
        this.socket.onopen = this.onConnect.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
    }
    onConnect(data) {
        console.info("Websocket connected")
    }
    onMessage(message) {
        const data = JSON.parse(message.data);
        const gameState = JSON.parse(data.gameState);
        //nemamo time
        const time = JSON.parse(data.time); 
        const playerAttack = JSON.parse(data.playerAttack);
        //nemamo time
        this.game.update(gameState, time, playerAttack);
        // if (data.winner !== null) {
        //     this.game.showWinner(data.winner);
        // }
    }
}
