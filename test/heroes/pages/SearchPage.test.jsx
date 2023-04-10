import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { SearchPage } from "../../../src/heroes/pages/SearchPage"

const mockedUseNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}))
describe('Pruebas sobre <SearchPage />', () => {

    beforeEach( () => jest.clearAllMocks() )

    test('debe mostrarse correctamente con valores por defecto', () => {

        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        )
        expect( container ).toMatchSnapshot()

    })
    
    test('debe mostrarse batman y el input con el valor del queryString', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman']} >
                <SearchPage />
            </MemoryRouter>
        )
        
        const inputValue = screen.getByRole('textbox')
        expect( inputValue.value ).toBe('batman')
        const image = screen.getByRole('img')
        expect( image.src ).toContain("/heroes/dc-batman.jpg")
        const alert = screen.getByLabelText('alert-danger')
        expect( alert.style.display ).toBe("none")

        screen.debug()
        
    })

    test('debe mostrarse un error si no se encuentra el heroe (batman123)', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman123']} >
                <SearchPage />
            </MemoryRouter>
        )

        const alert = screen.getByLabelText('alert-danger')
        expect( alert.style.display ).toBe("")

        screen.debug()
        
    })

    test('debe llmaar el navigate a la pantalla nueva', () => {

        render(
            <MemoryRouter initialEntries={['/search']} >
                <SearchPage />
            </MemoryRouter>
        )

        const input = screen.getByRole('textbox')
        fireEvent.change( input, {target: { name: 'searchText', value: 'superman' }} )
        
        const form = screen.getByRole('form')
        fireEvent.submit( form )

        expect( mockedUseNavigate ).toHaveBeenCalledWith("?q=superman")
        
    })

})