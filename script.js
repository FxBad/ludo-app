// =============================================================================
// LUDO AMORE — script.js
// Clean-code refactor: single-purpose functions, named constants, Player DTO.
// =============================================================================

// ---------------------------------------------------------------------------
// 1. PATH COORDINATES (% positions relative to the game-board element)
// ---------------------------------------------------------------------------

/** Player 1 path — 40 squares from start (top-left) to finish (centre). */
const PATH_P1 = [
    { left: 13.6, top: 41, type: 'start' }, // index 0
    { left: 22.7, top: 41, type: 'truth' }, // index 1
    { left: 32, top: 41, type: 'normal' }, // index 2
    { left: 41, top: 32, type: 'dare' }, // index 3
    { left: 41, top: 22.5, type: 'normal' }, // index 4
    { left: 41, top: 14, type: 'truth' }, // index 5
    { left: 41, top: 5, type: 'normal' }, // index 6
    { left: 50, top: 5, type: 'dare' }, // index 7
    { left: 59, top: 5, type: 'normal' }, // index 8
    { left: 59, top: 14, type: 'truth' }, // index 9
    { left: 59, top: 22.5, type: 'normal' }, // index 10
    { left: 59, top: 32, type: 'dare' }, // index 11
    { left: 68, top: 41, type: 'normal' }, // index 12
    { left: 77, top: 41, type: 'truth' }, // index 13
    { left: 86.5, top: 41, type: 'normal' }, // index 14
    { left: 95.5, top: 41, type: 'dare' }, // index 15
    { left: 95.5, top: 50, type: 'normal' }, // index 16
    { left: 95.5, top: 59, type: 'truth' }, // index 17
    { left: 86.5, top: 59, type: 'normal' }, // index 18
    { left: 77, top: 59, type: 'dare' }, // index 19
    { left: 68, top: 59, type: 'normal' }, // index 20
    { left: 59, top: 68, type: 'truth' }, // index 21
    { left: 59, top: 77, type: 'normal' }, // index 22
    { left: 59, top: 86, type: 'dare' }, // index 23
    { left: 59, top: 95, type: 'normal' }, // index 24
    { left: 50, top: 95, type: 'truth' }, // index 25
    { left: 41, top: 95, type: 'normal' }, // index 26
    { left: 41, top: 86, type: 'dare' }, // index 27
    { left: 41, top: 77, type: 'normal' }, // index 28
    { left: 41, top: 68, type: 'truth' }, // index 29
    { left: 32, top: 59, type: 'normal' }, // index 30
    { left: 22.5, top: 59, type: 'dare' }, // index 31
    { left: 13.5, top: 59, type: 'normal' }, // index 32
    { left: 4.3, top: 59.3, type: 'truth' }, // index 33
    { left: 5, top: 50, type: 'normal' }, // index 34
    { left: 13.5, top: 50, type: 'truth' }, // index 35
    { left: 22.7, top: 50, type: 'normal' }, // index 36
    { left: 32, top: 50, type: 'dare' }, // index 37
    { left: 42, top: 50, type: 'finish' }, // index 38
];

// ponytail: expand PATH_P2 statically to allow easy manual calibration
const PATH_P2 = [
    { left: 86.4, top: 59, type: 'start' }, // index 0
    { left: 77.3, top: 59, type: 'dare' }, // index 1
    { left: 68, top: 59, type: 'normal' }, // index 2
    { left: 59, top: 68, type: 'truth' }, // index 3
    { left: 59, top: 77.5, type: 'normal' }, // index 4
    { left: 59, top: 86, type: 'dare' }, // index 5
    { left: 59, top: 95, type: 'normal' }, // index 6
    { left: 50, top: 95, type: 'truth' }, // index 7
    { left: 41, top: 95, type: 'normal' }, // index 8
    { left: 41, top: 86, type: 'dare' }, // index 9
    { left: 41, top: 77.5, type: 'normal' }, // index 10
    { left: 41, top: 68, type: 'truth' }, // index 11
    { left: 32, top: 59, type: 'normal' }, // index 12
    { left: 23, top: 59, type: 'dare' }, // index 13
    { left: 13.5, top: 59, type: 'normal' }, // index 14
    { left: 4.5, top: 59, type: 'truth' }, // index 15
    { left: 4.5, top: 50, type: 'normal' }, // index 16
    { left: 4.5, top: 41, type: 'dare' }, // index 17
    { left: 13.5, top: 41, type: 'normal' }, // index 18
    { left: 23, top: 41, type: 'truth' }, // index 19
    { left: 32, top: 41, type: 'normal' }, // index 20
    { left: 41, top: 32, type: 'dare' }, // index 21
    { left: 41, top: 23, type: 'normal' }, // index 22
    { left: 41, top: 14, type: 'truth' }, // index 23
    { left: 41, top: 5, type: 'normal' }, // index 24
    { left: 50, top: 5, type: 'dare' }, // index 25
    { left: 59, top: 5, type: 'normal' }, // index 26
    { left: 59, top: 14, type: 'truth' }, // index 27
    { left: 59, top: 23, type: 'normal' }, // index 28
    { left: 59, top: 32, type: 'dare' }, // index 29
    { left: 68, top: 41, type: 'normal' }, // index 30
    { left: 77.5, top: 41, type: 'truth' }, // index 31
    { left: 86.5, top: 41, type: 'normal' }, // index 32
    { left: 95, top: 41, type: 'dare' }, // index 33
    { left: 95, top: 50, type: 'normal' }, // index 34
    { left: 86.5, top: 50, type: 'dare' }, // index 35
    { left: 77.3, top: 50, type: 'normal' }, // index 36
    { left: 68, top: 50, type: 'truth' }, // index 37
    { left: 58, top: 50, type: 'finish' }, // index 38
];

