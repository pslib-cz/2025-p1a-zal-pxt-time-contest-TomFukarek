/*  TimeContest  */

enum GameState {
    Passive,   // čekání – hráč může zobrazit skóre nebo spustit hru
    Started,   // přehrávání intervalu – zobrazeny přesýpací hodiny
    Running    // hráč odhaduje – zobrazuje se otazník, měří se čas
}
enum WinState {
    Deciding,
    Win,
    Lose
}
let winStatus: WinState = WinState.Deciding
let state: GameState = GameState.Passive
let targetInterval: number = 0   // sekundy (5–15)
let startTime: number = 0        // ms – základ pro měření
let score: number = 0
input.onButtonPressed(Button.AB, function () {
    if (state === GameState.Passive) {
        targetInterval = randint(5, 15)
        state = GameState.Started
        control.inBackground(function () {
            music.ringTone(Note.C)
            basic.pause(500)
            music.stopAllSounds()
        })
        basic.pause(targetInterval * 1000)
        music.ringTone(Note.D)
        basic.pause(500)
        music.stopAllSounds()
        state = GameState.Running
    } else { }
})

input.onButtonPressed(Button.A, function () {
    if (state === GameState.Running) {
    score = control.millis() - startTime
if ((targetInterval - (0, 25 + 0, 1 * targetInterval)) <= score) {
    if (score <= targetInterval) {
        winStatus = WinState.Win
    } else { winStatus = WinState.Lose }
} else { winStatus = WinState.Lose }
    } else {}
})

basic.forever(function () {
    if (state === GameState.Running) {
        startTime = control.millis()
    }
    if (state === GameState.Started) {
        basic.showIcon(IconNames.Pitchfork)
    }
    if (state === GameState.Running) {
        basic.showIcon(IconNames.Square)
    }
    if (winStatus === WinState.Win) {
        basic.showIcon(IconNames.Happy)
        control.inBackground(function () {
            music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
        })
        state = GameState.Passive
        score = 0
        startTime = 0
        basic.pause(5000)
        basic.clearScreen()
        winStatus = WinState.Deciding
    }
    else if (winStatus === WinState.Lose) {
        basic.showIcon(IconNames.Sad)
        control.inBackground(function () {
            music.beginMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once)
        })
        state = GameState.Passive
        score = 0
        startTime = 0
        basic.pause(5000)
        basic.clearScreen()
        winStatus = WinState.Deciding
    }
})