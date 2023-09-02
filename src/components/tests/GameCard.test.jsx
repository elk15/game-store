import GameCard from "../GameCard";
import {  render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect } from "vitest";
import { BrowserRouter, json } from 'react-router-dom';
import { vi } from 'vitest'

it("adds items to cart", async () => {
    const user = userEvent.setup();
    const addItemToCart = vi.fn();
    
    render(
        <GameCard addItemToCart={addItemToCart}/>
    );
    const addBtn = screen.getByLabelText('add-to-cart');
    await user.click(addBtn);

    expect(addItemToCart).toHaveBeenCalled();
})