// ---------------------------------------------------------------------------
// 2. ANIMATION & DICE CONSTANTS
// ---------------------------------------------------------------------------

const ANIM_HOP_DURATION = 0.22;  // seconds per step during pawn hop animation
const ANIM_SCALE_PEAK = 1.3;   // pawn scale at apex of hop
const ANIM_SCALE_DURATION = 0.11;  // seconds for scale up/down half-cycle

const DICE_ROLL_FRAMES = 10;   // number of random frames shown during roll
const DICE_ROLL_INTERVAL = 60;  // milliseconds between random frames
const DICE_SETTLE_DELAY = 50;  // milliseconds after interval before moving pawn

const PENALTY_MIN = 1;
const PENALTY_MAX = 6;

const WIN_CONFETTI_DURATION_MS = 5000;
const TURN_PASS_DELAY_MS = 1200; // delay before auto switchTurn when no pawn can move

// ---------------------------------------------------------------------------
// 3. PLAYER DATA TRANSFER OBJECTS
// ---------------------------------------------------------------------------

// ponytail: inline players definition to avoid factory function
const player1 = {
    id: 'p1',
    path: PATH_P1,
    label: 'Player 1 (Pink)',
    cardClass: 'turn-p1',
    card: document.getElementById('card-p1'),
    pawns: [
        { id: 'a', element: document.getElementById('pion-p1-a'), position: -1, pathIndex: -1, isFinished: false, baseCoords: { left: 10.8, top: 14.7 } },
        { id: 'b', element: document.getElementById('pion-p1-b'), position: -1, pathIndex: -1, isFinished: false, baseCoords: { left: 25.3, top: 26.8 } }
    ],
    pityCounter: 0
};

const player2 = {
    id: 'p2',
    path: PATH_P2,
    label: 'Player 2 (Biru)',
    cardClass: 'turn-p2',
    card: document.getElementById('card-p2'),
    pawns: [
        { id: 'a', element: document.getElementById('pion-p2-a'), position: -1, pathIndex: -1, isFinished: false, baseCoords: { left: 73, top: 75.3 } },
        { id: 'b', element: document.getElementById('pion-p2-b'), position: -1, pathIndex: -1, isFinished: false, baseCoords: { left: 88.3, top: 88 } }
    ],
    pityCounter: 0
};

let activePlayer = player1;
let currentRoll = 0;
let awaitingPawnSelection = false;
let bonusRollPending = false;
let challengeContext = null;

// ---------------------------------------------------------------------------
// 4. AUDIO (Howler.js)
// ---------------------------------------------------------------------------

const soundRoll = new Howl({
    src: ['https://raw.githubusercontent.com/jamalihassan0307/LudoVerse/master/assets/sounds/roll_the_dice.mp3'],
    volume: 0.5,
});

const soundStep = new Howl({
    src: ['https://raw.githubusercontent.com/jamalihassan0307/LudoVerse/master/assets/sounds/move.wav'],
    volume: 0.6,
});

const soundWin = new Howl({
    src: ['https://raw.githubusercontent.com/jamalihassan0307/LudoVerse/master/assets/sounds/laugh.mp3'],
    volume: 0.5,
});

const soundSuccess = new Howl({
    src: ['https://raw.githubusercontent.com/mahmoudkhairy402/Hangman-Game/master/success-sound-effect.mp3'],
    volume: 0.4,
});

