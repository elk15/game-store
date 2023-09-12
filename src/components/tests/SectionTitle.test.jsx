import SectionTitle from "../SectionTitle";
import { render, screen } from "@testing-library/react";
import { describe, expect, it} from "vitest";
import { mdiAbTesting } from '@mdi/js';

describe("Section Title", () => {

    it('should display the correct title', () => {
        render (
            <SectionTitle 
            title={"My Section"}
            icon={mdiAbTesting}>
            </SectionTitle>
        )

        const title = screen.getByRole('heading');

        expect(title).toHaveTextContent("My Section");
    });

    it('should display an svg', () => {
        render (
            <SectionTitle 
            title={"My Section"}
            icon={mdiAbTesting}>
            </SectionTitle>
        )

        const title = screen.getByRole('heading');

        expect(title).toContainHTML('svg');
    });
})