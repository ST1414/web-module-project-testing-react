//1. Add in nessisary imports and values to establish the testing suite.
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Display from '../Display';
import userEvent from '@testing-library/user-event';

// Build mock API call
import fetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow');

//3. Copy a show test data 
const testShow = {
    name: 'The Love Boat',
    summary: "A floating seedy motel", 
    seasons: [
        {id: 0, name: 'Season 1', episodes:[]},
        {id: 1, name: 'Season 2', episodes:[]},
        {id: 2, name: 'Season 3', episodes:[]}
    ]
}


test ("Test 1 - renders without any props", () => {
    //2. Test that the Display component renders without any passed in props.
    render(<Display />);
});


test ("Test 2 - show component displays after fetch button pressed", async () => {
    //4. Test that when the fetch button is pressed, the show component will display. 
    // Make sure to account for the api call and change of state in building your test.
    // NOTE: 3 things for the API call: (1) asycn, (2) await, (3) findBy

    fetchShow.mockResolvedValueOnce(testShow)

    render(<Display />);
    const showBtn = screen.getByRole('button');
    userEvent.click(showBtn);
    const showComponent = await screen.findByTestId('show-container');
    expect(showComponent).toBeInTheDocument();

});


test ("Test 3 - selected options rendered matches test data", async () => {
    //5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
    
    fetchShow.mockResolvedValueOnce(testShow)

    render(<Display />);
    
    const showBtn = screen.getByRole('button');
    userEvent.click(showBtn);
    const seasons = await screen.findAllByTestId('season-option');
    expect(seasons.length === 3).toBeTruthy();

});



test ("Test 4 - function called when optional functional prop is passed", async () => {
    //6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.

    fetchShow.mockResolvedValueOnce(testShow)

    const fakeDisplayFunc = jest.fn( () => {
        // console.log('Test 4 - Click handle called')
    });

    render(<Display displayFunc={fakeDisplayFunc}/>)
    const showBtn = screen.getByRole('button');
    userEvent.click(showBtn);
    
    // Need to handle the promise bc of the API call by the btn click
    await waitFor( () => expect(fakeDisplayFunc).toBeCalled());

});

