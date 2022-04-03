export default class Player {

    resources = {
        cred:{},
        tech:{},
        ideo:{},
    };

    // Seconds since Epoch
    #lastUpdate = 0;

    constructor(gameInstanceId, time) {
        this.gameInstanceId = gameInstanceId;
        this.#lastUpdate = time;
    }

    updateCredit(update) {
        this.resources.cred = update;
    }

    updateIdeo(update) {
        this.resources.ideo = update;
    }

    updateTech(update) {
        this.resources.tech = update;
    }

    /**
     * Given the `curTime`, will compute the new estimated total for resources this player should have.
     * The time passed in will be stored and used for a subsequent call to this function.
     *
     * @param curTime   The time in seconds since Epoch.
     */
    calcResourceTotals(curTime) {
        let delta = curTime - this.#lastUpdate;
        if(delta > 0) {
            Object.values(this.resources).forEach(r => {

                // change represents income per 3 minutes, which is 1000ms * 60 s * 3min
                r.value += r.change * (delta / 60 / 3);
            });
        }

        this.#lastUpdate = curTime;
    }
}