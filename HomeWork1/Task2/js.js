'use strict';

let gameOver = false;
let playGame = document.querySelector('.play');
let masButtons = Array.from(document.querySelector('.game').getElementsByTagName('button'));
let buttonStartGame = document.getElementById('buttonStartGame');
let stupidBot = document.getElementById('stupidBot'); //Режим тупого бота
let chooseCross = document.getElementById('chooseCross'); //Режим крестик
let playerSymbol = chooseCross.checked?'X':'O';
let botSymbol = chooseCross.checked?'O':'X';
let log = document.querySelector('.log');
const winnerInformation = '\nУра! Вы победили!';
const lossInformation = '\nК сожалению, вы проиграли!';
const drawInformation = '\nНичья!';
const informationForUser = '\nДля запуска новой игры обновите страницу!';
const informationPlayerMotion = '\nВы совершили ход';
const informationBotMotion = '\nБот совершил ход';

buttonStartGame.addEventListener('click',function(event){
    event.preventDefault();
    document.getElementsByTagName('form')[0].style.display='none';
    document.querySelector('.game').style.display='block';
    playerSymbol = chooseCross.checked?'X':'O';
    botSymbol = chooseCross.checked?'O':'X';
    log.innerText += 'Лог действий';
    if (chooseCross.checked===false){
        motion(false,chooseRandButton());
    };
});

playGame.addEventListener('click', function(event){
    if (event.target.tagName==='BUTTON'){
        if (gameOver===true){
            alert(informationForUser);
        }
        if (gameOver===false){ 
            motion(true,event.target); //Ход игрока
        }
        if (gameOver===false){ //Бот ходит
            if (stupidBot.checked===true){
                motion(false,chooseRandButton()); //Ход бота
            }
            else{
                let tempSearchButton = chooseButtonForAdvancedBot(true); //Попытка найти выигрышные комбинации для бота
                if (tempSearchButton != undefined){
                    motion(false,tempSearchButton);
                }
                else{
                    tempSearchButton = chooseButtonForAdvancedBot(false); //Оборонительная комбинация бота
                    if (tempSearchButton != undefined){
                        motion(false,tempSearchButton);
                    }
                    else{
                        motion(false,chooseRandButton()); //Ход бота
                    }
                }
            }
        }
    }
});

function motion(player, button){ //Ход. Player = true игрок
    button.disabled = true;
    button.innerText = (player) ? playerSymbol : botSymbol;
    log.innerText += ((player) ? informationPlayerMotion : informationBotMotion) + ' в ' + new Date().toLocaleTimeString();
    if (checkWinner((player) ? playerSymbol : botSymbol)){
        infoGameOver((player) ? winnerInformation : lossInformation);
    }
    else {
        if (masButtons.filter(button => button.disabled === false).length === 0){
            infoGameOver(drawInformation);
        }
    }
}

function chooseRandButton(){ //Выбор случайного button
    let restNotDisabledButtons = masButtons.filter(button=>button.disabled===false);
    let rand = Math.floor(Math.random() * restNotDisabledButtons.length);
    return restNotDisabledButtons[rand];
}

function infoGameOver(message){ //Информация в случае окончания игры
    gameOver = true;
    log.innerText += message;
    log.innerText += informationForUser;
}

function checkWinner(symbol){ //Проверка выигрышной комбинации
    if ((checkWinnerDetailed(symbol, 0, 1, 2)) || (checkWinnerDetailed(symbol, 3, 4, 5)) || (checkWinnerDetailed(symbol, 6, 7, 8))
        || (checkWinnerDetailed(symbol, 0, 3, 6)) || (checkWinnerDetailed(symbol, 1, 4, 7)) || (checkWinnerDetailed(symbol, 2, 5, 8))
        || (checkWinnerDetailed(symbol, 0, 4, 8)) || (checkWinnerDetailed(symbol, 2, 4, 6))){
            return true;
        }
    return false;
}

function checkWinnerDetailed(symbol, firstIndex, secondIndex, thirdIndex){ //Проверяем выигрышную комбинацию и дополнительно добьавляем класс (для красоты)
    if ((masButtons[firstIndex].innerText===symbol && masButtons[secondIndex].innerText===symbol && masButtons[thirdIndex].innerText===symbol)){
        masButtons[firstIndex].classList.add('win');
        masButtons[secondIndex].classList.add('win');
        masButtons[thirdIndex].classList.add('win');
        return true;
    }
    return false;
}

function chooseButtonForAdvancedBot(searchWinCombination){ //Функция режима продвинутого бота. В данном режиме бот пытается выбрать нужный button в завимости от текущего состояния игры.
    if (searchCombination(searchWinCombination, 0, 1, 2))
        return masButtons[2];
    if (searchCombination(searchWinCombination, 0, 2, 1))
        return masButtons[1];
    if (searchCombination(searchWinCombination, 1, 2, 0))
        return masButtons[0];
    if (searchCombination(searchWinCombination, 3, 4, 5))
        return masButtons[5];
    if (searchCombination(searchWinCombination, 3, 5, 4))
        return masButtons[4];
    if (searchCombination(searchWinCombination, 4, 5, 3))
        return masButtons[3];
    if (searchCombination(searchWinCombination, 6, 7, 8))
        return masButtons[8];
    if (searchCombination(searchWinCombination, 6, 8, 7))
        return masButtons[7];
    if (searchCombination(searchWinCombination, 7, 8, 6))
        return masButtons[6];
    if (searchCombination(searchWinCombination, 0, 3, 6))
        return masButtons[6];
    if (searchCombination(searchWinCombination, 0, 6, 3))
        return masButtons[3];
    if (searchCombination(searchWinCombination, 3, 6, 0))
        return masButtons[0];
    if (searchCombination(searchWinCombination, 1, 4, 7))
        return masButtons[7];
    if (searchCombination(searchWinCombination, 1, 7, 4))
        return masButtons[4];
    if (searchCombination(searchWinCombination, 4, 7, 1))
        return masButtons[1];
    if (searchCombination(searchWinCombination, 2, 5, 8))
        return masButtons[8];
    if (searchCombination(searchWinCombination, 2, 8, 5))
        return masButtons[5];
    if (searchCombination(searchWinCombination, 5, 8, 2))
        return masButtons[2];
    if (searchCombination(searchWinCombination, 0, 4, 8))
        return masButtons[8];
    if (searchCombination(searchWinCombination, 0, 8, 4))
        return masButtons[4];
    if (searchCombination(searchWinCombination, 4, 8, 0))
        return masButtons[0];
    if (searchCombination(searchWinCombination, 2, 4, 6))
        return masButtons[6];
    if (searchCombination(searchWinCombination, 2, 6, 4))
        return masButtons[4];
    if (searchCombination(searchWinCombination, 4, 6, 2))
        return masButtons[2];
}

function searchCombination(searchWinCombination, firstIndex, secondIndex, finalIndex){ //Поиск комбинации (режим бота)
    if (((masButtons[firstIndex].innerText===((searchWinCombination)?botSymbol:playerSymbol) && masButtons[secondIndex].innerText===((searchWinCombination)?botSymbol:playerSymbol))
        ) && masButtons[finalIndex].disabled===false){
        return true;
    }
    return false;
}