import { screen } from "@testing-library/react"
import { authReducer } from "../../../src/auth/context/authReducer"
import { types } from "../../../src/auth/types/types"

describe('Pruebas en el authReducer', () => {
    test('Debe retornar el estado por defecto', () => {
        const state = authReducer({ logged: false }, {})
        expect( state).toEqual({ logged: false })
    })
    test('Debe de (login) llamar el login autenticar y establecer el user', () => {
        const user = {
            id: 'ABC',
            name: 'vics'
        }
        const action = {
            type: types.login,
            payload: user
        }

        const login = authReducer({ logged: true }, action )
        expect( login ).toEqual({logged: true, user: action.payload })

    })
    test('Debe de (logout) borrar', () => {
        const state = {
            logged: true,
            user: {
                id: '123',
                name: 'juan'
            }
        }
        const action = {
            type: types.logout,
        }

        const login = authReducer({ logged: false }, action )
        expect( login ).toEqual({ logged: false })
    })
})