const soundFail = new Howl({
    src: ['https://raw.githubusercontent.com/mahmoudkhairy402/Hangman-Game/master/fail-buzzer-04.mp3'],
    volume: 0.4,
});

// ---------------------------------------------------------------------------
// 5. DOM HELPERS
// ---------------------------------------------------------------------------

const modalOverlay = document.getElementById('modal-overlay');
const turnIndicator = document.getElementById('turn-indicator');
const btnRoll = document.getElementById('btn-roll');

const scoreP1El = document.getElementById('score-p1');
const scoreP2El = document.getElementById('score-p2');
const roundTargetLabel = document.getElementById('round-target-label');
const winModalOverlay = document.getElementById('win-modal-overlay');
const winModalTitle = document.getElementById('win-modal-title');
const winModalDesc = document.getElementById('win-modal-desc');
const btnNextRound = document.getElementById('btn-next-round');
const btnResetTotal = document.getElementById('btn-reset-total');

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function randomIntBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function getCryptoRandomRoll() {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return (arr[0] % 6) + 1; // ponytail: simple modulo for minimum code
}

function setRollButtonEnabled(isEnabled) {
    btnRoll.disabled = !isEnabled;
}

// ---------------------------------------------------------------------------
// 6. PAWN ANIMATION
// ---------------------------------------------------------------------------

/**
 * Teleports a pawn to the given square index with no animation.
 * Used for initial placement.
 */
function snapPawnToSquare(pawn, squareIndex, path, baseCoords) {
    if (squareIndex === -1) {
        gsap.set(pawn, { left: baseCoords.left + '%', top: baseCoords.top + '%' });
        return;
    }
    const square = path[squareIndex];
    gsap.set(pawn, { left: square.left + '%', top: square.top + '%' });
}

/**
 * Animates a pawn hopping step-by-step from startIndex to targetIndex.
 * Calls onComplete when the last step lands.
 */
function animatePawnHopping(pawn, startIndex, targetIndex, path, onComplete) {
    const stepDirection = targetIndex > startIndex ? 1 : -1;
    const stepCount = Math.abs(targetIndex - startIndex);
    const tl = gsap.timeline({ onComplete });

    for (let step = 1; step <= stepCount; step++) {
        const squareIndex = startIndex + step * stepDirection;
        const square = path[squareIndex];

        tl.to(pawn, {
            left: square.left + '%',
            top: square.top + '%',
            duration: ANIM_HOP_DURATION,
            ease: 'power1.inOut',
            onStart: () => soundStep.play(),
        });

        tl.to(pawn, {
            scale: ANIM_SCALE_PEAK,
            duration: ANIM_SCALE_DURATION,
            yoyo: true,
            repeat: 1,
            ease: 'power1.out',
        }, '<');
    }
}

/**
 * Moves a single pawn belonging to player to the given path index.
 * Clamps to valid bounds, locks the roll button during animation,
 * and triggers collision + square logic on arrival.
 */
function movePawnTo(player, pawn, targetIndex, skipSquareCheck) {
    if (targetIndex === -1) {
        pawn.position = -1;
        pawn.pathIndex = -1;
        snapPawnToSquare(pawn.element, -1, player.path, pawn.baseCoords);
        return;
    }

    const path = player.path;
    const clampedTarget = clamp(targetIndex, 0, path.length - 1);
    const startIndex = pawn.pathIndex;

    pawn.position = clampedTarget;
    pawn.pathIndex = clampedTarget;

    function onArrive() {
        checkCollision(player, pawn);
        handleSquareLanding(path[clampedTarget].type, player, pawn);
        saveGameState();
    }

    if (startIndex === clampedTarget) {
        snapPawnToSquare(pawn.element, clampedTarget, path);
        if (!skipSquareCheck) onArrive();
        return;
    }

    setRollButtonEnabled(false);

    animatePawnHopping(pawn.element, startIndex, clampedTarget, path, function () {
        if (skipSquareCheck) {
            setRollButtonEnabled(true);
        } else {
            onArrive();
        }
    });
}

/**
 * Instantly snaps a pawn back to the start square (index 0). Used for kickback.
 */
function kickbackPawn(player, pawn) {
    const startIndex = pawn.pathIndex;
    pawn.position = -1;
    pawn.pathIndex = -1;
    soundFail.play();

    const tl = gsap.timeline();

    // ponytail: scale pop and step-by-step slide backward on track to base
    tl.to(pawn.element, { scale: 1.2, duration: 0.1 });

    const stepDuration = 0.04; // rapid backward steps
    for (let i = startIndex; i >= 0; i--) {
        const square = player.path[i];
        tl.to(pawn.element, {
            left: square.left + '%',
            top: square.top + '%',
            duration: stepDuration,
            ease: 'none',
        });
    }

    tl.to(pawn.element, {
        left: pawn.baseCoords.left + '%',
        top: pawn.baseCoords.top + '%',
        scale: 1.0,
        duration: 0.2,
        ease: 'power2.out',
    });
}

