import cloneDeep from 'lodash/cloneDeep';
import geometry from './geometry.js';

const addEmptySeats = ({seats}) => {
    const newSeats = cloneDeep(seats);
    const maxSeats = newSeats.length <= 6 ? 6 : 9;
    while (newSeats.length < maxSeats) {
        const distances = newSeats.map((s, i, arr) => {
            return geometry.centerDistance(s.box, arr[(i+1) % arr.length].box);
        });
        const maxIdx = distances.indexOf(Math.max(...distances));
        newSeats.splice(maxIdx == 0 ? 1 : maxIdx, 0, {
            isHero: false,
            name: 'Open Seat',
            box: [geometry.getCenter(geometry.union(newSeats[maxIdx].box, newSeats[(maxIdx+1) % newSeats.length].box))],
            isOpen: true,
            sitout: true,
            pot: 0
        });
    }
    // correct ids
    newSeats.forEach((s, i) => {
        s.id = i+1;
    });
    return newSeats;
};

export default addEmptySeats;
