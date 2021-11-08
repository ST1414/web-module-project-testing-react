import React from 'react';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';

const testEpisode = {
    id:1,
    name: "",
    image: "http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg",
    season: 1,
    number: 1,
    summary: "I like Bacon",
    runtime: 1
}
const testEpisode2 = {
    id:1,
    name: "",
    image: "",
    season: 1,
    number: 1,
    summary: "I like Bacon",
    runtime: 1
}

const testEpisodeWithoutImage = {
    //Add in approprate test data structure here.
}

test("renders without error", () => {
    // Arrange
    render(<Episode episode={testEpisode}/>)
});

test("renders the summury test passed as prop", ()=>{
    // Arrange
    render(<Episode episode={testEpisode}/>)

    // Act - NOTE: Can't use findBy bc it always EXPECTS a promise first
    const summary = screen.getByText(/i like bacon/i); 
    
    // Assert
    expect(summary).toBeInTheDocument();
    expect(summary).not.toBeNull();
    expect(summary).toBeTruthy();

});

test("renders default image when image is not defined", ()=>{
    // Arrange
    render(<Episode episode={testEpisode2}/>)

    // Act
    const altTag = screen.getByAltText(/stranger_things.png/i);
    //console.log('MY LOG: ', altTag);

    //Assert
    expect(altTag).toBeInTheDocument();


})

//Tasks
//1. Complete a test that shows the Episode component renders. Pass in the provided example episode data as a test prop.
//2. Modify the test data to display a specific summary statement. Complete a test that shows that the summary value passed in to the Episode component displays as expected. Use no more then 3 different expect statements to test the the existance of the summary value.
//3. The episode component displays a default value ('./stranger_things.png') when a image url is not provided. Create a new piece of test data with the image property set to null. Test that the alt tag of the image displayed is set to './stranger_things.png'.