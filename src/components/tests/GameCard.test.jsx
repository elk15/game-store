import GameCard from "../GameCard";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi} from "vitest";
import { BrowserRouter } from "react-router-dom";


describe("Game Card", () => {
    it("calls addItemToCart once when the button is clicked", async () => {
        const user = userEvent.setup();
        const addItemToCart = vi.fn();

        render(
            <BrowserRouter>
                <GameCard 
                    addItemToCart={addItemToCart}
                    image={null}
                    title={"My Game"}
                    id={0}
                />
            </BrowserRouter>
        );
        const addBtn = screen.getByRole('button', {name: 'add-to-cart'});
        await user.click(addBtn);
    
        expect(addItemToCart.mock.calls.length).toBe(1);
    })

    it("displays correct title", async () => {
        const addItemToCart = vi.fn();
        render(
            <BrowserRouter>
                <GameCard 
                    addItemToCart={addItemToCart}
                    image={null}
                    title={"My Game"}
                    id={0}
                />
            </BrowserRouter>
        );
        const gameTitle = screen.getByRole('heading');
    
        expect(gameTitle).toHaveTextContent("My Game")
    })

    it("shortens title if it's greater than 41 chars", async () => {
        const addItemToCart = vi.fn();
        render(
            <BrowserRouter>
                <GameCard 
                    addItemToCart={addItemToCart}
                    image={null}
                    title={"Cthulhu Saves the World: Super Hyper Enhanced Championship Edition Alpha Diamond DX Plus"}
                    id={0}
                />
            </BrowserRouter>
        );
        const gameTitle = screen.getByRole('heading');
    
        expect(gameTitle).toHaveTextContent("Cthulhu Saves the World: Super Hyper Enha")
    })
})

