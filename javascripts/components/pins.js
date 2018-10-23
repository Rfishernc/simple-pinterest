import {loadPins} from '../data/pinsData.js';
import {initialBoardView} from '../components/boards.js';

const initialPinView = (boardId) => {
    loadPins(boardId).then(data => {
        writePins(data);
        bindEvents();
    }).catch(error => {
        console.log(error);
    });
}

const writePins = (pins) => {
    let domString = '';
    pins.forEach(pin => {
        domString += `<div id=${pin.id} class='pcard pin-card align-self-start p-2'>
        <img class='card-img-top' src=${pin.image_url}>
        <a href=${pin.link} target='_blank' class='p-2'>
        <button type='button' class='btn btn-light'>${shortenLink(pin.link)}</button>
        </a>
        </div>`;
    })
    $('#pins-on-board').html(domString);
}

const shortenLink = (full_url) => {
    const hostName = new URL(full_url).hostname;
    return hostName;
}

const bindEvents = () => {
    $('#toBoardsBtn').click(() => {
        $('#boards-page').show();
        $('#pins-page').hide();
        initialBoardView();
    })
}


export {initialPinView};