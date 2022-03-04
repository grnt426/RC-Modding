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
    // do whatever
}
else {
    y.a.state.granite = {url:"http://localhost:8080", "hello":"world"};
    y.a.state.granite.postData = function(data, type) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", y.a.state.granite.url);
        xhr.timeout = 2000;
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({"type":type, "data":data}));
    }

    y.a.state.granite.postData("Ping!", "debug");

    y.a.state.granite.updater = setInterval(
        function() {
            if(y.a.state.game.player !== undefined && y.a.state.game.player !== null && y.a.state.game.player.account_id != null) {

                if(y.a.state.game.selectedSystem != null) {
                    y.a.state.granite.postData(y.a.state.game.selectedSystem, "selectsystem");
                }
                else {
                    y.a.state.granite.postData("Nothing to do...", "debug");
                }
            }
            else {
                y.a.state.granite.postData("Ignoring...", "debug");
            }
        },
        5000
    );
}