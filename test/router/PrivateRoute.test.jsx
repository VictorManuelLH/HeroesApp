import { render, screen } from "@testing-library/react"
import { PrivateRoute } from "../../src/router/PrivateRoute"
import { AuthContext } from "../../src/auth"
import { MemoryRouter } from "react-router-dom"

describe('Pruebas en <PrivateRoute/>', () => {

    test('debe mostrar el children si estoy autenticado', () => {

        Storage.prototype.setItem = jest.fn()

        const contextValue = {
            logged: true,
            user: {
                id: 'ACB',
                name: 'VCIA'
            }
        }
        render( 
            <AuthContext.Provider value={ contextValue } >
                <MemoryRouter  initialEntries={['/search?=batman']}>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )
        expect( screen.getByText('Ruta privada') ).toBeTruthy()
        expect( localStorage.setItem ).toHaveBeenCalledWith("lastPath","/search?=batman")
    })

})