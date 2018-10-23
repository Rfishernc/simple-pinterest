import {loadBoards} from '../data/boardsData.js';
import {loadAllPins} from '../data/pinsData.js';
import {initialPinView} from './pins.js';

const initialBoardView = () => {
    loadBoards().then((boards) => {
        return loadAllPins(boards).then((boardsWithPins) => {
            writeBoards(boardsWithPins);
            bindEvents();
        });
    }).catch((error) => {

    })
}

const writeBoards = (boards) => {
    let domString = '';
    boards.forEach(board => {
        const boardImg = board.pins[0] ? board.pins[0].image_url : "./db/default-img.jpeg";
        domString += `<div class="board-card p-2" id=${board.id}>
                        <img class="card-img-top" src="${boardImg}" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">${board.name}</h5>
                            <p class="card-text">${board.pins.length} pins</p>
                        </div>
                    </div>`
    })
    $('#user-boards').html(domString);
}

const bindEvents = () => {
    $('#user-boards').on('click', '.board-card', (event) => {
        const clickedId = $(event.target).closest('.board-card').attr('id');
        $('#boards-page').hide();
        $('#pins-page').show();
        initialPinView(clickedId);
    })
}

export {initialBoardView};