import { types } from "../../../src/auth/types/types"

describe('Pruebas en types.js', () => {
    test('Debe regresar los isguientes types', () => {
        expect( types ).toEqual({ login: '[Auth] Login', logout: '[Auth] Logout' })
    })
})