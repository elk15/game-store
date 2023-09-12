import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it} from "vitest";
import { vi } from 'vitest'
import { BrowserRouter } from "react-router-dom";
import SliderImage from "../SliderImage";

describe("Slider Image", () => {
    it("calls addItemToCart once when the button is clicked", async () => {
        const user = userEvent.setup();
        const addItemToCart = vi.fn();

        render(
            <BrowserRouter>
                <SliderImage 
                    addItemToCart={addItemToCart}
                    image={null}
                    title={"My Game"}
                    id={0}
                />
            </BrowserRouter>
        );
        const addBtn = screen.getByRole('button');
        await user.click(addBtn);
    
        expect(addItemToCart.mock.calls.length).toBe(1);
    })

    it("displays correct title", async () => {
        const addItemToCart = vi.fn();
        render(
            <BrowserRouter>
                <SliderImage 
                    addItemToCart={addItemToCart}
                    image={null}
                    title={"My Game"}
                    id={0}
                />
            </BrowserRouter>
        );
        const gameTitle = screen.getByRole('heading');
    
        expect(gameTitle).toHaveTextContent("My Game");
    })

    it("displays correct alt text for image", async () => {
        const addItemToCart = vi.fn();
        render(
            <BrowserRouter>
                <SliderImage 
                    addItemToCart={addItemToCart}
                    image={null}
                    title={"My Game"}
                    id={0}
                />
            </BrowserRouter>
        );
        const altText = screen.getByAltText("My Game")
    
        expect(altText).toBeInTheDocument();
    })
})