/**
 * Checks whether the pawn that just landed shares its square with an enemy
 * pawn. Start and finish squares are safe zones (no kickback).
 */
function checkCollision(movingPlayer, movingPawn) {
    const landedSquare = movingPlayer.path[movingPawn.pathIndex];
    if (landedSquare.type === 'start' || landedSquare.type === 'finish') return;

    const otherPlayer = (movingPlayer === player1) ? player2 : player1;
    otherPlayer.pawns.forEach(function (enemyPawn) {
        if (enemyPawn.isFinished || enemyPawn.pathIndex === -1) return;
        const enemySquare = otherPlayer.path[enemyPawn.pathIndex];
        if (enemySquare.left === landedSquare.left && enemySquare.top === landedSquare.top) {
            kickbackPawn(otherPlayer, enemyPawn);
        }
    });
}

// ---------------------------------------------------------------------------
// 7. SQUARE LANDING LOGIC
// ---------------------------------------------------------------------------

function handleSquareLanding(squareType, player, pawn) {
    if (squareType === 'finish') {
        pawn.isFinished = true;
        pawn.element.classList.remove('active-pawn');
        if (player.pawns.every(function (p) { return p.isFinished; })) {
            handleWin(player);
        } else {
            endTurnOrBonus();
        }
    } else if (squareType === 'truth' || squareType === 'dare') {
        showChallengeModal(squareType, player, pawn);
    } else {
        endTurnOrBonus();
    }
}

function handleWin(player) {
    setPawnsHighlighted(player1.pawns, false);
    setPawnsHighlighted(player2.pawns, false);
    setRollButtonEnabled(false);
    triggerWinConfetti();
    soundWin.play();

    scores[player.id]++;
    refreshScoreUI();

    const winsNeeded = targetRounds === 'unlimited' ? Infinity : Math.ceil(targetRounds / 2);
    const matchOver = scores[player.id] >= winsNeeded;

    winModalTitle.innerText = player.label + (matchOver ? ' MENANG PERTANDINGAN!' : ' MENANG RONDE!');
    winModalDesc.innerText = 'Skor: ' + scores.p1 + ' - ' + scores.p2;
    btnNextRound.classList.toggle('hidden', matchOver);
    btnResetTotal.classList.toggle('hidden', !matchOver);
    winModalOverlay.classList.remove('hidden');
    saveGameState();
}

// ---------------------------------------------------------------------------
// 8. TURN MANAGEMENT
// ---------------------------------------------------------------------------

function switchTurn() {
    activePlayer = (activePlayer === player1) ? player2 : player1;
    refreshTurnUI();
}

/** Ends the turn normally, unless a roll-of-6 bonus is pending — then re-rolls same player. */
function endTurnOrBonus() {
    if (bonusRollPending) {
        bonusRollPending = false;
        refreshTurnUI();
    } else {
        switchTurn();
    }
}

/** A pawn is movable if not finished, and base-locked pawns need a roll of 6 to exit. */
function pawnCanMove(pawn, roll) {
    if (pawn.isFinished) return false;
    if (pawn.position === -1) return roll === 6;
    return true;
}

const ACTIVE_ANIMATION_CLASSES = ['animate__animated', 'animate__pulse', 'animate__infinite'];

// ponytail: single function to update player visual states
function updatePlayerVisual(player, isActive) {
    player.card.classList.toggle('active', isActive);
    player.card.classList.toggle('animate__animated', isActive);
    player.card.classList.toggle('animate__pulse', isActive);
    player.card.classList.toggle('animate__infinite', isActive);
}

/** Toggles the pulsing .active-pawn indicator on the given pawns. */
function setPawnsHighlighted(pawns, isOn) {
    pawns.forEach(function (pawn) {
        pawn.element.classList.toggle('active-pawn', isOn);
    });
}

function refreshTurnUI() {
    turnIndicator.innerText = 'Giliran: ' + activePlayer.label;
    turnIndicator.className = activePlayer.cardClass;

    const inactivePlayer = (activePlayer === player1) ? player2 : player1;
    updatePlayerVisual(activePlayer, true);
    updatePlayerVisual(inactivePlayer, false);

    setRollButtonEnabled(true);
    saveGameState();
}

