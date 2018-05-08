import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import { TicTacToe, Square } from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('tictactoe', () => {
    it('should contain nine squares', () => {
        const wrapper = shallow(<TicTacToe />)
        const squares = wrapper.find(Square);

        expect(squares).toHaveLength(9);
    });

    it('should change the value of a square when clicked', () => {
        const wrapper = mount(<TicTacToe />);
        let firstSquare = wrapper.find(Square).first();

        firstSquare.simulate('click');

        expect(firstSquare.text()).toBe('X');
    })

    it('should alternate players', () => {
        const wrapper = mount(<TicTacToe />);
        const square = wrapper.find(Square);
        let firstSquare = wrapper.find(Square).first();
        let lastSquare = wrapper.find(Square).last();

        firstSquare.simulate('click');
        lastSquare.simulate('click');

        expect(lastSquare.text()).toBe('O');
    });

    it('should ignore plays on a square that is already occupied', () => {
        const wrapper = mount(<TicTacToe />);
        const square = wrapper.find(Square);
        let firstSquare = wrapper.find(Square).first();

        firstSquare.simulate('click');
        firstSquare.simulate('click');

        expect(firstSquare.text()).toBe('X');
    });

    it('should not alternate player after an invalid click', () => {
        const wrapper = mount(<TicTacToe />);
        const square = wrapper.find(Square);
        let firstSquare = wrapper.find(Square).first();
        let lastSquare = wrapper.find(Square).last();

        firstSquare.simulate('click');
        firstSquare.simulate('click');
        lastSquare.simulate('click');

        expect(lastSquare.text()).toBe('O');
    })

    it('should declare a winner when a player has three in a row horizontally', () => {
        const wrapper = mount(<TicTacToe />);
        const square = wrapper.find(Square);
        let firstSquare = wrapper.find(Square).first();
        let secondSquare = wrapper.find(Square).at(1);
        let thirdSquare = wrapper.find(Square).at(2);
        let fourthSquare = wrapper.find(Square).at(3);
        let fifthSquare = wrapper.find(Square).at(4);
        let lastSquare = wrapper.find(Square).last();

        firstSquare.simulate('click');
        lastSquare.simulate('click');
        secondSquare.simulate('click');
        fifthSquare.simulate('click');
        thirdSquare.simulate('click');

        const gameStatus = wrapper.find('.status');
        expect(gameStatus.text()).toBe('Winner is X.');
    })

    it('should declare a draw when all squares are occupied with no winner.', () => {
        const wrapper = mount(<TicTacToe />);
        const square = wrapper.find(Square);
        let firstSquare = wrapper.find(Square).first();
        let secondSquare = wrapper.find(Square).at(1);
        let thirdSquare = wrapper.find(Square).at(2);
        let fourthSquare = wrapper.find(Square).at(3);
        let fifthSquare = wrapper.find(Square).at(4);
        let sixthSquare = wrapper.find(Square).at(5);
        let seventhSquare = wrapper.find(Square).at(6);
        let eighthSquare = wrapper.find(Square).at(7);
        let lastSquare = wrapper.find(Square).last();

        firstSquare.simulate('click');
        secondSquare.simulate('click');
        thirdSquare.simulate('click');
        fourthSquare.simulate('click');
        sixthSquare.simulate('click');
        fifthSquare.simulate('click');
        seventhSquare.simulate('click');
        lastSquare.simulate('click');
        eighthSquare.simulate('click');

        const gameStatus = wrapper.find('.status');
        expect(gameStatus.text()).toBe('Draw!');
    })
});