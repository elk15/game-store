import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi} from "vitest";
import { BrowserRouter, useParams } from "react-router-dom";
import GenrePage from '../GenrePage';

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useParams: () => ({gameGenre: 'rpg'}),
    }
})
const addItemToCart = vi.fn();
const mockGames = [
    {
        id: 0,
        name: "RPG 1",
        image: null,
        genres: [{name : "RPG"}, {name: "Action"}]
    },
    {
        id: 1,
        name: "Strategy Game",
        image: null,
        genres: [{name: "Strategy"}, {name: "Action"}]
    },
    {
        id: 2,
        name: "RPG 2",
        image: null,
        genres: [{name: "Rpg"}, {name: "Shooter"}]
    },
]

const mockGame = [
    {
        id: 0,
        name: "RPG 1",
        image: null,
        genres: [{name : "RPG"}, {name: "Action"}]
    },
]

const MockPage = ({games, addItemToCart}) => {    
    return (
        <BrowserRouter>
                <GenrePage games={games} addItemToCart={addItemToCart}>
                </GenrePage>
        </BrowserRouter>
    )
}

describe("Genre Page", () => {
    it("only displays games of the correct genre", () => {
        render(
            <MockPage games={mockGames} addItemToCart={addItemToCart}/>
        )
        const game = screen.getByText(/2 Games Found/i);
        expect(game).toBeInTheDocument();
    })

    it("displays 'game' when there is only one game", () => {
        render(
            <MockPage games={mockGame} addItemToCart={addItemToCart}/>
        )
        const game = screen.getByText(/1 Game Found/i);
        expect(game).toBeInTheDocument();
    })
})