/** Handles a click on any pawn; only acts during the pawn-selection phase. */
function handlePawnClick(player, pawn) {
    if (!awaitingPawnSelection || player !== activePlayer) return;
    if (!pawnCanMove(pawn, currentRoll)) return;

    awaitingPawnSelection = false;
    setPawnsHighlighted(player.pawns, false);
    bonusRollPending = (currentRoll === 6);

    const targetIndex = (pawn.position === -1) ? 0 : pawn.position + currentRoll;
    movePawnTo(player, pawn, targetIndex);
}

// ---------------------------------------------------------------------------
// 9. CHALLENGE MODAL (Truth or Dare)
// ---------------------------------------------------------------------------

function showChallengeModal(challengeType, player, pawn) {
    const question = pickRandomQuestion(challengeType);
    challengeContext = { player: player, pawn: pawn, type: challengeType, question: question };
    document.getElementById('modal-title').innerText = 'Waktunya ' + challengeType.toUpperCase() + '!';
    document.getElementById('modal-desc').innerText = question;
    modalOverlay.classList.remove('hidden');
    animateModalEntrance();
}

function animateModalEntrance() {
    const cardIcon = document.querySelector('.card-icon');
    if (cardIcon) {
        cardIcon.classList.add('animate__animated', 'animate__rubberBand');
    }

    gsap.fromTo('#modal-box',
        { rotationY: -180, scale: 0.8, opacity: 0 },
        { rotationY: 0, scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.4)' }
    );
}

function closeModalWithAnimation(onClose) {
    gsap.to('#modal-box', {
        y: 40,
        scale: 0.9,
        opacity: 0,
        rotationX: -10,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: function () {
            modalOverlay.classList.add('hidden');
            resetModalStyles();
            if (onClose) onClose();
        },
    });
}

function resetModalStyles() {
    gsap.set('#modal-box', { y: 0, scale: 1, opacity: 1, rotationX: 0, rotationY: 0 });

    const cardIcon = document.querySelector('.card-icon');
    if (cardIcon) {
        cardIcon.classList.remove('animate__animated', 'animate__rubberBand');
    }
}

function selesaikanTantangan() {
    closeModalWithAnimation(function () {
        triggerChallengeConfetti();
        soundSuccess.play();
        endTurnOrBonus();
    });
}

function menyerah() {
    closeModalWithAnimation(function () {
        soundFail.play();
        const penalty = randomIntBetween(PENALTY_MIN, PENALTY_MAX);
        const ctx = challengeContext;
        movePawnTo(ctx.player, ctx.pawn, ctx.pawn.position - penalty);
    });
}

// ---------------------------------------------------------------------------
// 10. DICE ROLL
// ---------------------------------------------------------------------------

const DICE_IMAGES = [
    '/assets/dadu-1.png',
    '/assets/dadu-2.png',
    '/assets/dadu-3.png',
    '/assets/dadu-4.png',
    '/assets/dadu-5.png',
    '/assets/dadu-6.png',
];

function showRandomDiceFace(diceImg) {
    diceImg.src = DICE_IMAGES[Math.floor(Math.random() * 6)];
}

function kocokDadu() {
    const diceImg = document.getElementById('dice-image');
    const diceWrapper = document.querySelector('.dice-wrapper');

    setRollButtonEnabled(false);
    soundRoll.play();

    // ponytail: inline dice animation triggers
    diceImg.classList.add('rolling');
    if (diceWrapper) diceWrapper.classList.add('animate__animated', 'animate__shakeY');

    let frameCount = 0;
    const rollInterval = setInterval(function () {
        showRandomDiceFace(diceImg);
        frameCount++;

        if (frameCount >= DICE_ROLL_FRAMES) {
            clearInterval(rollInterval);

            const hasPawnOutside = activePlayer.pawns.some(function (pawn) {
                return pawn.position !== -1 && !pawn.isFinished;
            });

            let finalFace;
            if (hasPawnOutside) {
                finalFace = getCryptoRandomRoll();
                activePlayer.pityCounter = 0;
            } else if (activePlayer.pityCounter >= 4) {
                finalFace = 6;
                activePlayer.pityCounter = 0;
            } else {
                finalFace = getCryptoRandomRoll();
                activePlayer.pityCounter = (finalFace === 6) ? 0 : activePlayer.pityCounter + 1;
            }

            diceImg.src = DICE_IMAGES[finalFace - 1];

            setTimeout(function () {
                diceImg.classList.remove('rolling');
                if (diceWrapper) diceWrapper.classList.remove('animate__animated', 'animate__shakeY');
                currentRoll = finalFace;
                saveGameState();

                const movablePawns = activePlayer.pawns.filter(function (pawn) {
                    return pawnCanMove(pawn, finalFace);
                });

                if (movablePawns.length === 0) {
                    turnIndicator.innerText = 'Tidak ada langkah!';
                    setTimeout(switchTurn, TURN_PASS_DELAY_MS);
                    return;
                }

                if (movablePawns.length === 1) {
                    // ponytail: auto-move single choice
                    const pawn = movablePawns[0];
                    awaitingPawnSelection = false;
                    setPawnsHighlighted(activePlayer.pawns, false);
                    bonusRollPending = (finalFace === 6);
                    const targetIndex = (pawn.position === -1) ? 0 : pawn.position + finalFace;
                    movePawnTo(activePlayer, pawn, targetIndex);
                    return;
                }

                awaitingPawnSelection = true;
                turnIndicator.innerText = 'Pilih Pion (' + finalFace + ' langkah)';
                setPawnsHighlighted(movablePawns, true);
            }, DICE_SETTLE_DELAY);
        }
    }, DICE_ROLL_INTERVAL);
}

