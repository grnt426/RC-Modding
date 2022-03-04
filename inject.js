/**
 * This code can be injected anywhere, however I have it injected when the game is loaded:
 *      key: "init",
 *      value: (a = r()(c.a.mark((function t() {
 *
 * This code creates space within the state global for our own use. This data is loaded as soon as any game is loaded,
 * and is kept when leaving a game. All data is lost on application close.
 *
 * This means players can leave and enter a game multiple times without re-initializing each time.
 *
 * Some care will be needed in the future if any state is kept from a game if a player switches games.
 */

if(y.a.state.granite) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", y.a.state.granite.url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send("Data found! Not initializing again");
}
else {
    y.a.state.granite = {url:"http://localhost:8080", "hello":"world"};

    let xhr = new XMLHttpRequest();
    xhr.open("POST", y.a.state.granite.url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send("Data not found! Adding some...");


    y.a.state.granite.updater = setInterval(
        function() {
            if(y.a.state.game.player !== undefined && y.a.state.game.player !== null && y.a.state.game.player.account_id != null) {
                let xhr = new XMLHttpRequest();
                xhr.open("POST", y.a.state.granite.url);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send("Player data loaded: " + JSON.stringify(y.a.state.game.player));
            }
            else {
                let xhr = new XMLHttpRequest();
                xhr.open("POST", y.a.state.granite.url);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send("Game not running, ignoring...");
            }
        },
        5000
    );
}