// ---------------------------------------------------------------------------
// 11. CONFETTI EFFECTS
// ---------------------------------------------------------------------------

function triggerChallengeConfetti() {
    confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#FF9B9B', '#D15B6D', '#FFF', '#FFD1D1'],
    });
}

function triggerWinConfetti() {
    const endTime = Date.now() + WIN_CONFETTI_DURATION_MS;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    const interval = setInterval(function () {
        const timeLeft = endTime - Date.now();

        if (timeLeft <= 0) {
            clearInterval(interval);
            return;
        }

        const particleCount = 50 * (timeLeft / WIN_CONFETTI_DURATION_MS);

        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

// ---------------------------------------------------------------------------
// 12. PATH DEBUG OVERLAY
// ---------------------------------------------------------------------------

let debugSelectedSquare = null; // { square, index, pathName, dotEl }

/** Renders numbered dots at every PATH_P1 / PATH_P2 coordinate for visual calibration. */
function renderDebugOverlay() {
    const overlay = document.getElementById('debug-overlay');
    overlay.innerHTML = '';
    debugSelectedSquare = null;
    updateDebugPanelInputs();

    [{ path: PATH_P1, cls: 'debug-p1', name: 'PATH_P1' }, { path: PATH_P2, cls: 'debug-p2', name: 'PATH_P2' }].forEach(function (entry) {
        entry.path.forEach(function (square, index) {
            const dot = document.createElement('div');
            dot.className = 'debug-dot ' + entry.cls;
            dot.style.left = square.left + '%';
            dot.style.top = square.top + '%';
            dot.title = index + ' (' + square.type + ')';
            dot.innerText = index;
            dot.addEventListener('pointerdown', function (event) {
                startDraggingDebugDot(event, square, index, entry.name, dot);
            });
            overlay.appendChild(dot);
        });
    });

    applyDebugPathVisibility();
}

/** Shows/hides P1 or P2 dots based on the panel's checkbox state. */
function applyDebugPathVisibility() {
    const showP1 = document.getElementById('debug-toggle-p1').checked;
    const showP2 = document.getElementById('debug-toggle-p2').checked;

    document.querySelectorAll('.debug-dot.debug-p1').forEach(function (dot) {
        dot.classList.toggle('debug-path-hidden', !showP1);
    });
    document.querySelectorAll('.debug-dot.debug-p2').forEach(function (dot) {
        dot.classList.toggle('debug-path-hidden', !showP2);
    });
}

function toggleDebugOverlay() {
    const overlay = document.getElementById('debug-overlay');
    const panel = document.getElementById('debug-panel');
    if (overlay.classList.contains('visible')) {
        overlay.classList.remove('visible');
        panel.classList.remove('visible');
        panel.classList.add('hidden');
        return;
    }
    renderDebugOverlay();
    overlay.classList.add('visible');
    panel.classList.remove('hidden');
    panel.classList.add('visible');
}

/** Selects a dot for editing and starts a pointer drag that repositions it live. */
function startDraggingDebugDot(event, square, index, pathName, dotEl) {
    event.preventDefault();
    selectDebugDot(square, index, pathName, dotEl);

    const overlay = document.getElementById('debug-overlay');

    function onPointerMove(moveEvent) {
        const rect = overlay.getBoundingClientRect();
        const leftPct = clamp(((moveEvent.clientX - rect.left) / rect.width) * 100, 0, 100);
        const topPct = clamp(((moveEvent.clientY - rect.top) / rect.height) * 100, 0, 100);
        setDebugSquarePosition(Math.round(leftPct * 10) / 10, Math.round(topPct * 10) / 10);
    }

    function onPointerUp() {
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
    }

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
}

function selectDebugDot(square, index, pathName, dotEl) {
    document.querySelectorAll('.debug-dot.debug-selected').forEach(function (el) {
        el.classList.remove('debug-selected');
    });
    dotEl.classList.add('debug-selected');
    debugSelectedSquare = { square: square, index: index, pathName: pathName, dotEl: dotEl };
    updateDebugPanelInputs();
}

/** Applies a new left/top to the currently selected square, syncing dot + inputs + live pawn path. */
function setDebugSquarePosition(left, top) {
    if (!debugSelectedSquare) return;
    debugSelectedSquare.square.left = left;
    debugSelectedSquare.square.top = top;
    debugSelectedSquare.dotEl.style.left = left + '%';
    debugSelectedSquare.dotEl.style.top = top + '%';
    updateDebugPanelInputs();
}

function updateDebugPanelInputs() {
    const label = document.getElementById('debug-selected-label');
    const leftInput = document.getElementById('debug-input-left');
    const topInput = document.getElementById('debug-input-top');

    if (!debugSelectedSquare) {
        label.innerText = '-';
        leftInput.value = '';
        topInput.value = '';
        leftInput.disabled = true;
        topInput.disabled = true;
        return;
    }

    label.innerText = debugSelectedSquare.pathName + '[' + debugSelectedSquare.index + '] (' + debugSelectedSquare.square.type + ')';
    leftInput.value = debugSelectedSquare.square.left;
    topInput.value = debugSelectedSquare.square.top;
    leftInput.disabled = false;
    topInput.disabled = false;
}

function exportPathAsJs(path, name) {
    const lines = path.map(function (square) {
        return "    { left: " + square.left + ", top: " + square.top + ", type: '" + square.type + "' },";
    });
    return 'const ' + name + ' = [\n' + lines.join('\n') + '\n];';
}

function copyDebugExport(path, name) {
    const code = exportPathAsJs(path, name);
    const exportArea = document.getElementById('debug-export');
    exportArea.value = code;
    exportArea.select();
    if (navigator.clipboard) navigator.clipboard.writeText(code).catch(function () { });
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'd' || event.key === 'D') toggleDebugOverlay();
});

document.getElementById('debug-input-left').addEventListener('input', function (event) {
    if (!debugSelectedSquare) return;
    setDebugSquarePosition(parseFloat(event.target.value) || 0, debugSelectedSquare.square.top);
});

document.getElementById('debug-input-top').addEventListener('input', function (event) {
    if (!debugSelectedSquare) return;
    setDebugSquarePosition(debugSelectedSquare.square.left, parseFloat(event.target.value) || 0);
});

document.getElementById('debug-copy-p1').addEventListener('click', function () {
    copyDebugExport(PATH_P1, 'PATH_P1');
});

document.getElementById('debug-copy-p2').addEventListener('click', function () {
    copyDebugExport(PATH_P2, 'PATH_P2');
});

document.getElementById('debug-toggle-p1').addEventListener('change', applyDebugPathVisibility);
document.getElementById('debug-toggle-p2').addEventListener('change', applyDebugPathVisibility);

if (new URLSearchParams(window.location.search).has('debug')) {
    toggleDebugOverlay();
}

// ---------------------------------------------------------------------------
// 13. TRUTH/DARE DECK (default + custom)
// ---------------------------------------------------------------------------

const DEFAULT_TRUTHS = [
    'Apa momen paling romantis yang pernah kita alami bersama?',
    'Sebutkan satu kebiasaan pasangan yang bikin kamu makin sayang.',
    'Kapan pertama kali kamu yakin pasangan ini "the one"?',
    'Apa panggilan sayang paling konyol yang pernah kamu kasih ke pasangan?',
    'Ceritakan mimpi liburan romantis impianmu bersama pasangan.',
    'Apa yang paling kamu kagumi dari pasanganmu?',
];

const DEFAULT_DARES = [
    'Peluk pasanganmu selama 20 detik tanpa ngomong apa pun.',
    'Nyanyikan potongan lagu cinta favoritmu untuk pasangan.',
    'Beri pasanganmu 3 pujian tulus sekarang juga.',
    'Rayu pasanganmu pakai gombalan receh.',
    'Cium kening pasanganmu.',
    'Balas pesan chat pasangan pakai emoji hati doang selama 1 menit.',
];

let customTruths = [];
let customDares = [];

function getTruthDeck() {
    return customTruths.length ? customTruths : DEFAULT_TRUTHS;
}

function getDareDeck() {
    return customDares.length ? customDares : DEFAULT_DARES;
}

function pickRandomQuestion(type) {
    const deck = type === 'truth' ? getTruthDeck() : getDareDeck();
    return deck[randomIntBetween(0, deck.length - 1)];
}

function parseDeckTextarea(text) {
    return text.split('\n').map(function (line) { return line.trim(); }).filter(Boolean);
}

function saveSettings() {
    customTruths = parseDeckTextarea(document.getElementById('input-custom-truths').value);
    customDares = parseDeckTextarea(document.getElementById('input-custom-dares').value);
    const targetValue = document.getElementById('input-target-rounds').value;
    targetRounds = targetValue === 'unlimited' ? 'unlimited' : parseInt(targetValue, 10);
    refreshScoreUI();
    saveGameState();
}

// ---------------------------------------------------------------------------
// 14. ROUND SCOREBOARD
// ---------------------------------------------------------------------------

let scores = { p1: 0, p2: 0 };
let targetRounds = 3; // 3, 5, or 'unlimited'

function refreshScoreUI() {
    scoreP1El.innerText = scores.p1;
    scoreP2El.innerText = scores.p2;
    roundTargetLabel.innerText = targetRounds === 'unlimited' ? 'Bebas' : ('Best of ' + targetRounds);
}

function startNextRound() {
    winModalOverlay.classList.add('hidden');
    resetRoundOnly();
}

/** Resets pawn positions for a new round while keeping scores intact. */
function resetRoundOnly() {
    [player1, player2].forEach(function (player) {
        player.pawns.forEach(function (pawn) {
            pawn.isFinished = false;
            movePawnTo(player, pawn, -1);
        });
        player.pityCounter = 0;
    });
    activePlayer = player1;
    bonusRollPending = false;
    awaitingPawnSelection = false;
    refreshTurnUI();
}

/** Full reset including scores. Used after a match is won outright. */
function resetGameState() {
    scores = { p1: 0, p2: 0 };
    winModalOverlay.classList.add('hidden');
    refreshScoreUI();
    resetRoundOnly();
}

// ---------------------------------------------------------------------------
// 15. SAVE / LOAD STATE (localStorage)
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'ludoAmoreState';

function saveGameState() {
    const state = {
        activePlayerId: activePlayer.id,
        currentRoll: currentRoll,
        bonusRollPending: bonusRollPending,
        pawns: {
            p1: player1.pawns.map(function (p) { return { pathIndex: p.pathIndex, isFinished: p.isFinished }; }),
            p2: player2.pawns.map(function (p) { return { pathIndex: p.pathIndex, isFinished: p.isFinished }; }),
        },
        pityCounter: { p1: player1.pityCounter, p2: player2.pityCounter },
        scores: scores,
        targetRounds: targetRounds,
        customTruths: customTruths,
        customDares: customDares,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function applyPawnState(player, savedPawns) {
    player.pawns.forEach(function (pawn, i) {
        const saved = savedPawns[i];
        pawn.pathIndex = saved.pathIndex;
        pawn.position = saved.pathIndex;
        pawn.isFinished = saved.isFinished;
        pawn.element.classList.toggle('active-pawn', false);
        snapPawnToSquare(pawn.element, saved.pathIndex, player.path, pawn.baseCoords);
    });
}

// ponytail: mid-selection state (awaitingPawnSelection) isn't persisted — a
// refresh just falls back to "no pawn chosen yet"; add if that gap bites.
function loadGameState() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
        try {
            const state = JSON.parse(raw);
            applyPawnState(player1, state.pawns.p1);
            applyPawnState(player2, state.pawns.p2);
            player1.pityCounter = state.pityCounter.p1;
            player2.pityCounter = state.pityCounter.p2;
            scores = state.scores;
            targetRounds = state.targetRounds;
            customTruths = state.customTruths || [];
            customDares = state.customDares || [];
            activePlayer = state.activePlayerId === 'p2' ? player2 : player1;
            currentRoll = state.currentRoll || 0;
            bonusRollPending = !!state.bonusRollPending;
        } catch (e) {
            // corrupt state, ignore and keep defaults
        }
    }

    document.getElementById('input-target-rounds').value = String(targetRounds);
    document.getElementById('input-custom-truths').value = customTruths.join('\n');
    document.getElementById('input-custom-dares').value = customDares.join('\n');

    refreshScoreUI();
    refreshTurnUI();
}

// ---------------------------------------------------------------------------
// 16. INITIALISATION
// ---------------------------------------------------------------------------

[player1, player2].forEach(function (player) {
    player.pawns.forEach(function (pawn) {
        movePawnTo(player, pawn, -1);
        pawn.element.addEventListener('click', function () { handlePawnClick(player, pawn); });
    });
});
loadGameState();
lucide.createIcons();
